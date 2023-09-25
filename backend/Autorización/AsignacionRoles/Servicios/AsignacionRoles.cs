using System.Data;
using backend.connection;
using Dapper;
using backend.Autorización.AsignacionRoles.Entidades;

namespace backend.servicios
{
    public static class AsignacionRolesServicios
    {
        public static IEnumerable<AsignacionRoles> ObtenerTodasLasAsignaciones()
        {
            const string sql = "SELECT * FROM ASIGNACION_ROLES";
            return BDManager.GetInstance.GetData<AsignacionRoles>(sql);
        }

        public static AsignacionRoles ObtenerAsignacionPorId(int id)
        {
            const string sql = "SELECT * FROM ASIGNACION_ROLES WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            var result = BDManager.GetInstance.GetDataWithParameters<AsignacionRoles>(sql, parameters);

            return result.FirstOrDefault();
        }

        public static int InsertarAsignacion(AsignacionRoles asignacion)
        {
            const string sql = "INSERT INTO ASIGNACION_ROLES (ID_USUARIO, ID_ROL) VALUES (@IdUsuario, @IdRol)";
            var parameters = new DynamicParameters();
            parameters.Add("IdUsuario", asignacion.IdUsuario, DbType.Int32);
            parameters.Add("IdRol", asignacion.IdRol, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int ActualizarAsignacion(AsignacionRoles asignacion)
        {
            const string sql = "UPDATE ASIGNACION_ROLES SET ID_USUARIO = @IdUsuario, ID_ROL = @IdRol WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", asignacion.Id, DbType.Int32);
            parameters.Add("IdUsuario", asignacion.IdUsuario, DbType.Int32);
            parameters.Add("IdRol", asignacion.IdRol, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int EliminarAsignacion(int id)
        {
            const string sql = "DELETE FROM ASIGNACION_ROLES WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }
    }
}