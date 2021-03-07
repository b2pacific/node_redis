const express = require("express");
const cluster = require("cluster");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const route = require("./route");
const Data = require("./schema/data");

const numCPUs = require("os").cpus().length;

const info = {
  title: "Full Stack Data Science With 1 Year Internship",
  isJobGuaranteeProgram: true,
  shortDescription:
    "This is a data science full stack live mentor led certification program along with full time one-year internship provided by iNeuron intelligence private limited, where you will learn all the stack required to work in data science, data analytics and big data industry including ML ops and cloud infrastructure and real time industry project and product development along with iNeuron product development team and you will contribute on various level with iNeuron .",
  otherDetails: {
    startDate: "20th February 2021",
    timings: "3 PM to 6 PM (IST) Saturday - Sunday",
    doubtClearing: "10 PM to 12 AM (IST) Wednesday",
  },
  overview: {
    video: "https://www.youtube.com/embed/UnHmO_hGsUc",
    fullDescription:
      "Complete stack of data science is covered in this unique program in live class along with this you will get doubt clearing session and you will be able to get 24/7 live support from iNeuron skype team. one-year internship is already included in this program and you will get one year of internship completion certificate and you will work along with iNeuron product development team in various domain according to your alignment and your time availability.",
    learn: [
      "Python",
      "Stats",
      "Machine learning",
      "Deep learning",
      "Computer vision",
      "Natural language processing",
      "Data analytics",
      "Big data",
      "Ml ops",
      "Cloud",
      "Data structure and algorithm",
      "Architecture",
      "Domain wise project",
      "Databases",
      "Negotiations skills",
      "Mock interview",
      "Interview preparation",
      "Resume building after every module",
    ],
    requirements: ["dedication", "Computer with i3 and above configuration"],
    features: [
      "Full stack Data Science master’s certification",
      "Job guarantee otherwise refund",
      "One year of internship",
      "Online Instructor-led learning: Live teaching by instructors",
      "56 + hands-on industry real-time projects.",
      "400 hours live interactive classes.",
      "Every week doubt clearing session after the live classes.",
      "Lifetime Dashboard access.",
      "Doubt clearing one to one",
      "Doubt clearing through mail and skype support team",
      "Assignment in all the module",
      "Quiz in every module",
      "A live project with real-time implementation",
      "Resume building",
      "Career guidance",
      "Interview Preparation",
      "Regular assessment",
    ],
  },
};

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true});

if (cluster.isMaster) {
  const data = new Data(info);
  data
    .save()
    .then(() => console.log("Saved"))
    .catch((err) => console.log("Error", err));

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  Data.findOne(
    { title: "Full Stack Data Science With 1 Year Internship" },
    (err, data) => {
      if (err) console.log(err);

      if (!data) {
        const data1 = new Data(info);
        data1
          .save()
          .then(() => console.log("Saved successfully. Id: ", data1._id))
          .catch((err) => console.log(err));
      }
      else {
        console.log("Already exists with Id: ", data._id);
      }
    }
  );

  app.use("/get", route);

  app.listen(3000, () => {
    console.log("Listening on 3000");
  });

  console.log(`Worker ${process.pid} started`);
}
