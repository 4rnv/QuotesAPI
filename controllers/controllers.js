const Quote = require('../models/quote.model.js')
const mongoose = require('mongoose')

const getQuotes = async (req, res) => {
    try {
        let { character, show, random } = req.query;
        const ua = req.headers['user-agent'] || 'unknown';
        const ref = req.headers['referer'] || 'direct';
        let filter = {};
        const maxLimit = 50;
        if (character) {
            character = character.trim();
            const charactersList = character.split(',').map(chara => chara.trim());
            if (charactersList.length > 0) {
                filter.character = {
                    $in: charactersList.map(ch => new RegExp(ch, 'i'))
                };
            }
        }

        if (show) {
            show = show.trim();
            const showsList = show.split(',').map(sh => sh.trim());
            if (showsList.length > 0) {
                filter.show = {
                    $in: showsList.map(sh => new RegExp(sh, 'i'))
                };
            }
        }

        let quotes;
        console.log(filter);
        console.log(ref);
        console.log(ua);
        if (random) {
            random = parseInt(random.trim(), 10) || 1;
            random = Math.max(1, random);
            random = random < maxLimit ? random : maxLimit;
            quotes = await Quote.aggregate([
                { $match: filter },
                { $sample: { size: random } }
            ]); //sample is specific keyword for number of results returned by aggregate function
        }
        else {
            quotes = await Quote.aggregate([
                { $match: filter },
                { $sample: { size: maxLimit } }
            ]);
        }

        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for the given criteria" });
        }
        quotes = quotes.map((q) => ({ "character": q.character, "show": q.show, "quote": q.quote }));
        res.status(200).json(quotes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const addQuote = async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if (process.env.API_SECRET === undefined || apiKey !== process.env.API_SECRET) {
            return res.status(403).json({ message: "Forbidden." });
        }
        const quote = await Quote.create(req.body);
        res.status(201).json(quote);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getQuotes,
    addQuote
}