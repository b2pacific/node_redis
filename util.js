const client = require("./client");

const get = (key) => {
  const promise = new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return promise;
};

const set = (key, data) => {
  client.set(key, JSON.stringify(data));
};

const setExpire = (key, time) => {
  client.expire(key, time);
};

module.exports = { get, set, setExpire };
