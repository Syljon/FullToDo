const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const taskRoutes = require("./routes/task");

app.use("/api/task", taskRoutes);

const port = 5000;
mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on the port", port);
    });
  })
  .catch(err => {
    console.log(err);
  });
