const express = require("express");
const router = express.Router();

router.post("/order", (req, res) => {
    res.send("Order");
});

router.get("/orders", (req, res) => {
    res.send("Orders");
});

module.exports = router;