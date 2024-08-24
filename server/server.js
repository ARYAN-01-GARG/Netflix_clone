const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Its Aryan garg server');
})

// Auth Routes
app.use('/auth', require('./routes/auth/register'));
app.use('/auth', require('./routes/auth/login'));


app.listen(3000, () => {
    console.log(`Server is Running on port ${PORT}`)
})