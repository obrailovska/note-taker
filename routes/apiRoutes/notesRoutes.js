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
  console.log(newNote);

  // update db arrary
  db.push(newNote);

  // updated jsonfile with new array
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

router.delete("/notes/:id", (req, res) => {
  const { id } = req.params; // <-- id being passed from FE

  //   equals list of objects w/o same id
  const newDb = db.filter((note) => note.id !== id);

  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(newDb),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  console.log("wrote to file");
  res.json(newDb);
});

module.exports = router;
