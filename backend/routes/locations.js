const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const db = require("../config/database");

// Get location list
router.get("/", (req, res) => {
  const { sortBy, order } = req.query;

  const options = { order: [] };

  if (sortBy && order && sortBy === "location") {
    options.order = [
      [db.literal('"name" COLLATE "ka-GE-x-icu"'), order],
    ];
  }

  Location.findAll({
    ...options,
  })
    .then((locations) => {
      console.log(locations);
      res.send(locations);
    })
    .catch((err) => console.log("Error occurred: ", err));
});

module.exports = router;
