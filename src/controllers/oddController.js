const Odd = require('../models/odd');
require("dotenv").config(); 
const axios = require("axios");
const fetchBettingOdds = async (gameDate, gameID) => {
    let params = {};
    if(gameDate) params = {...params, gameDate};
    if(gameID) params = {...params, gameID};
    console.log(params);
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLBettingOdds`,
        params,
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
    };
    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const addBettingOddsToDatabase = async (req, res) => {
    try {
        const { gameID, gameDate } = req.body;
        const { body } = await fetchBettingOdds(gameID, gameDate);
        const keys = Object.keys(body);
        for(var i=0; i< keys.length; i++) {
            const newPlayer = new Odd(body[keys[i]].fanduel);
            newPlayer.gameID = keys[i];
            await newPlayer.save();
        }
        return res.json({message: "successfully added odds to db"});
    } catch (error) {
        return res.status(500).json({error: "Server error"});
    }
}

const getBettingOdds = async (req, res) => {
    const { gameDate, gameID }  = req.body;
    try {
        const { body } = await fetchBettingOdds(gameDate, gameID);        
        if(body.error) return res.json({error});
        return res.json({data: body})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"});
    }
}


module.exports = {
    getBettingOdds,
    addBettingOddsToDatabase
}