import { useEffect, useState } from "react";
import { Button } from '@mui/material'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

export default function Home() {

  const [musicas, setMusicas] = useState([]);

  const atualizar = async () => {
    const buscarMusica = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/musicas");
        const dados = await resposta.json();
        setMusicas(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarMusica();
}

useEffect(() => {
  atualizar()
}, [])


  const removerMusica = async (id) => {
    try {
      console.log("claudia o gustavo te ama")
      await fetch("http://localhost:3000/musicas/" + id, {
        method: "DELETE"
      }
    )
    atualizar()
    }
    catch {
      alert('DAD');
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = musicas.map(musica => [
      musica.titulo,
      musica.artista
    ]);
    doc.text("Lista de Musicas", 10, 10)
    doc.autoTable({
      head: [["titulo", "artista"]],
      body: tabela
    })

    doc.save("alunos.pdf");
  }
 
  const orderAz = () => {
    const listaOrdenada = [...musicas].sort((a , b) => a.titulo.localeCompare(b.titulo))
    setMusicas(listaOrdenada)
  }


  return (
    <div>
      <div>
        <Button variant="contained" onClick={() => exportarPDF()}>
          nil
        </Button>
        <Button onClick={() => orderAz()}>
          AZ
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {musicas.map((musica) => (
            <tr key={musica.id}>
              <td>{musica.titulo}</td>
              <td>{musica.artista}</td>
              <td>
                <button onClick={() => removerMusica(musica.id)}>Remover</button>
                <Link to={`/alterar/${musica.id}`}>
                  <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}