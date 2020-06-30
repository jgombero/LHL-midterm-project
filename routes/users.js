/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//  ROUTES TO /api/users
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/login/:email", (req, res) => {
    // Function to find user_id for given email
    getUserWithEmail(req.params.email)
      .then(user => {
        req.session.user_id = user.id;
        res.redirect('/', user.id);
      })

    // Assign a cookie for the user_id we just looked up.
  })

  return router;
};
