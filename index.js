require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const pug = require('pug')
const {allQuotes, getQuotes, addQuote} = require('./controllers/controllers.js')

const app = express()
app.set('view engine', 'pug');
app.use(express.json());

app.get('/', (req, res) => {res.render(__dirname +'/templates/index.pug')});

app.get('/api/quotes', getQuotes);

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