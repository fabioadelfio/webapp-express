const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movies');
const notFound = require(`./middlewares/notFound`);
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

// Global Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/movies', moviesRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => console.log("Server listening on http://localhost:3000"));