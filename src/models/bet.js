//GameSchedule
const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
    playerID: String,
    gameID: {
        type: String,
        required: true
    },
    sportID: {
        type: String,
        required: true
    },
    teamID: {
        type: String,
        required: true
    },
    betAmount: Number,
    betTeam: String,
    teamName: String,
    marketKey: String,
    oddID: String,
    oddChangeID: String,
    idx: String,
    isLive: Boolean,
}, {timestamps: true});

module.exports = mongoose.model('bet', BetSchema);