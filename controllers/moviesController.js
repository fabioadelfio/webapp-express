const db = require(`../db/connection`);

const index = (req, res) => {
    const sql = `SELECT * FROM movies`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const show = (req, res) => {
    const movieId = req.params.id;

    const sql = `
        SELECT 
            m.id AS movie_id,
            m.title AS movie_title,
            m.director AS movie_director,
            m.genre AS movie_genre,
            m.release_year AS movie_year,
            m.abstract AS movie_abstract,
            m.image AS movie_image,

            r.id AS review_id,
            r.name AS review_name,
            r.vote AS review_vote,
            r.text AS review_text
        FROM movies m

        INNER JOIN reviews r
        ON m.id = r.movie_id

        WHERE m.id = ?
    `;

    db.query(sql, [movieId], (err, results) => {
        if(err) return res.status(500).json({ error: err.message });
        if(results.length === 0) return res.status(404).json({ error: `Movie Not Found` });

        const movie = {
            id: results[0].movie_id,
            title: results[0].movie_title,
            director: results[0].movie_director,
            genre: results[0].movie_genre,
            year: results[0].movie_year,
            abstract: results[0].movie_abstract,
            image: `/images/${results[0].movie_image}`,
            reviews: results.map(r => ({
                id: r.review_id,
                name: r.review_name,
                vote: r.review_vote,
                text: r.review_text
            }))
        }
        res.json(movie);
    });
}

const storeReview = (req, res) => {
    const { id } = req.params;
    const { name, vote, text } = req.body;

    const sql = `
        INSERT INTO movies.reviews (movie_id, name, vote, text) 
        VALUES (?, ?, ?, ?)
    `;

    const StoreReviewsValues = [
        id,
        name,
        vote,
        text,
    ]

    db.query(sql, StoreReviewsValues, (err, results) => {
        if (err) return res.status(500).json({ error:`Internal Server Error `, err });
        console.log(results);
        res.status(201).json({message: `Review Added`, id: results.insertId})
    })
}

module.exports = { index, show , storeReview};