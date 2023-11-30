const Player = require('../models/player');
require("dotenv").config(); 
const axios = require("axios");
const fetchAllPlayers = async () => {
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLPlayerList`,
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
const addNFLPlayersToDatabase = async (req, res) => {
    try {
        const { body } = await fetchAllPlayers();
        console.log(body, body.length);
        for(var i=0; i< body.length; i++) {
            const newPlayer = new Player(body[i]);
            await newPlayer.save();
        }
        return res.json({message: "successfully added players to db"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Server error"});
    }
}

const getPlayerInfo = async (req, res) => {  
    const { playerID } = req.body;
    try {
        const playerInfo = await Player.findById(playerID)
        return res.json({playerInfo});
    } catch (error) {
        return res.status(500).json({error});
    }
}

const getNFLPlayers = async (req, res) => {
    try {
        const players = await Player.find({});
        return res.json({players});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"});
    }
}


module.exports = {
    addNFLPlayersToDatabase,
    getPlayerInfo,
    getNFLPlayers
}