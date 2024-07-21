const Quote = require('../models/quote.model.js')
const mongoose = require('mongoose')

const allQuotes =  async (req, res) => {
    try {
        const quotes = await Quote.find({});
        res.status(200).json(quotes);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

const quotesChara =  async (req, res) => {
    try {
        const {name} = req.params;
        const quote = await Quote.find({character: {
            $regex: name,
            $options: 'i'
        }});
        if(quote.length === 0) {
            return res.status(404).json({ message: "No quotes found for that character" });
        }
        res.status(200).json(quote);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

const quotesCharaRandom = async (req, res) => {
    try {
        const {name} = req.params;
        const quote = await Quote.find({character: {
            $regex: name,
            $options: 'i'
        }});
        if(quote.length === 0) {
            return res.status(404).json({ message: "No quotes found for that character" });
        }
        random_quote = Math.floor(Math.random() * quote.length);
        res.status(200).json(quote[random_quote]);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

const quotesShow = async (req, res) => {
    try {
        const {show} = req.params;
        const quote = await Quote.find({show: {
            $regex: show,
            $options: 'i'
        }});
        if(quote.length === 0) {
            return res.status(404).json({ message: "No quotes found for that show" });
        }
        res.status(200).json(quote);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

const quotesShowRandom = async (req, res) => {
    try {
        const {show} = req.params;
        const quote = await Quote.find({show: {
            $regex: show,
            $options: 'i'
        }});
        if(quote.length === 0) {
            return res.status(404).json({ message: "No quotes found for that show" });
        }
        random_quote = Math.floor(Math.random() * quote.length);
        res.status(200).json(quote[random_quote]);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

const addQuote = async (req, res) => {
    try {
        const quote = await Quote.create(req.body);
        res.status(200).json(quote);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    allQuotes,
    quotesShow,
    quotesShowRandom,
    quotesChara,
    quotesCharaRandom,
    addQuote
}