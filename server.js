const colors = require('colors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ msg: 'Hello World!' }))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.bold.italic.yellow));