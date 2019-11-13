const express = require('express');
const app = express();
const fs = require('fs'); 
const port = 5000;


app.get('/movies', (req,res) => {
    fs.readFile('data.json', (err, data) => {
        let result = JSON.parse(data.sort((a,b) => a.year - b.year));
        res.json(result);
    });    
});

app.get('/movies/titles',async (req,res) => {     
    fs.readFile('data.json', (err, data) => {
        let result = JSON.parse(data);

        if (err) {
            res.sendStatus(500)
        } else {
            if (req.query.year) {
                result = result.filter(film => +film.year == req.query.year).map(film => film.title);

                if(result.length > 1) {
                    result = result.sort((a, b) => a.localeCompare(b)).join('\n'); 

                    return res.send(result);
                } else if (result.length === 1) {
                    return res.send(result.join('\n'));
                } else {
                    res.send('Something whent wrong');
                }                
            }
           
          result = result.map(film => film.title).sort((a, b) => a.localeCompare(b)).join('\n');
          res.send(result ? result : 'Something whent wrong');  
        }
    }); 
});

app.get('/movies/:id',async (req,res) => {     
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
          const movie = JSON.parse(data).find(film => film.id === req.params.id); 

          if (movie) {
              res.send(movie)
          } else {
              res.status(404).send(`Error! Not found!${req.params.id}`);
          }
        }
    }); 
});

app.listen(port);
console.log('listening...')