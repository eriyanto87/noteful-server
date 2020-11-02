const express = require("express");
const FoldersService = require("../services/folders-service");

const folderRouter = express.Router();
const bodyParser = express.json();

folderRouter
  .route("/")
  .get((req, res, next) => {
    FoldersService.getAllFolders(req.app.get("db"))
      .then((folder) => {
        res.json(folder);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { folder_name } = req.body;
    const newFolder = { folder_name };
    for (const field of ["folder_name"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: {
            message: `${field} is missing`,
          },
        });
      }
    }
    FoldersService.addFolder(req.app.get("db"), newFolder)
      .then((folder) => {
        res.status(201).location(`/${folder.id}`).json(folder);
      })
      .catch(next);
  });

folderRouter
  .route("/:id")
  .get((req, res, next) => {
    const { id } = req.params;
    console.log(id);
    FoldersService.getById(req.app.get("db"), id)
      .then((folder) => {
        if (!folder) {
          return res.status(404).json({
            error: {
              message: `folder not found`,
            },
          });
        }
        res.json(folder);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    FoldersService.deleteFolder(req.app.get("db"), id)
      .then(() => {
        console.log("deleted");
        return res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { id } = req.params;
    const updatedFolder = req.body;
    console.log(updatedFolder);
    FoldersService.updateFolder(req.app.get("db"), id, updatedFolder)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = folderRouter;
