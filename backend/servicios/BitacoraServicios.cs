
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
            const string sql = "select * from bitacora ORDER BY FECHA_HORA DESC";
            return BDManager.GetInstance.GetData<T>(sql);
        }

        public static int FiltrarFecha(Bitacora bitacora){
            const string sql = "SELECT * FROM BITACORA WHERE FECHA_HORA >= @FECHA_HORA";            
            var parameter = new DynamicParameters();
            parameter.Add("FECHA_HORA", bitacora.FechaHora, DbType.DateTime);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            return result;
        }   
    }
}