const { MongoNetworkError } = require('mongodb');
const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema(
    {
        character: {
            type: String,
            required: [true, "Character not mentioned"]
        },
        show: {
            type: String,
            required: [true, "Show not mentioned"]
        },
        quote: {
            type: String,
            required: [true, "Empty quote"]
        },  
    }
);

const Quote = mongoose.model("anime_quotes", QuoteSchema);
module.exports = Quote;