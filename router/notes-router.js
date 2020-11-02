const express = require("express");
const notesService = require("../services/notes-service");

const notesRouter = express.Router();

notesRouter
  .route("/")
  .get((req, res, next) => {
    notesService
      .getAllNotes(req.app.get("db"))
      .then((notes) => {
        res.json(notes);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    for (const field of ["notes_name", "notes_content"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: {
            message: `${field} is required`,
          },
        });
      }
    }
    const newNotes = {
      notes_name: req.body.notes_name,
      notes_content: req.body.notes_content,
    };

    console.log;
    notesService
      .insertNotes(req.app.get("db"), newNotes)
      .then((newNote) => {
        res.status(201).json(newNote);
      })
      .catch(next);
  });

notesRouter
  .route("/:id")
  .get((req, res, next) => {
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
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    notesService
      .deleteNotes(req.app.get("db"), id)
      .then(() => {
        return res.status(204).send("note deleted").end();
      })
      .catch(next);
  });

module.exports = notesRouter;
