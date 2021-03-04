const colors = require('colors');
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT DATABASE 
connectDB();

app.get('/', (req, res) => res.json({ msg: 'Hello World!' }))

// ROUTES 
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.bold.italic.red));