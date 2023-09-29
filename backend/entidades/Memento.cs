namespace backend.entidades
{
    public class Memento
    {
        // internal void Salvar(Bitacora objeto)
        // {
        //     BinaryFormatter formateador = new BinaryFormatter();
        //     Stream miStream = new FileStream("bitacora.aut", FileMode.Create, FileAccess.Write, FileShare.None);
        //     formateador.Serializable(miStream, objeto);
        //     miStream.Close();
        // }
        // internal Originador Restaurar()
        // {
        //     BinaryFormatter formateador = new BinaryFormatter();
        //     Stream miStream = new FileStream("bitacora.aut", FileMode.Open, FileAccess.Read, FileShare.None);
        //     Originador temp = (Originador)formateador.Deserialize(miStream);
        //     miStream.Close();

        //     return temp;
        // }
    }
}
