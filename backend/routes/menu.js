const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Menu");
});

router.post("/", (req, res) => {
    res.send("Menu");
});

router.put("/:id", (req, res) => {
    res.send("Menu");
});

router.delete("/:id", (req, res) => {
    res.send("Menu");
});

module.exports = router;