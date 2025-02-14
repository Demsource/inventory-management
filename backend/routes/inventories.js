const express = require("express");
const router = express.Router();
// const db = require("../config/database");
const Inventory = require("../models/Inventory");

// Get inventory list and related data
router.get("/", async (req, res) => {
  const { limit, offset, count, price, sortBy, order } = req.query;
  const data = {};

  try {
    const options = {
      where: {},
      order: [],
    };

    if (count && count !== "all") {
      options.where.location_id = count;
    }

    if (sortBy && order) {
      options.order = [[sortBy, order]];
    }

    if (limit && offset) {
      data.inventories = await Inventory.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        ...options,
      });
    }

    if (count) {
      data.total = await Inventory.count(options);
    }

    if (price) {
      data.price = await Inventory.sum("price", {
        where: {
          location_id: price,
        },
      });
    }

    res.send(data);
  } catch (error) {
    console.log("Error occurred: ", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching inventories data" });
  }
});

// Add an inventory
router.post("/", (req, res) => {
  const { name, price, location_id } = req.body;

  Inventory.create({ name, price, location_id })
    .then((inventory) => {
      res.send(inventory);
    })
    .catch((err) => {
      console.log("An Error Occurred: ", err);
      res.status(500).json({ message: "Error inserting inventory" });
    });
});

// Remove an inventory
router.delete("/:id", async (req, res) => {
  const inventoryId = req.params.id;

  try {
    const deletedInventory = await Inventory.destroy({
      where: {
        id: inventoryId,
      },
    });

    if (deletedInventory) {
      res.status(200).json({ message: "Inventory item deleted successfully." });
    } else {
      res.status(404).json({ message: "Inventory item not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting inventory item." });
  }
});

module.exports = router;
