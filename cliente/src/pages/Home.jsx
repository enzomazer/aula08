import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import '../style/home.css';
import Carregamento from "../components/Carregamento";

export default function Home() {
  const [musicas, setMusicas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const atualizar = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/musicas");
      if (!resposta.ok) throw new Error("Erro ao buscar músicas!");
      
      const dados = await resposta.json();
      setMusicas(dados);
    } catch (error) {
      console.error("Erro ao carregar músicas:", error);
      alert("Ocorreu um erro ao carregar as músicas.");
    } finally {
      setCarregando(false); 
    }
  };

  useEffect(() => {
    atualizar();
  }, []); 


  if (carregando) {
    return <Carregamento />;
  }

  const removerMusica = async (id) => {
    try {
      await fetch(`http://localhost:3000/musicas/${id}`, { method: "DELETE" });
      atualizar(); 
    } catch {
      alert("Erro ao remover música!");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = musicas.map(musica => [
      musica.titulo, musica.artista, musica.album, 
      musica.duracao, musica.genero, musica.anoLancamento, musica.gravadora
    ]);
    doc.text("Lista de Músicas", 10, 10);
    doc.autoTable({
      head: [["Título", "Artista", "Álbum", "Duração", "Gênero", "Lançamento", "Gravadora"]],
      body: tabela
    });
    doc.save("musicas.pdf");
  };

  const orderAz = () => {
    const listaOrdenada = [...musicas].sort((a, b) => a.titulo.localeCompare(b.titulo));
    setMusicas(listaOrdenada);
  };

  const orderZa = () => {
    const listaOrdenada = [...musicas].sort((a, b) => b.titulo.localeCompare(a.titulo));
    setMusicas(listaOrdenada);
  };

  const orderAno = () => {
    const listaOrdenada = [...musicas].sort((a, b) => parseInt(a.anoLancamento) - parseInt(b.anoLancamento));
    setMusicas(listaOrdenada);
  };

  const orderAnoa = () => {
    const listaOrdenada = [...musicas].sort((a, b) => parseInt(b.anoLancamento) - parseInt(a.anoLancamento));
    setMusicas(listaOrdenada);
  };

  return (
    <div className="container">
      <div className="header">
        <Button variant="contained" onClick={exportarPDF}>Exportar PDF</Button>
        <Button onClick={orderAz}>Ordenar A-Z</Button>
        <Button onClick={orderZa}>Ordenar Z-A</Button>
        <Button onClick={orderAno}>Ordenar Ano+</Button>
        <Button onClick={orderAnoa}>Ordenar Ano-</Button>
      </div>
      {musicas.length === 0 ? (
        <p className="mensagem-vazia">Nenhuma música cadastrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th>Duração</th>
              <th>Gênero</th>
              <th>Lançamento</th>
              <th>Gravadora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {musicas.map((musica, index) => (
              <tr key={musica.id || index}>
                <td>{index + 1}</td>
                <td>{musica.titulo}</td>
                <td>{musica.artista}</td>
                <td>{musica.album}</td>
                <td>{musica.duracao}</td>
                <td>{musica.genero}</td>
                <td>{musica.anoLancamento}</td>
                <td>{musica.gravadora}</td>
                <td className="action-buttons">
                  <button onClick={() => removerMusica(musica.id)}>Remover</button>
                  <Link to={`/alterar/${musica.id}`} className="link-button">
                    <button>Alterar</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to={`/registrar`}>
        <button className="link-button">Adicionar Música</button>
      </Link>
      <footer>
        <p>Desenvolvido por Enzo e Gustavo 🎵</p>
      </footer>
    </div>
  );
}