const express = require('express');
const fs = require('fs');
let moviesList = require('../data.json');
const uuid = require('uuid/v4'); 
const bodyParser = require('body-parser'); 

const app = express();
const port = 4000;

getTitle = (obj) => obj.map(item => item.title);

sortByWord = (obj) => obj.sort((item1,item2) => item1.localeCompare(item2));

objectFiltering = (obj, prop, value, option) => {
    if(option === '!==') {
        return obj.filter(item => item[prop] !== value);
    } else {
        return obj.filter(item => item[prop] === value);   
    };
};

app.get('/movies', (req,res) => res.json([...moviesList].sort((a,b) => a.year - b.year)));

app.get('/movies/titles', (req,res) => {
    if(req.query.year) {
        const filteringYearsData = objectFiltering(moviesList,'year',req.query.year);
        const title = getTitle(filteringYearsData);

        res.send(sortByWord(title).join('\n'));
    } else {
        res.send(sortByWord(getTitle(moviesList)).join('\n'))
    }
});

app.get('/movies/:id', (req,res) => {
    const searchingResult = moviesList.find(movie => movie.id === req.params.id);
    if (!searchingResult) {
        res.sendStatus(404);
    }
    res.json(searchingResult);
});

app.post('/movies', bodyParser.json(),(req,res) => {
    const { title, year, imdbRating } = req.body;
    const newFilm = {
        id: uuid(),
        title: title,
        year: year,
        imdbRating: imdbRating,
    };
    moviesList = [...moviesList, newFilm];

    fs.writeFile('data.json', JSON.stringify(moviesList), (err) => {
        if (err) {
            res.send(err);
          return
        }
        res.json(moviesList);
      })
});

app.put('/movies/:id', bodyParser.json(),(req,res) => {
    const { id } = req.params;
    const { title, imdbRating, year } = req.body;
    let editedFilm = {};

    moviesList = moviesList.map(movie => {
        if(id === movie.id) {
            movie = {
                id,
                title,
                imdbRating,
                year,
            }
            editedFilm = movie;
        }
        return movie;
    });

    fs.writeFile('data.json', JSON.stringify(moviesList), (err) => {
        if (err) {
            res.send(err);
          return;
        }
        res.json(editedFilm);
      })
});

app.patch('/movies/:id', bodyParser.json(),(req,res) => {
    const { id } = req.params;
    const { title, imdbRating, year } = req.body;
    let editedFilm = {};

    moviesList = moviesList.map(movie => {
        if(id === movie.id) {
            movie = {
                id,
                title: title || movie.title,
                imdbRating: imdbRating || movie.imdbRating,
                year: year || movie.year,
            }
            editedFilm = movie;
        }
        return movie;
    });
    
    fs.writeFile('data.json', JSON.stringify(moviesList), (err) => {
        if (err) {
            res.send(err);
          return;
        }
        res.json(editedFilm);
      })
    });

app.delete('/movies/:id', bodyParser.json(),(req,res) => {

    moviesList = objectFiltering(moviesList, 'id', req.params.id,'!==');

    fs.writeFile('data.json', JSON.stringify(moviesList), (err) => {
        if (err) {
            res.send(err);
            return;
        }
        res.sendStatus(204);
    })
});

app.listen(port); 
