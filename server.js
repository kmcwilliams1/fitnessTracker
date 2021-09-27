const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3030

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTracker_db", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});



// db.Exercise.create({ name: "Workout Routine" })
//     .then(dbExercise => {
//         console.log(dbExercise);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });


// app.get('/', (req, res) => {
//     db.Exercise.find({}, (err, data) => {
//         if (error) {
//             res.send(error);
//         } else {
//             res.json(data);
//         }
//     })
// })


// app.get('/exercise', async (req, res) => {
//     try {
//         res.render('/exercise', {
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// app.post("/stats", ({ body }, res) => {
//     db.Stat.create(body)
//         .then(({ _id }) => db.Library.findOneAndUpdate({}, {
//             $push: db.scores.aggregate([
//                 {
//                     $addFields: {
//                         totalDistance: { $sum: "$distance" },
//                         totalDuration: { $sum: "$duration" },
//                         totalWeight: { $sum: "$weight" },
//                         totalSets: { $sum: "$sets" },
//                         totalReps: { $sum: "$reps" },
//                     }
//                 },
//                 {
//                     $addFields: {
//                         totalScore:
//                             { $add: ["$totalDistance", "$totalDuration", "$totalWeight", "$totalSets", "$toalReps"] }
//                     }
//                 }
//             ])
//         }, { new: true }))
//         .then(dbExercise => {
//             res.json(dbExercise);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/stats", (req, res) => {
//     db.Stat.find({})
//         .then(dbStat => {
//             res.json(dbStat);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });