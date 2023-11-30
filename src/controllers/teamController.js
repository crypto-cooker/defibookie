const Team = require('../models/team');
require("dotenv").config(); 
const axios = require("axios");
const fetchTeams = async () => {
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLTeams`,
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
const addNFLTeamsToDatabase = async (req, res) => {
    try {
        const { body } = await fetchTeams();
        console.log(body, body.length);
        for(var i=0; i< body.length; i++) {
            const newTeam = new Team(body[i]);
            await newTeam.save();
        }
        return res.json({message: "successfully added teams to db"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Server error"});
    }
}
 
const getNFLTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        return res.json({teams});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Server error"});
    }
}

module.exports = {
    addNFLTeamsToDatabase,
    getNFLTeams
}