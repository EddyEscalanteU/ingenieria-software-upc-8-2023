using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BitacoraController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public BitacoraController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
    }

    [HttpGet]
    [Route("GetAllBitacora")]
    public IActionResult GetAllBitacora()
    {
        try
        {
            var result = BitacoraServicios.ObtenerTodo<Bitacora>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("FiltrarFechaBitacora")]
    public IActionResult FiltrarFechaBitacora(Bitacora bitacora){
        try{
            var result = BitacoraServicios.FiltrarFecha(bitacora);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

    
    [HttpGet]
    [Route("FiltrarUsuarioBitacora")]
    public IActionResult FiltrarUsuarioBitacora(string id){
        try{
            var result = BitacoraServicios.FiltrarUsuario(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 
}