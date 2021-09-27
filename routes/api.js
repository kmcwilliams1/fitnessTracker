const app = require('express').Router();
const Workout = require('../models/workout')

app.get('/api/workouts', (req, res)=>{
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }
    ])
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get('/api/workouts/range', (req, res)=>{
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }
    ]).limit(7)
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post('/api/workouts', (req, res)=>{
    Workout.create({})
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
});

app.put('/api/workouts/:id' ,(req, res) =>{
    Workout.findByIdAndUpdate(req.params.id, {
        $push: {exercises: req.body}
    },
    {
        new:true,
        runValidators: true
        //has to have type, durations, ect
    })
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
})

module.exports = app;