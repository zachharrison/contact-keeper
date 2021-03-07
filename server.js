const colors = require('colors');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT DATABASE 
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

// ROUTES 
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// SERVER STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  // SET STATIC FOLDER
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.bold.italic.red));