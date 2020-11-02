const NotesService = {
  getAllNotes(knex) {
    return knex.select("*").from("notes");
  },
  getById(knex, id) {
    return knex.select("*").from("notes").where("id", id).first();
  },
};

module.exports = NotesService;
