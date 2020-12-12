// const db = require("../models");
const Workout = require("../models/workout.js");

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

        Workout.create({_id: workout})
        .then(dbWorkout => res.json(dbWorkout))
        .catch(err => res.json(err));
    })

    // UPDATE collection with new workout
    app.put("/api/workouts/:id", async (req, res) => {
        console.log(req.params.id);
        console.log(req.body);
        
        // Populated in the if/else statement
        let updateWorkout = {};
        
        // If exercise type is cardio
        if (req.body.type === "cardio") {
    
            updateWorkout = {    
                day: new Date().setDate(new Date().getDate()),
                exercises: [
                    {
                        type: req.body.type,
                        name: req.body.name,
                        distance: req.body.distance,
                        duration: req.body.duration
                    }
                ]     
            }

            console.log(updateWorkout);

            // A document is created on loading the /exercise page
            // Delete that document and create a new one
            Workout.deleteOne({ _id: req.params.id })
            .then(() => {
                Workout.collection.updateOne(
                    { _id: req.params.id },
                    { $set: updateWorkout },
                    { upsert: true }
                )
                .then(workouts => res.status(200).json(workouts))
                .catch(err => res.status(400).json(err));
            })
        }

        // If exercise type is resistance
        else if (req.body.type === "resistance") {

            updateWorkout = {
                day: new Date().setDate(new Date().getDate()),
                exercises: [
                    {
                        type: req.body.type,
                        name: req.body.name,
                        weight: req.body.weight,
                        sets: req.body.sets,
                        reps: req.body.reps,
                        duration: req.body.duration
                    }
                ]
            }

            console.log(updateWorkout);

            Workout.deleteOne({ _id: req.params.id })
            .then(() => {
                Workout.collection.updateOne(
                    { _id: req.params.id },
                    { $set: updateWorkout },
                    { upsert: true }
                )
                .then(workouts => res.status(200).json(workouts))
                .catch(err => res.status(400).json(err));
            })
        }
    });
}