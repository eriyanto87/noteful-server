const express = require("express");
const NotesService = require("../services/notes-service");

const notesRouter = express.Router();
const bodyParser = express.json();

notesRouter
  .route("/")
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get("db"))
      .then((notes) => {
        res.json(notes);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { notes_name, notes_content, folder_id, date_modified } = req.body;
    const newNotes = { notes_name, notes_content, folder_id, date_modified };
    for (const field of ["notes_name", "notes_content"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: {
            message: `${field} is required`,
          },
        });
      }
    }
    NotesService.insertNotes(req.app.get("db"), newNotes)
      .then((newNote) => {
        res.status(201).location(`/${newNote.id}`).json(newNote);
      })
      .catch(next);
  });

notesRouter
  .route("/:id")
  .get((req, res, next) => {
    const { id } = req.params;
    NotesService.getById(req.app.get("db"), id)
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
    NotesService.deleteNotes(req.app.get("db"), id)
      .then(() => {
        return res.status(204).send("note deleted").end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const updatedNote = req.body;
    console.log(updatedNote, req.params.id);
    NotesService.updateNotes(req.app.get("db"), req.params.id, updatedNote)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = notesRouter;
