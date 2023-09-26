using backend.connection;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using backend.servicios;
using backend.Autorización.AdministracionPrivilegios.Entidades;
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
                var result = AdministracionPrivilegiosServicios.ObtenerTodosLosPrivilegios();
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
                var result = AdministracionPrivilegiosServicios.ObtenerPrivilegioPorId(id);
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
        public IActionResult AddPrivilegio(AdministracionPrivilegios privilegio)
        {
            try
            {
                var result = AdministracionPrivilegiosServicios.InsertarPrivilegio(privilegio);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdatePrivilegio")]
        public IActionResult UpdatePrivilegio(AdministracionPrivilegios privilegio)
        {
            try
            {
                var result = AdministracionPrivilegiosServicios.ActualizarPrivilegio(privilegio);
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
                var result = AdministracionPrivilegiosServicios.EliminarPrivilegio(id);
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