const express = require("express");
const router = express.Router();

const util = require("./util");
const Data = require("./schema/data");
const cache = require("./cache");

router.get("/:id", cache, async (req, res, next) => {
  try {
    if (req.params.id) {
      const data = await Data.findOne({ _id: req.params.id });
      if (data) {
        util.set(req.params.id, data);
        util.setExpire(req.params.id, 10);
        res.json(data);
      } else {
        res.json({ message: "No data" });
      }
    } else {
      res.json({ message: "Id missing" });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
