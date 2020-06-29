/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../server/database.js');

let $popup;

// This is the productsRoutes(db) that is called from server.js
module.exports = function(db) {
  router.get("/", (req, res) => {
    // const userId = req.session.userId;
    console.log('request to products API: ', req.body);

    database.getAllProductsFromDB(db, req.query, 20)
      .then(products => {
        console.log('return products from db: ', products);
        res.send({products});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });

  return router;
};
