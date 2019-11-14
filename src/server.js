'use strict'

let express = require('express');
let app = express();

const route = require('./router');

const port = process.env.PORT || 5000;

app.use('/', route);

app.listen(port, () => console.log(`Start server on port ${port}`));
