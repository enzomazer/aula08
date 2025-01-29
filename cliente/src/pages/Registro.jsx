import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/registrar.css";

export default function Registrar() {
  const [musica, setMusica] = useState({
    titulo: "",
    artista: "",
    album: "",
    duracao: "",
    genero: "",
    anoLancamento: "",
    gravadora: "",
  });
  const navigation = useNavigate();

  const registrarMusica = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/musicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(musica),
      });
      if (resposta.ok) {
        navigation("/");
      }
    } catch {
      alert("Erro ao registrar música.");
    }
  };

  return (
    <main className="main-container">
      <h1>Registrar Música</h1>
      <form onSubmit={registrarMusica}>
        <table className="register-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th>Duração</th>
              <th>Gênero</th>
              <th>Lançamento</th>
              <th>Gravadora</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(musica).map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={musica[key]}
                    onChange={(e) =>
                      setMusica({ ...musica, [key]: e.target.value })
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
}