const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.set("useFindAndModify", false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const connectDb = () => {
  return mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/fitnessTrackerDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
};

connectDb().then(async () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});
