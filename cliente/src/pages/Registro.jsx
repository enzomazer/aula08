import { useState } from "react";

export default function Registrar() {

  const [nome, setnome] = useState('')
  const [email, setemail] = useState('')
  const registrarPessoa = async (event) => {
    event.preventDefault()
    try{
      const resposta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        nome: nome,
        email: email
      })
      })

      if(resposta.ok){
        navigation("/")
      }
    }catch{
      alert("erro na aplicação")
    }
  }

  return (
        
  );
}