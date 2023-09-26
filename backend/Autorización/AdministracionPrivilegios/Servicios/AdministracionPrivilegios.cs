using System.Data;
using backend.connection;
using Dapper;
using backend.Autorización.AdministracionPrivilegios.Entidades;

namespace backend.servicios
{
    public static class AdministracionPrivilegiosServicios
    {
        public static IEnumerable<AdministracionPrivilegios> ObtenerTodosLosPrivilegios()
        {
            const string sql = "SELECT * FROM ADMINISTRACION_PRIVILEGIOS";
            return BDManager.GetInstance.GetData<AdministracionPrivilegios>(sql);
        }

        public static AdministracionPrivilegios ObtenerPrivilegioPorId(int id)
        {
            const string sql = "SELECT * FROM ADMINISTRACION_PRIVILEGIOS WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            var result = BDManager.GetInstance.GetDataWithParameters<AdministracionPrivilegios>(sql, parameters);

            return result.FirstOrDefault();
        }

        public static int InsertarPrivilegio(AdministracionPrivilegios privilegio)
        {
            const string sql = "INSERT INTO ADMINISTRACION_PRIVILEGIOS (ID_ROL, ID_FUNCIONALIDAD) VALUES (@IdRol, @IdFuncionalidad)";
            var parameters = new DynamicParameters();
            parameters.Add("IdRol", privilegio.IdRol, DbType.Int32);
            parameters.Add("IdFuncionalidad", privilegio.IdFuncionalidad, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int ActualizarPrivilegio(AdministracionPrivilegios privilegio)
        {
            const string sql = "UPDATE ADMINISTRACION_PRIVILEGIOS SET ID_ROL = @IdRol, ID_FUNCIONALIDAD = @IdFuncionalidad WHERE Id = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", privilegio.Id, DbType.Int32);
            parameters.Add("IdRol", privilegio.IdRol, DbType.Int32);
            parameters.Add("IdFuncionalidad", privilegio.IdFuncionalidad, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int EliminarPrivilegio(int id)
        {
            const string sql = "DELETE FROM ADMINISTRACION_PRIVILEGIOS WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }
    }
}