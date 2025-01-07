const express = require("express");
const menu = require("../models/menu");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allMenu = await menu.find();
        res.json(allMenu);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

router.post("/", async (req, res) => {
      const Menu = new menu({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        availability: req.body.availability
      });
    
      try {
        const newMenu = await Menu.save();
        res.status(201).json(newMenu);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

router.put("/:id", async (req, res) => {
    try {
        const Menu = await menu.findOne({ _id: req.params.id, user: req.user._id });
        if (!Menu) return res.status(404).json({ message: "menu not found" });
    
        Menu.availability = req.body.availability;
        await Menu.save();
        res.json(Menu);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

router.delete("/:id", async (req, res) => {
     try {
        const Menu = await menu.findOne({ _id: req.params.id, user: req.user._id });
        if (!Menu) return res.status(404).json({ message: "menu not found" });
    
        await menu.deleteOne({ _id: req.params.id, user: req.user._id });
        res.json({ message: "menu deleted" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

module.exports = router;