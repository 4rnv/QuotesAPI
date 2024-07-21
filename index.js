require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Quote = require('./models/quote.model.js')
const {allQuotes,quotesShow,quotesShowRandom,quotesChara,quotesCharaRandom, addQuote} = require('./controllers/controllers.js')

const app = express()
app.use(express.json());

app.get('/', (req, res) => {res.send('<h1 style="text-align:center;">Anime Quotes API</h1>');});

app.get('/api/all', allQuotes);

app.get('/api/character/:name', quotesChara);

app.get('/api/character/:name/random', quotesCharaRandom);

app.get('/api/show/:show', quotesShow);

app.get('/api/show/:show/random', quotesShowRandom);

app.post('/api/add', addQuote);

const DBCONN =process.env.DB_STRING;
mongoose.connect(DBCONN)
.then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port`, process.env.PORT);
    });
})
.catch(() => {
    console.log('Not working');
});