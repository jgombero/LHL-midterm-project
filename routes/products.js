/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require('../server/database.js');
const { response } = require('express');


// This is the productsRoutes(db) that is called from server.js
module.exports = function (db) {
  router.get("/categories", (req, res) => {
    database.getAllCategories(db, req.query, 20)
      .then(categories => {
        // console.log('return products from db: ', categories);
        res.send({ categories });
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
        res.send({ products });
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
        res.send({ myProducts });
      });
  });

  router.post("/", (req, res) => {
    if (req.cookies.user_id) {
      req.body.owner_id = req.cookies.user_id;
      req.body.price *= 100;
      database.postNewProduct(db, req.body)
        .then(addedProduct => {
          res.send(addedProduct);
        });
    }
  });

  router.post('/save/:prodID', (req, res) => {
    let prodID = req.params.prodID
    console.log('REQUEST TO SAVE FOR PROD: ', prodID);
    if (req.cookies.user_id) {
      database.toggleFavorites(db, req.cookies.user_id, prodID)
        .then(response => {
          res.send(response);
        });
    }
  });

  router.get('/save/:prodID', (req, res) => {
    let prodID = req.params.prodID
    console.log('REQUEST TO CHECK FOR PROD: ', prodID);
    if (req.cookies.user_id) {
      database.checkFavorite(db, req.cookies.user_id, prodID)
        .then(response => {
          res.send(response);
        });
    }
  });

  return router;


};
