import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {

  const [nome, setnome] = useState('')
  const [email, setemail] = useState('')

  const registrarPessoa = async (event) => {
    event.preventDefault()
    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      })

      if (resposta.ok) {
        navigation("/")
      }
    } catch {
      alert("erro na aplicação")
    }
  }

  return (
    <main>
      <form onSubmit={registrarPessoa}>
        <input type="text" value={nome} onChange={(event) => {
          setnome(event.target.value)
        }} />
        <input type="text" value={email} onChange={(event) => {
          setemail(event.target.value)
        }} />
        <button>Salvar</button>
      </form>
    </main>
  );
}