import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {

  const [titulo, settitulo] = useState('')
  const [artista, setartista] = useState('')
  const navigation = useNavigate()

  const registrarMusica = async (event) => {
    event.preventDefault()
    try {
      console.log("macaco")
      const resposta = await fetch("http://localhost:3000/musicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo,
          artista: artista
        })
      })
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
      <form onSubmit={registrarMusica}>
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