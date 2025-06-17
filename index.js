const express = require('express');
const app = express();
const moviesRoutes = require('./routes/movies');

app.use(express.json());
app.use('/movies', moviesRoutes);

app.listen(3000, () => console.log("Server listening on http://localhost:3000"));