using System.Security.Claims;
using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public ProductoController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }

    [HttpGet]
    [Route("GetAllProducto")]
    public IActionResult GetAllProducto()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        var rToken = Jwt.validarToken(identity);

        if (rToken.success)
        {
            try
        {
            var result = ProductoServicios.ObtenerTodo<Producto>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
        }
        return StatusCode(511, "Erro de autenticacion");
        
    }

    [HttpGet]
    [Route("GetProductoById")]
    public IActionResult GetProductoById([FromQuery]int id)
    {
        try
        {
            var result = ProductoServicios.ObtenerById<Producto>(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("AddProducto")]
    public IActionResult AddProducto(Producto producto){
        try{
            var result = ProductoServicios.InsertProducto(producto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

    [HttpPut]
    [Route("UpdateProducto")]
    public IActionResult UpdateProducto(Producto producto)
    {
        try
        {
            var result = ProductoServicios.UpdateProducto(producto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteProducto")]
    public IActionResult DeleteProducto([FromQuery]int id)
    {
        try
        {
            var result = ProductoServicios.DeleteProducto(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}