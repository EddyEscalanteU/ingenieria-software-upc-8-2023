using System.Data;
using backend.connection;
using backend.Autorizacion.Funcionalidades.entidades;
using Dapper;

namespace backend.servicios
{
    public static class FuncionalidadesServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>()
        {
            const string sql = "SELECT * FROM GESTION_FUNCIONALIDADES";
            return BDManager.GetInstance.GetData<T>(sql);
        }

        public static T ObtenerFuncionalidadPorId<T>(int id)
        {
            const string sql = "SELECT * FROM GESTION_FUNCIONALIDADES WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            var result = BDManager.GetInstance.GetDataWithParameters<T>(sql, parameters);

            return result.FirstOrDefault();
        }

        public static int InsertarFuncionalidad(Funcionalidad funcionalidad)
        {
            const string sql = "INSERT INTO GESTION_FUNCIONALIDADES (NOMBRE, DESCRIPCION) VALUES (@Nombre, @Descripcion)";
            var parameters = new DynamicParameters();
            parameters.Add("Nombre", funcionalidad.Nombre, DbType.String);
            parameters.Add("Descripcion", funcionalidad.Descripcion, DbType.String);
            

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int ActualizarFuncionalidad(Funcionalidad funcionalidad)
        {
            const string sql = "UPDATE GESTION_FUNCIONALIDADES SET NOMBRE = @Nombre, DESCRIPCION = @Descripcion WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", funcionalidad.Id, DbType.Int32);
            parameters.Add("Nombre", funcionalidad.Nombre, DbType.String);
            parameters.Add("Descripcion", funcionalidad.Descripcion, DbType.String);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int EliminarFuncionalidad(int id)
        {
            const string sql = "DELETE FROM GESTION_FUNCIONALIDADES WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }
    }
}