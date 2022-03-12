const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const db = require("../../db/db.json");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  let results = db;

  res.json(results);
});

router.post("/notes", (req, res) => {
  let { title, text } = req.body;
  let newNote = { title, text, id: uuidv4() };

  db.push(newNote);
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(db),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  res.json(db);
});
module.exports = router;
