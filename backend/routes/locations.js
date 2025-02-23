const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const db = require("../config/database");
const Inventory = require("../models/Inventory");

// Get locations list
router.get("/", async (req, res) => {
  const { limit, offset, sortBy, order } = req.query;
  const data = {};

  const options = {
    order: [],
  };

  if (limit && offset) {
    options.limit = parseInt(limit);
    options.offset = parseInt(offset);
  }

  if (sortBy && order) {
    options.order = [[db.literal('"name" COLLATE "ka-GE-x-icu"'), order]];
  }

  data.locations = await Location.findAll({ ...options });

  data.total = await Location.count();

  res.send(data);
});

// Get single location
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const location = await Location.findOne({
    where: {
      id,
    },
  });

  res.send(location);
});

// Add a Location
router.post("/", (req, res) => {
  const { name } = req.body;

  Location.create({ name })
    .then((location) => {
      res.send(location);
    })
    .catch((err) => {
      console.log("An Error Occured: ", err);
      res.status(500).json({ message: "Error inserting location" });
    });
});

// Remove a Location
router.delete("/:id", async (req, res) => {
  const locationId = req.params.id;

  try {
    const deletedLocation = await Location.destroy({
      where: {
        id: locationId,
      },
    });

    const deletedInventories = await Inventory.destroy({
      where: {
        location_id: locationId,
      },
    });

    if (deletedLocation && deletedInventories >= 0) {
      res.status(200).json({ message: "Location items deleted successfully" });
    } else {
      res.status(404).json({ message: "Location item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting location items" });
  }
});

// Update a Location
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    // Update Location
    if (name) location.name = name;

    await location.save();

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: "Error updating location" });
  }
});

module.exports = router;
