const redis = require("redis");

const client = redis.createClient(6379);

client.on("ready", () => {
    console.log("Redis Ready");
})

client.on("error", (err) => {
    console.log("Redis error: ", err);
})

module.exports = client;