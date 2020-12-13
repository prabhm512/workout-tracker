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
    
    // POST new workout to collection
    app.post("/api/workouts", ({ body }, res) => {
        const workout = new Workout(body);
        workout.calculateTotalDuration();
        
        console.log(workout);

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

        // If exercise type is cardio
        if (req.body.type === "cardio") {

            Workout.collection.updateOne(
                { _id: id },
                { 
                    $set: {
                        day: new Date().setDate(new Date().getDate()) 
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

            Workout.collection.updateOne(
                { _id: id },
                { 
                    $set: {
                        day: new Date().setDate(new Date().getDate()) 
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
    });
}