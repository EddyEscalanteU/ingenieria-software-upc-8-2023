using backend.connection;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using backend.servicios;
using backend.Autorización.AsignacionRoles.Entidades;
namespace backend.Controllers
{
    [EnableCors("DevelopmentCors")]
    [ApiController]
    [Route("api/[controller]")]
    public class AsignacionRolesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionString;

        public AsignacionRolesController(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration["SqlConnectionString:DefaultConnection"];
            BDManager.GetInstance.ConnectionString = connectionString;
        }

        [HttpGet]
        [Route("GetAllAsignaciones")]
        public IActionResult GetAllAsignaciones()
        {
            try
            {
                var result = AsignacionRolesServicios.ObtenerTodasLasAsignaciones();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAsignacionById")]
        public IActionResult GetAsignacionById([FromQuery]int id)
        {
            try
            {
                var result = AsignacionRolesServicios.ObtenerAsignacionPorId(id);
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
        [Route("AddAsignacion")]
        public IActionResult AddAsignacion(AsignacionRoles asignacion)
        {
            try
            {
                var result = AsignacionRolesServicios.InsertarAsignacion(asignacion);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdateAsignacion")]
        public IActionResult UpdateAsignacion(AsignacionRoles asignacion)
        {
            try
            {
                var result = AsignacionRolesServicios.ActualizarAsignacion(asignacion);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteAsignacion")]
        public IActionResult DeleteAsignacion([FromQuery]int id)
        {
            try
            {
                var result = AsignacionRolesServicios.EliminarAsignacion(id);
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