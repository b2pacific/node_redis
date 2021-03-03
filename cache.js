const client = require("./client");

const cache = (req, res, next) => {
  client.get("11234", (err, info) => {
    if (err) next();

    if (info) {
      res.json(JSON.parse(info));
    } else {
      next();
    }
  });
};

module.exports = cache;