// packages from npm
const path = require("path");
const express = require("express");

// controllers
const mealsController = require("../controllers/contr_meals");

// middleware
const router = express.Router();

router.get("/", mealsController.getMeals);

module.exports = router;
