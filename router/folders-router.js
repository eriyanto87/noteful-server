const express = require("express");
const FoldersService = require("../services/folders-service");

const folderRouter = express.Router();

folderRouter.route("/").get((req, res, next) => {
  FoldersService.getAllFolders(req.app.get("db"))
    .then((folder) => {
      res.json(folder);
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
  });

module.exports = folderRouter;
