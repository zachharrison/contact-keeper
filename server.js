const colors = require('colors');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// CONNECT DATABASE 
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

// ROUTES 
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


// SET STATIC FOLDER
app.use(express.static('build'));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.bold.italic.red));