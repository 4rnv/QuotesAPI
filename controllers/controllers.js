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

const getQuotes = async (req,res) => {
    try {
        const {character, show, random} = req.query;
        let filter = {};

        if(character) {
            const charactersList = character.split(',').map(chara => new RegExp(chara, 'i')); //making array from query
            filter.character = { $in : charactersList };
        }

        if(show) {
            const showsList = show.split(',').map(show => new RegExp(show, 'i'));
            filter.show = { $in : showsList };
        }

        let quotes;
        console.log(filter);
        
        if(random) {
            quotes = await Quote.aggregate([
                { $match : filter },
                { $sample : { size : parseInt(random, 10) || 1}}
            ]); //sample is specific keyword for number of results returned by aggregate function
        }
        else {
            quotes = await Quote.find(filter);
        }

        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for the given criteria" });
        }

        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addQuote = async (req, res) => {
    try {
        const quote = await Quote.create(req.body);
        res.status(201).json(quote);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    allQuotes,
    getQuotes,
    addQuote
}