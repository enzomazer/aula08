import { useParams } from "react-router-dom";

export  default function Alterar(){

    const { id, nome }= useParams()

    const alterarNome = async ()=> {
        const novoNome = document.getElementsByName('nome')
        nome = await fetch("http://localhost:3000/usuarios", {
            method: "SET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: novoNome
            })
          })

    }

    return(
        <div>
            <h1>Pgina alterar {id}</h1>
            <form onSubmit={alterarNome}>
        <input type="text" name="nome" onChange={(event) => {
          alterarNome(event.target.value)
        }} />
        <button>Salvar</button>
      </form>
        </div>
    )
}