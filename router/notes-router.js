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

notesRouter.route("/:id").get((req, res, next) => {
  const { id } = req.params;
  notesService
    .getById(req.app.get("db"), id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          error: {
            message: `Note Not Found`,
          },
        });
      }
      res.json(note);
    })
    .catch(next);
});

module.exports = notesRouter;
