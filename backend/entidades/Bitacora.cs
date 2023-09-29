namespace backend.entidades
{
    [Serializable]
    public class Bitacora
    {
        public int Id{get; set;}
        public DateTime FechaHora{get; set;}
        public DateTime FechaHoraFinal{get; set;}

        public int IdValor{get; set;}
        public string Evento{get; set;}
        public string Valor{get; set;}
        public string Usuario{get; set;}
    }
    // public Bitacora(int bId, Datetime bFechaHora, int bIdValor, string bEvento, string bValor, string bUsuario)
    // {
    //     id = bId;
    //     FechaHora = bFechaHora;
    //     IdValor = bIdValor;
    //     Evento = bIdValor;
    //     Valor = bEvento;
    //     Usuario = bUsuario;
    // }
    // public void Mostrar()
    // {
        
    // }

    // public Memento crearMemento()
    // {
    //     Memento miMemento = new Memento();
    //     miMemento.Salvar(this);
    //     return miMemento;
    // }
    
    // public void Restaurar(Memento bMemento)
    // {
    //     Bitacora temp = bMemento.Restaurar();
    //     id = temp.Id;
    //     fechaHora = temp.FechaHora;
    //     idValor = temp.IdValor;
    //     evento = temp.Evento;
    //     valor = temp.Valor;
    //     usuario = temp.Usuario;
    // }
}

// export class Bitacora{
//     public id: number = 0;  
//     public fechaHora: DateTime;
//     public idValor: number = 0;
//     public evento: string;
//     public valor: string;
//     public usuario: string;
//   }