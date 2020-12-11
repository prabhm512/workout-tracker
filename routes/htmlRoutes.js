const path = require("path");

// Shorthand for exporting html routes and using them in server.js
module.exports = function(app) {
    // GET index.html
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
    // GET exercise.html
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
    // GET stats.html
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    })
}