const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  type: {
    type: String,
    enum: ["cardio", "resistance"]
  },
  name: {
    type: String
  },
  duration: {
    type: Number
  },
  weight: {
    type: Number
  },
  reps: {
    type: Number
  },
  sets: {
    type: Number
  }

});

const Workout = mongoose.model("Workout", UserSchema);

module.exports = Workout;