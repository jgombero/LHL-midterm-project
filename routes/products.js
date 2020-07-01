/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../server/database.js');


// This is the productsRoutes(db) that is called from server.js
module.exports = function(db) {
  router.get("/categories", (req, res) => {
    database.getAllCategories(db, req.query, 20)
      .then(categories => {
        // console.log('return products from db: ', categories);
        res.send({categories});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    console.log('request to products API: ', req.query);

    database.getAllProductsFromDB(db, req.query, 20)
      .then(products => {
        // console.log('return products from db: ', products);
        res.send({products});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/favorites", (req, res) => {
    database.getUserFavorites(db, req.cookies.user_id)
    .then(favorites => {
      res.send({ favorites });
    });
  });

  router.get("/me", (req, res) => {

    database.getUserProducts(db, req.cookies.user_id)
    .then(myProducts => {
      console.log(myProducts);
      res.send({myProducts});
    });
  });

  return router;
};
