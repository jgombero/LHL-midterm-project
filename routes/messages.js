/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /products
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../server/database.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.cookies.user_id) {
      const userID = req.cookies.user_id;
      console.log(userID);
      database.getUserMessages(db, userID)
        .then(messages => {
          console.log('messages: ', messages);
          res.send({messages, userID});
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {

      // NEED TO UPDATE THE REDIRECT
      res.redirect('/');
    }
  });
  router.get("/unique", (req, res) => {
    if (req.cookies.user_id) {
      const userID = req.cookies.user_id;
      database.getUniqueMessageTopics(db, userID)
        .then(messages => {
          console.log('messages: ', messages);
          res.send({messages, userID});
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      // NEED TO UPDATE THE REDIRECT
      res.redirect('/');
    }
  });

  router.post("/", (req, res) => {
    if (req.cookies.user_id) {
      // Check if user is logged in
      console.log('req to API /messages: ', req.body);
      // let query = `SELECT * FROM widgets`;
      // console.log(req.body);
      req.body['from_user_id'] = req.cookies.user_id;

      database.postNewMessage(db, req.body)
        .then(messageResponse => {
          // console.log(messageResponse);
          res.send({messageResponse});
        })
        .catch(err => {
          res
            .status(500)
            .json({error: err.message});
        });
    }
  });
  return router;
};
