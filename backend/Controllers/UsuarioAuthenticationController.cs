
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Security.Claims;
using System.Text;
using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers;
[EnableCors("DevelopmentCors")]
[ApiController]
[Route("api/[controller]")]
public class UsuarioAuthenticationController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public UsuarioAuthenticationController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }


    [HttpGet]
    [Route("UserLogin")]
    public dynamic userLogin([FromQuery] string inUser, [FromQuery] string inPass)
    {
        try
        {
            string user = inUser.ToString();
            string password = inPass.ToString();

            Usuarios usuario = UsuarioLoginServicios.ObtenerByUserAndPass<Usuarios>(user, password);

            if (usuario == null)
            {
                return new
                {
                    success = false,
                    message = "Usuario no encotrado",
                    result = "",
                    user = ""
                };
            }
            else
            {
                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]{
                    new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    // new Claim(JwtRegisteredClaimNames.Email, userInfo.EmailAddress),
                    // new Claim("DateOfJoing", userInfo.DateOfJoing.ToString("yyyy-MM-dd")),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),

                    new Claim("id", usuario.Id.ToString()),
                    new Claim("usuario", usuario.UserName.ToString())
                };

                var token = new JwtSecurityToken(
                    jwt.Issuer,
                    jwt.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(50),
                    signingCredentials: credentials
                );

                return new
                {
                    success = true,
                    message = "Usuario encotrado",
                    result = new JwtSecurityTokenHandler().WriteToken(token),
                    user = usuario
                };
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("CambiarContrasenia")]
    public IActionResult cambiarContrasenia([FromQuery] string oldPass, [FromQuery] string newPass)
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var rToken = Jwt.validarToken(identity);

        if (!rToken.success)
        {
            return StatusCode(401, "Error de autenticacion");
        }
        Usuarios usuario = rToken.result;

        if (string.Equals(usuario.Password, oldPass))
        {
            try
            {
                var result = UsuarioLoginServicios.changeUserPassword(usuario, newPass);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        else
        {
            return StatusCode(500, "Contrasenia no midificada");
        };
    }

    [HttpGet]
    [Route("pruebadetoken")]
    public IActionResult pruebaDeToken([FromQuery] string Intoken)
    {
        // var identity = HttpContext.User.Identity as ClaimsIdentity;
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var rToken = Jwt.validarToken(identity);

        // Usuarios us = rToken.result;
        // var tokenHandler = new JwtSecurityTokenHandler();
        // var token = tokenHandler.ReadJwtToken(Intoken);

        // var claimsIdentity = new ClaimsIdentity(token.Claims);
        // if (!rToken.success) 
        // return Ok(rToken.result);

        return Ok(rToken.message);

    }
}