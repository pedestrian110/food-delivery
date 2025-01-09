const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Menu = require("../models/menu");
const Order = require("../models/order");
const authorder = require("../middleware/authorder");

router.post("/order", async (req, res) => {
    try {
        const { userId, items, totalAmount, status } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
    
        const validItems = await Menu.find({ '_id': { $in: items.map(item => item.menuItem) } });
        if (validItems.length !== items.length) {
          return res.status(400).json({ message: "Invalid menu items" });
        }
    
        const newOrder = new Order({
          userId,
          items,
          totalAmount,
          status
        });
    
        await newOrder.save();
        res.status(201).json(newOrder);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({userId: req.userId}).populate('userId', 'username').populate('items.menuItem', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;