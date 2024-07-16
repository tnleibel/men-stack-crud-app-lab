const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

const Movie = require("./models/movie.js")

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

app.get("/", async (req, res) => {
    res.render("index.ejs")
})

app.get("/movies", async (req, res) => {
    const allMovies = await Movie.find()
    console.log(allMovies)
    res.render("movies/index.ejs", { movies: allMovies })
})

app.get("/movies/new", (req, res) => {
    res.render("movies/new.ejs")
})

app.get("/movies/:movieId", async (req, res) => {
    const foundMovie = await Movie.findById(req.params.movieId)
    res.render("movies/show.ejs", { movie: foundMovie })
})

app.post("/movies", async (req, res) => {
    await Movie.create(req.body)
    res.redirect("/movies")
})

app.delete("/movies/:movieId", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.movieId)
    res.redirect("/movies")
})

app.get("/movies/:movieId/edit", async (req, res) => {
    const foundMovie = await Movie.findById(req.params.movieId)
    res.render("movies/edit.ejs", {
        movie: foundMovie
    })
})

app.put("/movies/:movieId", async (req, res) => {
    await Movie.findByIdAndUpdate(req.params.movieId, req.body)
    res.redirect(`/movies/${req.params.movieId}`)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})