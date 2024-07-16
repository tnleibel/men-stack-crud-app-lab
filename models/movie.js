const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name: String,
    director: String,
    releaseYear: String,
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie