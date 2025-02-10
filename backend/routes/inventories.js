const express = require("express");
const router = express.Router();
// const db = require("../config/database");
const Inventory = require("../models/Inventory");

// Get inventory list
router.get("/", async (req, res) => {
  const { limit, offset, location_id } = req.query;

  try {
    const options = {
      where: {},
    };

    if (location_id && location_id !== "all") {
      options.where.location_id = location_id;
    }

    const totalInventories = await Inventory.count(options);

    const inventories = await Inventory.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      ...options,
    });

    res.send({
      total: totalInventories,
      inventories,
    });
  } catch (error) {
    console.log("Error occurred: ", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching inventories." });
  }
});

// Get inventory count by location
router.get("/count/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const count = await Inventory.count({
      where: {
        location_id: id,
      },
    });
    res.json({ count });
  } catch (error) {
    console.error("Error counting inventories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get sum of an inventory prices for each location
router.get("/price/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const price = await Inventory.sum("price", {
      where: {
        location_id: id,
      },
    });
    res.json({ price });
  } catch (error) {
    console.error("Error counting prices:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
