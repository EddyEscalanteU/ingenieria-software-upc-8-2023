namespace backend.entidades
{
    public class Bitacora
    {
        public int Id{get; set;}
        public DateTime FechaHora{get; set;}
        public int idValor{get; set;}
        public string evento{get; set;}
        public string valor{get; set;}
        public string usuario{get; set;}
    }
}

// export class Bitacora{
//     public id: number = 0;  
//     public fechaHora: DateTime;
//     public idValor: number = 0;
//     public evento: string;
//     public valor: string;
//     public usuario: string;
//   }