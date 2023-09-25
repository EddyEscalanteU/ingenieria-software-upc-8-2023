
using System.Data;
using backend.connection;
using backend.entidades;
using Dapper;
using Microsoft.AspNetCore.SignalR;

namespace backend.servicios
{
    public static class CategoriaProductoServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>(){
            const string sql = "select top 5 * from categoria_producto ORDER BY FECHA_REGISTRO DESC";
            return BDManager.GetInstance.GetData<T>(sql);
            // const string storedProcedureName = "GetAllCategoriaProducto";
            // var parameters = new DynamicParameters(); // Agrega parámetros si es necesario
            // return BDManager.GetInstance.SPGetData<T>(storedProcedureName, parameters);
        }

        public static T ObtenerById<T>(int id){
            const string sql = "select * from categoria_producto where ID = @Id and estado_registro = 1";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>(sql, parameter);
            // const string storedProcedureName = "GetCategoriaProductoById";
            // var result =  BDManager.GetInstance.SPGetDataWithParameters<T>(storedProcedureName, parameter);
            return result.FirstOrDefault();                      
        }

        public static int InsertCategoriaProducto(CategoriaProducto categoriaProducto){
            const string sql = "INSERT INTO [CATEGORIA_PRODUCTO]([NOMBRE], [USUARIO_REGISTRO]) VALUES (@NOMBRE, @USUARIO_REGISTRO)";            
            var parameter = new DynamicParameters();
            parameter.Add("NOMBRE", categoriaProducto.Nombre, DbType.String);
            parameter.Add("USUARIO_REGISTRO", categoriaProducto.UsuarioRegistro, DbType.String);
            var result = BDManager.GetInstance.SetData(sql, parameter);

            // const string storedProcedureName = "InsertCategoriaProducto";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }    

        public static int UpdateCategoriaProducto(CategoriaProducto categoriaProducto)
        {
            const string sql = "UPDATE [CATEGORIA_PRODUCTO] SET [NOMBRE] = @NOMBRE WHERE [ID] = @id";
            var parameter = new DynamicParameters();
            parameter.Add("id", categoriaProducto.Id, DbType.Int32);
            parameter.Add("NOMBRE", categoriaProducto.Nombre, DbType.String);
            var result = BDManager.GetInstance.SetData(sql, parameter);

            // const string storedProcedureName = "UpdateCategoriaProducto";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

        public static int DeleteCategoriaProducto(int id)
        {
            const string sql = "DELETE FROM [CATEGORIA_PRODUCTO] WHERE [ID] = @id";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);

            // const string storedProcedureName = "DeleteCategoriaProducto";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

    }
}