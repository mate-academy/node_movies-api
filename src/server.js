const express = require('express');
// const fs = require('fs');
const app = express();
const port = 4000;
const data = require('../data.json');

app.get('/movies', (req,res) => res.json([...data].sort((a,b) => a.year - b.year)));

app.get('/movies/titles', (req,res) => {
    if(req.query.year) {
        const filteringYearsData = [...data].filter(item => item.year === req.query.year).sort((a,b) => a.title.localeCompare(b.title));
        res.send(filteringYearsData.map(obj => obj.title).join('\n'));
    };
    res.send([...data].map(item => item.title).sort((a,b) => a.localeCompare(b)).join('\n'))
});

app.get('/movies/:id', (req,res) => {
    const searchingResult = data.find(item => item.id === req.params.id);
    if (!searchingResult) {
        res.sendStatus(404);
    }
    res.json(searchingResult);
});

app.listen(port); 

app.use(express.static('src'));


