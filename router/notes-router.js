const express = require("express");
const notesService = require("../services/notes-service");

const notesRouter = express.Router();

notesRouter.route("/").get((req, res, next) => {
  notesService
    .getAllNotes(req.app.get("db"))
    .then((notes) => {
      res.json(notes);
    })
    .catch(next);
});

module.exports = notesRouter;
