import { useEffect, useState } from "react";
import { Button } from '@mui/material'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  const atualizar = async () => {
    const buscarUsuario = async () => {
      try {
        console.log("o gustavo ta te esperando, claudia!!")
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
}

useEffect(() => {
  atualizar()
}, [])


  const removerPessoa = async (id) => {
    try {
      console.log("claudia o gustavo te ama")
      await fetch("http://localhost:3000/usuarios/" + id, {
        method: "DELETE"
      }
    )
    atualizar()
    console.log("claudia volta pro gustavo")
    }
    catch {
      alert('DAD');
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = usuarios.map(usuario => [
      usuario.nome,
      usuario.email
    ]);
    doc.text("Lista de Usuários", 10, 10)
    doc.autoTable({
      head: [["nome", "email"]],
      body: tabela
    })

    doc.save("alunos.pdf");
  }

  return (
    <table>
      <Button variant="contained" onClick={() => exportarPDF()}>
        nil
      </Button>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={() => removerPessoa(usuario.id)}>remover</button></td>
        </tr>
      )}
    </table>
  );
}