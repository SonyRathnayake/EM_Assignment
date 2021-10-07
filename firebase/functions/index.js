/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://emassignment-236c8..firebaseio.com",
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World!");
});

// Users
/* Create User */
app.post("/api/user/create", (req, res) => {
  (async () => {
    try {
      await db
        .collection("user")
        .doc("/" + req.body.msNo + "/")
        .create({
          cGPA: req.body.cGPA,
          masterProgramme: req.body.masterProgramme,
          name: req.body.name,
          semester: req.body.semester,
          year: req.body.year,
          NIC: req.body.NIC,
        });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

/* Get User by user id */
app.get("/api/user/getuser/:uid", (req, res) => {
  (async () => {
    try {
      const document = db.collection("user").doc(req.params.uid);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

/* Get all users */
app.get("/api/user/getallusers", (req, res) => {
  (async () => {
    try {
      const query = db.collection("user");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            msNo: doc.id,
            cGPA: doc.data().cGPA,
            masterProgramme: doc.data().masterProgramme,
            name: doc.data().name,
            semester: doc.data().semester,
            year: doc.data().year,
            NIC: doc.data().NIC,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// Attendance
/* Create Attendance */
app.post("/api/attendance/create", (req, res) => {
  (async () => {
    try {
      console.log(req.body);
      await db
        .collection("attendance")
        .doc("/" + req.body.msNo + "/")
        .create({
          module1: req.body.module1,
          module2: req.body.module2,
          module3: req.body.module3,
          module4: req.body.module4,
          module5: req.body.module5,
          module6: req.body.module6,
          optional: req.body.optional,
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

/* get Attendance */
app.get("/api/getattendance/:uid", (req, res) => {
  (async () => {
    try {
      const document = db.collection("attendance").doc(req.params.uid);
      const user = await document.get();
      const response = user.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.backend = functions.https.onRequest(app);
