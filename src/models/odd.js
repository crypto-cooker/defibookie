//Betting Odd
const mongoose = require('mongoose');

const OddSchema = new mongoose.Schema({
    gameID: {
        type: String,
        required: true
    },
    totalUnder: {
        type: String,
        required: true
    },
    totalOver: {
        type: String,
        required: true
    },
    awayTeamSpread: {
        type: String,
        required: true
    },
    awayTeamSpreadOdds: String,
    homeTeamSpread: String,
    homeTeamSpreadOdds: String,
    totalOverOdds: String,
    totalUnderOdds: String,
    awayTeamMLOdds: String,
    homeTeamMLOdds: String,
}, {timestamps: true});

module.exports = mongoose.model('odd', OddSchema);