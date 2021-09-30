/* eslint-disable linebreak-style */
const express = require("express");
const app = express();

exports.handler = (req, res, db) => {
  app.post("/student", (req, res) => {
    (async () => {
      try {
        // db.settings({ ignoreUndefinedProperties: true });
        await db
            .collection("attendance")
            .doc("/" + req.body.msNo + "/")
            .create({
              msNo: req.body.msNo,
              module: req.body.module,
              attended: req.body.attended,
              total: req.body.total,
            });
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });
};
