require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const pug = require('pug')
const path = require('path')
const {allQuotes, getQuotes, addQuote} = require('./controllers/controllers.js')

const app = express();
app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {res.render('index')});

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
.catch((e) => {
    console.log('DB connection failed: ', e);
});