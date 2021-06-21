const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate()
    .addFields({
      totalDuration: { $sum: "$exercises.duration" },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate()
    .addFields({
      totalDuration: { $sum: "$exercises.duration" },
    })
    .limit(7)
    .sort({ _id: -1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
