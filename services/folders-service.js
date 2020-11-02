const FoldersService = {
  getAllFolders(knex) {
    return knex.select("*").from("folders");
  },
  getById(knex, id) {
    return knex.from("folders").where("id", id).first();
  },
  addFolder(knex, newFolder) {
    return knex
      .from("folders")
      .insert("folders")
      .returning("*")
      .then((folder) => {
        return folder[0];
      });
  },
  deleteFolder(knex, id) {
    return knex.from("folders").where({ id }).delete();
  },
  updateFolder(knex, id, updatedFolder) {
    return knex.from("folders").where({ id }).update(updatedFolder);
  },
};

module.exports = FoldersService;
