namespace backend.entidades
{
    public class Bitacora
    {
        public int Id{get; set;}
        public DateTime FechaHora{get; set;}
        public int IdValor{get; set;}
        public string Evento{get; set;}
        public string Valor{get; set;}
        public string Usuario{get; set;}
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