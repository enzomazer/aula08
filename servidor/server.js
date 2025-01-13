const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let musicas = [
    {
      id: 1,
      titulo: "Bohemian Rhapsody",
      artista: "Queen",
      album: "A Night at the Opera",
      duracao: "5:55",
      genero: "Rock"
    },
    {
      id: 2,
      titulo: "Blinding Lights",
      artista: "The Weeknd",
      album: "After Hours",
      duracao: "3:20",
      genero: "Synth-pop"
    },
    {
      id: 3,
      titulo: "Shape of You",
      artista: "Ed Sheeran",
      album: "÷ (Divide)",
      duracao: "3:53",
      genero: "Pop"
    },
    {
      id: 4,
      titulo: "Smells Like Teen Spirit",
      artista: "Nirvana",
      album: "Nevermind",
      duracao: "5:01",
      genero: "Grunge"
    },
    {
      id: 5,
      titulo: "Rolling in the Deep",
      artista: "Adele",
      album: "21",
      duracao: "3:48",
      genero: "Soul"
    },
    {
      id: 6,
      titulo: "Hotel California",
      artista: "Eagles",
      album: "Hotel California",
      duracao: "6:30",
      genero: "Rock"
    }
  ];

  function corrigirid() {
    let idd = 1
    for (let musica of musicas) {
      musica.id = idd
      idd = idd + 1
    }
  }

app.post('/musicas', (req, res) => {
    const { titulo, artista } = req.body;
    if (!titulo || !artista) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }
    const novaMusica = { id: musicas.length + 1, titulo, artista };
    musicas.push(novaMusica);
    corrigirid()
    res.status(201).json(novaMusica);
});

app.get('/musicas', (req, res) => {
    res.status(200).json(musicas);
});

app.get('/musicas/:id', (req, res) => {
    const { id } = req.params;
    const musica = musicas.find(u => u.id === parseInt(id));
    
    if (!musica) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    res.status(200).json(musica);
});

app.put('/musicas/:id', (req, res) => {
    const {id, titulo, artista } = req.body;
    if (!titulo || !artista) {
      res.json({ erro: 'alteracao vazio' });
      return;
  }
    for (let mus of musicas) {
      if (mus.id == id) {
        mus.titulo = titulo
        mus.artista = artista
      }
    }
    res.status(200).json({ erro: 'wdihawpdhawdpoih' });
});

app.delete('/musicas/:id', (req, res) => {
    const { id } = req.params;
    const index = musicas.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    
    musicas.splice(index, 1);
    corrigirid()
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
