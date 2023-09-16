
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
                    result = ""
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
                    result = new JwtSecurityTokenHandler().WriteToken(token)
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
    public IActionResult cambiarContrasenia(Usuarios usuarios, [FromQuery] string oldPass, [FromQuery] string newPass, [FromQuery] string Intoken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.ReadJwtToken(Intoken);

        var claimsIdentity = new ClaimsIdentity(token.Claims);
        var idtoken = claimsIdentity.FindFirst("id")?.Value;


        if (usuarios.Password == oldPass.ToString())
        {
            try
            {
                var result = UsuarioLoginServicios.changeUserPassword(usuarios, newPass);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        else {
            return StatusCode(500, "Pass incorrecto: ");;
        };
    }
    

    [HttpPost]
    [Route("Pruebadetoken")]
    public IActionResult pruebaDeToken([FromQuery] string Intoken)
    {
        // var identity = HttpContext.User.Identity as ClaimsIdentity;
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.ReadJwtToken(Intoken);

        var claimsIdentity = new ClaimsIdentity(token.Claims);
        if (true)
        {
            try
            {
                // var result = UsuarioLoginServicios.changeUserPassword(usuarios, newPass);
                return Ok(claimsIdentity.FindFirst("id")?.Value+" "+claimsIdentity.FindFirst("usuario")?.Value);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        else
        {
            return StatusCode(500, "Pass incorrecto: ");
        };

    }
}