// const db = require("../models");
const Workout = require("../models/workout.js");
const mongoose = require("mongoose");

module.exports = function(app) {
    // GET all workouts inside collection
    app.get("/api/workouts", (req, res) => {
        Workout.find({})
        .then((workout) => {
            res.status(200).json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    });
    
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({})
        .then((workout) => {
            res.status(200).json(workout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    });
    // POST new workout to collection
    app.post("/api/workouts", ({ body }, res) => {
        const workout = new Workout(body);

        Workout.create({_id: workout._id})
        .then(dbWorkout => res.json(dbWorkout))
        .catch(err => res.json(err));
    })

    // UPDATE collection with new workout
    app.put("/api/workouts/:id", async (req, res) => {
        console.log(req.params.id);
        console.log(req.body);
        
        // Parameter ID is a string. Convert it into the mongoose Id format.
        // This is done so that a new document is not created every time the upadate is run. 
        let id = mongoose.Types.ObjectId(req.params.id);

        // Keep track of workout total duration after a new exercise is added to that workout
        let totalDuration = 0;

        // Find document with current ID so duration of all exercises within it can be added up
        await Workout.find({_id: id}, function(err, result) {
            if (err) {
                console.log(err);
            }
            result[0].exercises.forEach(el => {
                // Update total duration
                totalDuration+=parseInt(el.duration);
            });
        });

        // If exercise type is cardio
        if (req.body.type === "cardio") {
            // Add duration of latest exercise to workout
           const durationWithLatestExercise = totalDuration + parseInt(req.body.duration);

            Workout.collection.updateOne(
                { _id: id },
                { 
                    $set: {
                        day: new Date().setDate(new Date().getDate()),
                        totalDuration: durationWithLatestExercise
                    },
                    $push: { 
                        exercises: {                       
                                type: req.body.type,
                                name: req.body.name,
                                distance: req.body.distance,
                                duration: req.body.duration
                            }
                        }
                },
                { upsert: true }
            )
            .then(workouts => res.status(200).json(workouts))
            .catch(err => res.status(400).json(err));
        }

        // If exercise type is resistance
        else if (req.body.type === "resistance") {
            // Add duration of latest exercise to workout
            const durationWithLatestExercise = totalDuration + parseInt(req.body.duration);

            Workout.collection.updateOne(
                { _id: id },
                { 
                    $set: {
                        day: new Date().setDate(new Date().getDate()),
                        totalDuration: durationWithLatestExercise
                    },
                    $push: { 
                        exercises: {                       
                                type: req.body.type,
                                name: req.body.name,
                                weight: req.body.weight,
                                sets: req.body.sets,
                                reps: req.body.reps,
                                duration: req.body.duration
                            }
                    } 
                },
                { upsert: true }
            )
            .then(workouts => res.status(200).json(workouts))
            .catch(err => res.status(400).json(err));
        }

        // Find document with current ID so duration of all exercises within it can be added up
        // await Workout.find({_id: id}, function(err, result) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     result[0].exercises.forEach(el => {
        //         // Update total duration
        //         totalDuration+=parseInt(el.duration);
        //     });
        // });

        // Set the total duration
        // Workout.collection.updateOne(
        //     { _id: id},
        //     { $set: { totalDuration: totalDuration } }
        // )
    });
}

