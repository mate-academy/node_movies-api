// Write your code here
const express = require('express');
const uuid = require('uuid/v1');
const fs = require('fs');

const app = express();
const port = 5000;

let moviesData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.get('/movies', (req, res) => {
    const movies = [...moviesData].sort((a, b) => Number(b.year) - Number(a.year));

    res.json(movies);
});

app.get('/movies/titles', (req, res) => {
    let titles = [...moviesData];

    if (req.query.year) {
        titles = titles.filter(({ year }) => year === req.query.year);

        if (!titles.length) {
            res.status(200).send("Movie title is not found");
        }
    }


    titles = titles.map(({ title }) => title).sort().join('\n');

    res.send(titles);
});

app.get('/movies/:movieId', (req, res) => {
    const foundMoviesId = moviesData.find(({ id }) => id === req.params.id);

    if (foundMoviesId) {
        return res.json(foundMoviesId);
    } 

    return  res.status(404).send("Oops, something went wrong");
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));