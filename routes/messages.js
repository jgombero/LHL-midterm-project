/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.params) {
      const userID = req.cookies.user_id;
      console.log(userID);
      database.getUserMessages(userID)
        .then(messages => {
          console.log(messages);
          res.json({messages});
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

      // Not logged in
    } else {
      console.log('no user id');
    }

  });

  router.post("/new/", (req, res) => {
    console.log('req to API /messages: ', req.body);
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
