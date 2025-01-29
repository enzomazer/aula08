import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../style/alterar.css"; 

export default function Alterar() {
  const [musica, setMusica] = useState({
    titulo: "",
    artista: "",
    album: "",
    duracao: "",
    genero: "",
    lancamento: "",
    gravadora: "",
  });
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMusica = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/musicas/${id}`);
        if (resposta.ok) {
          const data = await resposta.json();
          setMusica(data);
        }
      } catch {
        alert("Erro ao buscar dados da música.");
      }
    };

    fetchMusica();
  }, [id]);

  const AlterarMusica = async (event) => {
    event.preventDefault();

    try {
      const resposta = await fetch(`http://localhost:3000/musicas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(musica),
      });

      if (resposta.ok) {
        navigation("/");
      }
    } catch {
      alert("Erro na aplicação");
    }
  };

  return (
    <main className="main-container">
      <h1>Alterar Música</h1>
      <form onSubmit={AlterarMusica}>
        <table className="info-table">
          <thead>
            <tr>
              <th>Propriedade</th>
              <th>Valor Atual</th>
              <th>Novo Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(musica).map((key) => (
              <tr key={key}>
                <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td>{musica[key]}</td>
                <td>
                  <input
                    type="text"
                    value={musica[key]}
                    onChange={(e) =>
                      setMusica({ ...musica, [key]: e.target.value })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
}