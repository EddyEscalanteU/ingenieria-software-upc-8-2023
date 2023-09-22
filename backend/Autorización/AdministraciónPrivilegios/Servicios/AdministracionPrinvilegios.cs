using System.Data;
using backend.connection;
using backend.Autorizacion.AsignacionPrivilegios.entidades;
using Dapper;

namespace backend.servicios
{
    public static class AsignacionPrivilegiosServicios
    {
        public static IEnumerable<AsignacionPrivilegios> ObtenerTodasLasAsignaciones()
        {
            const string sql = "SELECT * FROM ADMINISTRACION_PRIVILEGIOS";
            return BDManager.GetInstance.GetData<AsignacionPrivilegios>(sql);
        }

        public static AsignacionPrivilegios ObtenerAsignacionPorId(int id)
        {
            const string sql = "SELECT * FROM ADMINISTRACION_PRIVILEGIOS WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            var result = BDManager.GetInstance.GetDataWithParameters<AsignacionPrivilegios>(sql, parameters);

            return result.FirstOrDefault();
        }

        public static int AgregarAsignacion(AsignacionPrivilegios asignacion)
        {
            const string sql = "INSERT INTO ADMINISTRACION_PRIVILEGIOS (ID_ROL, ID_FUNCIONALIDAD) VALUES (@IdRol, @IdFuncionalidad)";
            var parameters = new DynamicParameters();
            parameters.Add("IdRol", asignacion.ID_Rol, DbType.Int32);
            parameters.Add("IdFuncionalidad", asignacion.ID_Funcionalidad, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int ActualizarAsignacion(AsignacionPrivilegios asignacion)
        {
            const string sql = "UPDATE ADMINISTRACION_PRIVILEGIOS SET ID_ROL = @IdRol, ID_FUNCIONALIDAD = @IdFuncionalidad WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", asignacion.ID, DbType.Int32);
            parameters.Add("IdRol", asignacion.ID_Rol, DbType.Int32);
            parameters.Add("IdFuncionalidad", asignacion.ID_Funcionalidad, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int EliminarAsignacion(int id)
        {
            const string sql = "DELETE FROM ADMINISTRACION_PRIVILEGIOS WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }
    }
}
