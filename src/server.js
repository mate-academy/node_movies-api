const express = require('express');
const app = express();
const port = 5000;
const data = require('../data.json');

app.get('/movies', (req,res) => {
    res.send(data.sort((a,b) => a.year - b.year));
});

app.get('/movies/titles', (req,res) => {     
    const findTitle = data.map(film => film.title + '<br>').sort((a, b) => a.localeCompare(b)).join('');
    res.send(findTitle ? findTitle : 'Something whent wrong');  
});

app.get('/movies/:id', (req,res) => {     
    const findFilm = data.find(film => film.id === req.params.id);    
    res.send(findFilm ? findFilm : 'Something whent wrong');  
});





app.use(express.static('src'));


app.listen(port);
console.log('listening...')