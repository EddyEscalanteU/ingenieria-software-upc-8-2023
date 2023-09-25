
using System.Data;
using backend.connection;
using backend.entidades;
using Dapper;
using Microsoft.AspNetCore.SignalR;

namespace backend.servicios
{
    public static class DetalleCarritoServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>(){
             const string sql = "select TOP 5  * from DETALLE_CARRITO ORDER BY FECHA_REGISTRO DESC";
             return BDManager.GetInstance.GetData<T>(sql);
            // const string storedProcedureName = "GetAllDetallesCarrito";
            // var parameters = new DynamicParameters(); // Agrega parámetros si es necesario
            // return BDManager.GetInstance.SPGetData<T>(storedProcedureName, parameters);
        }

        public static T ObtenerById<T>(int id){
            const string sql = "select * from DETALLE_CARRITO where ID = @Id and estado_registro = 1";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>(sql, parameter);
            
            // const string storedProcedureName = "GetDetalleCarritoPorId";
            // var result =  BDManager.GetInstance.SPGetDataWithParameters<T>(storedProcedureName, parameter);
            return result.FirstOrDefault();                      
        }

        public static int InsertDetalleCarrito(DetalleCarrito detalleCarrito){
            const string sql = "INSERT INTO [DETALLE_CARRITO]([CANTIDAD],[ID_PRODUCTO],[ID_CARRITO_COMPRA], [USUARIO_REGISTRO]) VALUES (@cantidad, @id_producto, @id_carrito_compra, @usuario_registro)";            
            var parameter = new DynamicParameters();
            parameter.Add("cantidad", detalleCarrito.Cantidad, DbType.Int32);
            parameter.Add("id_producto", detalleCarrito.IdProducto, DbType.Int32);
            parameter.Add("id_carrito_compra", detalleCarrito.IdCarritoCompra, DbType.Int32);
            parameter.Add("usuario_registro", detalleCarrito.UsuarioRegistro, DbType.String);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            
            // const string storedProcedureName = "InsertDetalleCarrito";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }    

        public static int UpdateDetalleCarrito(DetalleCarrito detalleCarrito)
        {
            const string sql = "UPDATE [DETALLE_CARRITO] SET [CANTIDAD] = @cantidad, [ID_PRODUCTO] = @id_producto, [ID_CARRITO_COMPRA] = @id_carrito_compra WHERE [ID] = @id";
            var parameter = new DynamicParameters();
            parameter.Add("id", detalleCarrito.Id, DbType.Int32);
            parameter.Add("cantidad", detalleCarrito.Cantidad, DbType.Int32);
            parameter.Add("id_producto", detalleCarrito.IdProducto, DbType.Int32);
            parameter.Add("id_carrito_compra", detalleCarrito.IdCarritoCompra, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);

            // const string storedProcedureName = "UpdateDetalleCarrito";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

        public static int DeleteDetalleCarrito(int id)
        {
            const string sql = "DELETE FROM [DETALLE_CARRITO] WHERE [ID] = @id";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);

            // const string storedProcedureName = "DeleteDetalleCarrito";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

    }
}