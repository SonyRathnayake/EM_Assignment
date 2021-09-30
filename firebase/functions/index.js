const functions = require("firebase-functions");
const admin = require("firebase-admin");
const attModule = require("./attendance");
const express = require("express");
const cors = require("cors");
const app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://emassignment-236c8..firebaseio.com",
});

const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});

app.use(cors({origin: true}));

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.post("/api/user/create", (req, res) => {
  (async () => {
    try {
      console.log(req.body);
      // db.settings({ ignoreUndefinedProperties: true });
      await db
          .collection("user")
          .doc("/" + req.body.msNo + "/")
          .create({
            cGPA: req.body.cGPA,
            masterProgramme: req.body.masterProgramme,
            name: req.body.name,
            semester: req.body.semester,
            year: req.body.year,
          });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.dummy = functions.https.onRequest(app);
exports.attendance = functions.https.onRequest((req, res) => {
  attModule.handler(req, res, db);
});
