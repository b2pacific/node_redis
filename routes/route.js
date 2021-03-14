const express = require("express");
const router = express.Router();

const cache = require("../utils/cache");
const getCourseDetails = require("../controller/getCourseDetails");

router.get("/:id", cache, getCourseDetails);

module.exports = router;
