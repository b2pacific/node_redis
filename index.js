const express = require("express");
const cluster = require("cluster");

const route = require("./route");

const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.use("/get", route);

  app.listen(3000, () => {
    console.log("Listening on 3000");
  });

  console.log(`Worker ${process.pid} started`);
}
