const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let usuarios = [
    { id: 1, nome: "Alice", email: "alice@example.com" },
    { id: 2, nome: "Bruno", email: "bruno@example.com" },
    { id: 3, nome: "Carla", email: "carla@example.com" },
    { id: 4, nome: "Daniel", email: "daniel@example.com" },
    { id: 5, nome: "Eduarda", email: "eduarda@example.com" },
    { id: 6, nome: "Felipe", email: "felipe@example.com" },
    { id: 7, nome: "Gabriela", email: "gabriela@example.com" },
    { id: 8, nome: "Henrique", email: "henrique@example.com" },
    { id: 9, nome: "Isabela", email: "isabela@example.com" },
    { id: 10, nome: "João", email: "joao@example.com" },
    { id: 11, nome: "Karen", email: "karen@example.com" },
    { id: 12, nome: "Leonardo", email: "leonardo@example.com" },
    { id: 13, nome: "Mariana", email: "mariana@example.com" },
    { id: 14, nome: "Natália", email: "natalia@example.com" },
    { id: 15, nome: "Otávio", email: "otavio@example.com" },
    { id: 16, nome: "Paula", email: "paula@example.com" },
    { id: 17, nome: "Rafael", email: "rafael@example.com" },
    { id: 18, nome: "Sabrina", email: "sabrina@example.com" },
    { id: 19, nome: "Thiago", email: "thiago@example.com" },
    { id: 20, nome: "Vanessa", email: "vanessa@example.com" },
  ];

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    const novoUsuario = { id: usuarios.length + 1, nome, email };
    usuarios.push(novoUsuario);
    
    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));
    
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    res.status(200).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    
    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    
    res.status(200).json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    usuarios.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
