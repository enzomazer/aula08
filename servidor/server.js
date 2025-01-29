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
    genero: "Progressive Rock",
    anoLancamento: 1975,
    gravadora: "EMI"
  },
  {
    id: 2,
    titulo: "Sweet Child O' Mine",
    artista: "Guns N' Roses",
    album: "Appetite for Destruction",
    duracao: "5:56",
    genero: "Hard Rock",
    anoLancamento: 1987,
    gravadora: "Geffen"
  },
  {
    id: 3,
    titulo: "Back in Black",
    artista: "AC/DC",
    album: "Back in Black",
    duracao: "4:15",
    genero: "Hard Rock",
    anoLancamento: 1980,
    gravadora: "Atlantic"
  },
  {
    id: 4,
    titulo: "Smells Like Teen Spirit",
    artista: "Nirvana",
    album: "Nevermind",
    duracao: "5:01",
    genero: "Grunge",
    anoLancamento: 1991,
    gravadora: "DGC"
  },
  {
    id: 5,
    titulo: "Whole Lotta Love",
    artista: "Led Zeppelin",
    album: "Led Zeppelin II",
    duracao: "5:34",
    genero: "Hard Rock",
    anoLancamento: 1969,
    gravadora: "Atlantic"
  },
  {
    id: 6,
    titulo: "Hotel California",
    artista: "Eagles",
    album: "Hotel California",
    duracao: "6:30",
    genero: "Soft Rock",
    anoLancamento: 1976,
    gravadora: "Asylum"
  },
  {
    id: 7,
    titulo: "Stairway to Heaven",
    artista: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duracao: "8:02",
    genero: "Progressive Rock",
    anoLancamento: 1971,
    gravadora: "Atlantic"
  },
  {
    id: 8,
    titulo: "Highway to Hell",
    artista: "AC/DC",
    album: "Highway to Hell",
    duracao: "3:28",
    genero: "Hard Rock",
    anoLancamento: 1979,
    gravadora: "Atlantic"
  },
  {
    id: 9,
    titulo: "Comfortably Numb",
    artista: "Pink Floyd",
    album: "The Wall",
    duracao: "6:21",
    genero: "Progressive Rock",
    anoLancamento: 1979,
    gravadora: "Harvest"
  },
  {
    id: 10,
    titulo: "November Rain",
    artista: "Guns N' Roses",
    album: "Use Your Illusion I",
    duracao: "8:57",
    genero: "Hard Rock",
    anoLancamento: 1991,
    gravadora: "Geffen"
  },
  {
    id: 11,
    titulo: "Born to Run",
    artista: "Bruce Springsteen",
    album: "Born to Run",
    duracao: "4:31",
    genero: "Heartland Rock",
    anoLancamento: 1975,
    gravadora: "Columbia"
  },
  {
    id: 12,
    titulo: "Rock You Like a Hurricane",
    artista: "Scorpions",
    album: "Love at First Sting",
    duracao: "4:15",
    genero: "Heavy Metal",
    anoLancamento: 1984,
    gravadora: "Harvest"
  },
  {
    id: 13,
    titulo: "Paradise City",
    artista: "Guns N' Roses",
    album: "Appetite for Destruction",
    duracao: "6:46",
    genero: "Hard Rock",
    anoLancamento: 1987,
    gravadora: "Geffen"
  },
  {
    id: 14,
    titulo: "Layla",
    artista: "Derek and the Dominos",
    album: "Layla and Other Assorted Love Songs",
    duracao: "7:04",
    genero: "Blues Rock",
    anoLancamento: 1970,
    gravadora: "Atco"
  },
  {
    id: 15,
    titulo: "Free Bird",
    artista: "Lynyrd Skynyrd",
    album: "Pronounced 'Lĕh-'nérd 'Skin-'nérd",
    duracao: "9:08",
    genero: "Southern Rock",
    anoLancamento: 1973,
    gravadora: "MCA"
  },
  {
    id: 16,
    titulo: "Kashmir",
    artista: "Led Zeppelin",
    album: "Physical Graffiti",
    duracao: "8:37",
    genero: "Progressive Rock",
    anoLancamento: 1975,
    gravadora: "Swan Song"
  },
  {
    id: 17,
    titulo: "Don't Stop Believin'",
    artista: "Journey",
    album: "Escape",
    duracao: "4:10",
    genero: "Arena Rock",
    anoLancamento: 1981,
    gravadora: "Columbia"
  },
  {
    id: 18,
    titulo: "Black Dog",
    artista: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duracao: "4:55",
    genero: "Hard Rock",
    anoLancamento: 1971,
    gravadora: "Atlantic"
  },
  {
    id: 19,
    titulo: "Smoke on the Water",
    artista: "Deep Purple",
    album: "Machine Head",
    duracao: "5:40",
    genero: "Hard Rock",
    anoLancamento: 1972,
    gravadora: "Warner Bros."
  },
  {
    id: 20,
    titulo: "Baba O'Riley",
    artista: "The Who",
    album: "Who's Next",
    duracao: "5:00",
    genero: "Classic Rock",
    anoLancamento: 1971,
    gravadora: "Decca"
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
    const { titulo, artista, album, duracao, genero, anoLancamento, gravadora} = req.body;
    if (!titulo || !artista) {
        return res.status(400).json({ erro: 'Informações ausentes' });
    }
    const novaMusica = { id: musicas.length + 1, titulo, artista, album, duracao, genero, anoLancamento, gravadora};
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
        return res.status(404).json({ erro: 'Música não encontrada' });
    }
    
    res.status(200).json(musica);
});

app.put('/musicas/:id', (req, res) => {
    const {id, titulo, artista, album, duracao, genero, anoLancamento, gravadora } = req.body;
    if (!titulo || !artista) {
      res.json({ erro: 'alteracao vazio' });
      return;
  }
    for (let mus of musicas) {
      if (mus.id == id) {
        mus.titulo = titulo
        mus.artista = artista
        mus.album = album
        mus.duracao = duracao
        mus.genero = genero
        mus.anoLancamento = anoLancamento
        mus.gravadora = gravadora
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
