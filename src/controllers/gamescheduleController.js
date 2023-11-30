const GameSchedule = require('../models/gameschedule');
require("dotenv").config(); 
const axios = require("axios");
const fetchAllGameSchedules = async () => {
    const options = {
        method: 'GET',
        url: `${process.env.API_BASE_URL}/getNFLGamesForWeek`,
        params: {week: 'all'},
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
const addGameSchedulesToDatabase = async (req, res) => {
    try {
        const { body } = await fetchAllGameSchedules();
        console.log(body, body.length);
        for(var i=0; i< body.length; i++) {
            const newSchedule = new GameSchedule(body[i]);
            await newSchedule.save();
        }
        return res.json({message: "successfully added gameschedules to db"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Server error"});
    }
}
 

const getAllGameSchedules = async (req, res) => {
    try {
        const schedules = await GameSchedule.find({});
        return res.json({schedules});
    } catch (error) {
          console.error(error);
        return res.status(500).json({error: "Server error"});
    }
}
module.exports = {
    addGameSchedulesToDatabase,
    getAllGameSchedules
}