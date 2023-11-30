var express = require('express');
const router = express.Router();
var teamController = require("../controllers/teamController");
var playerController = require("../controllers/playerController");
var gameScheduleController = require("../controllers/gamescheduleController");
var betController = require("../controllers/betController");
var oddController = require("../controllers/oddController");

router.get("/addNFLPlayersToDatabase", playerController.addNFLPlayersToDatabase);
router.get("/getNFLPlayers", playerController.getNFLPlayers);
router.post("/getPlayerInfo", playerController.getPlayerInfo);

router.get("/addNFLTeamsToDatabase", teamController.addNFLTeamsToDatabase);
router.get("/getNFLTeams", teamController.getNFLTeams);

router.get("/addGameSchedulesToDatabase", gameScheduleController.addGameSchedulesToDatabase);
router.get("/getAllGameSchedules", gameScheduleController.getAllGameSchedules);

router.get("/liveGameBox/:gameID", betController.getLiveGameBox);
router.post("/dailyScoreBoard", betController.getDailyScoreBoard);
router.post("/placeBet", betController.placeBet);

router.get("/getBettingOdds", oddController.getBettingOdds);
router.post("/addBettingOddsToDatabase", oddController.addBettingOddsToDatabase);

module.exports = { router };