'use strict';

const express = require('express');
const app = express();

const route = require('./router');

const port = process.env.PORT || 5000;

app.use('/movies', route);

app.listen(port, () => console.log(`Start server on port ${port}`));
