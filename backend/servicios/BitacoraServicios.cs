using System.Data;
using backend.connection;
using backend.entidades;
using Dapper;
using Microsoft.AspNetCore.SignalR;

namespace backend.servicios
{
    public static class BitacoraServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>(){
            const string sql = "select top 15 * from bitacora ORDER BY FECHA_HORA DESC";
            return BDManager.GetInstance.GetData<T>(sql);
        } 
        public static IEnumerable<Bitacora> FiltrarFecha(Bitacora bitacora)
        {
            const string sql = "SELECT * FROM BITACORA WHERE CONVERT(DATE, FECHA_HORA) >= CONVERT(DATE, @FECHA_HORA) AND CONVERT(DATE, FECHA_HORA) <= CONVERT(DATE, @FECHA_HORA_FINAL)";            
            var parameters = new DynamicParameters();
            parameters.Add("FECHA_HORA", bitacora.FechaHora, DbType.DateTime);
            parameters.Add("FECHA_HORA_FINAL", bitacora.FechaHoraFinal, DbType.DateTime);

            return BDManager.GetInstance.GetDataWithParameters<Bitacora>(sql, parameters);
        }
        public static IEnumerable<Bitacora> FiltrarUsuario(string id)
        {
            const string sql = "SELECT * FROM BITACORA WHERE USUARIO = @ID_USUARIO";            
            var parameters = new DynamicParameters();
            parameters.Add("ID_USUARIO", id, DbType.String);

            return BDManager.GetInstance.GetDataWithParameters<Bitacora>(sql, parameters);
        }
    }
}