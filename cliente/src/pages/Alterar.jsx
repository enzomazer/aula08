import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Alterar() {

  const [titulo, settitulo] = useState('')
  const [artista, setartista] = useState('')
  const navigation = useNavigate()

  const { id } = useParams();

  const AlterarMusica = async (event) => {
    event.preventDefault()

    try {
        
      const resposta = await fetch("http://localhost:3000/musicas/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
          titulo: titulo,
          artista: artista
        })
      })
      console.log(resposta)
      if (resposta.ok) {

        navigation("/")
      }

    } 
    catch {
      alert("erro na aplicação")
    }
  }

  return (
    <main>
      <form onSubmit={AlterarMusica}>
        <input type="text" value={titulo} onChange={(event) => {
          settitulo(event.target.value)
        }} />
        <input type="text" value={artista} onChange={(event) => {
          setartista(event.target.value)
        }} />
        <button>Salvar</button>
      </form>
    </main>
  );
}