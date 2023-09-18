using System.Security.Claims;
using backend.servicios;

namespace backend.entidades
{
    public class Jwt
    {
        public String Key { get; set; }
        public String Issuer { get; set; }
        public String Audience { get; set; }
        public String Subject { get; set; }

        public static dynamic validarToken(ClaimsIdentity identity)
        {
            try
            {
                if (identity.Claims.Count() == 0)
                {
                    return new
                    {
                        success = false,
                        message = "Verifique su token",
                        result = ""
                    };
                }
                var id = identity.Claims.FirstOrDefault(x => x.Type == "id").Value;

                Usuarios usuario = UsuariosServicios.ObtenerById<Usuarios>(int.Parse(id));
                return new
                {
                    success = true,
                    message = "Exito",
                    result = usuario
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    success = false,
                    message = "Catch:" + ex.Message,
                    result = ""
                };
            }
        }
    }
}