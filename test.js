const express = require("express");
const path = require("path");
const anal = require("./tspnode");

const port =   process.env.PORT || 3000 

const publicFolder = path.join(__dirname, "/public");

const app = express();

app.use(express.static(publicFolder));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/tsp", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "ERROR",
    });
  }

  anal(req.query.search, (error, data) => {
    if (error) {
      return res.send({
        error: "Cannot Find Given Address",
      });
    }
    res.send({
      data1: data,
    });
  });
});

app.listen(port, () => {
  console.log("Running Server at " + port);
});
