const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = 3000;

// Configuración de conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/cine', { useNewUrlParser: true, useUnifiedTopology: true });

const movieSchema = new mongoose.Schema({
    pelicula: String,
    sala: String,
    hora: String,
    fecha: Date,
    asiento: String,
    precio: String
});

// Modelo db
const Movie = mongoose.model('Movie', movieSchema);

// Crear tabla con conversión de fecha

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ruta para obtener los datos de las películas
app.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

// Ruta para agregar una nueva película
app.post('/movies', async (req, res) => {
    try {
        const newMovie = new Movie({
            ...req.body,
            fecha: moment(req.body.fecha, "D/M/YYYY").toDate()
        });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
