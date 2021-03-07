const util = require("./util");

const cache = async (req, res, next) => {
  try {
    const value = await util.get(req.params.id);
    if (value) {
      console.log("Retriving from cache");
      res.json(JSON.parse(value));
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

module.exports = cache;
