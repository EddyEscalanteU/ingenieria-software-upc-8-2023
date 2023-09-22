using backend.connection;
using backend.Autorizacion.AsignacionPrivilegios.entidades;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using backend.servicios;

namespace backend.Controllers
{
    [EnableCors("DevelopmentCors")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdministracionPrivilegiosController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionString;

        public AdministracionPrivilegiosController(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration["SqlConnectionString:DefaultConnection"];
            BDManager.GetInstance.ConnectionString = connectionString;
        }

        [HttpGet]
[Route("GetAllPrivilegios")]
public IActionResult GetAllPrivilegios()
{
    try
    {
        var result = AsignacionPrivilegiosServicios.ObtenerTodasLasAsignaciones(); // Reemplaza con el método de tu servicio
        return Ok(result);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

   [HttpGet]
[Route("GetPrivilegioById")]
public IActionResult GetPrivilegioById([FromQuery] int id)
{
    try
    {
        var result = AsignacionPrivilegiosServicios.ObtenerAsignacionPorId(id); // Reemplaza con el método de tu servicio
        if (result != null)
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

       [HttpPost]
[Route("AddPrivilegio")]
public IActionResult AddPrivilegio(AsignacionPrivilegios asignacion)
{
    try
    {
        var result = AsignacionPrivilegiosServicios.AgregarAsignacion(asignacion); // Reemplaza con el método de tu servicio
        return Ok(result);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

        [HttpPut]
[Route("UpdatePrivilegio")]
public IActionResult UpdatePrivilegio(AsignacionPrivilegios asignacion)
{
    try
    {
        var result = AsignacionPrivilegiosServicios.ActualizarAsignacion(asignacion); // Reemplaza con el método de tu servicio
        return Ok(result);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

        [HttpDelete]
[Route("DeletePrivilegio")]
public IActionResult DeletePrivilegio([FromQuery] int id)
{
    try
    {
        var result = AsignacionPrivilegiosServicios.EliminarAsignacion(id); // Reemplaza con el método de tu servicio
        if (result > 0)
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}
    }
}
