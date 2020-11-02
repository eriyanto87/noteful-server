const NotesService = {
  getAllNotes(knex) {
    return knex.select("*").from("notes");
  },
  getById(knex, id) {
    return knex.select("*").from("notes").where("id", id).first();
  },
  insertNotes(knex, newNotes) {
    return knex
      .insert(newNotes)
      .into("notes")
      .returning("*")
      .then((note) => {
        return note[0];
      });
  },
  deleteNotes(knex, id) {
    return knex.from("notes").where({ id }).delete();
  },
  updateNotes(knex, id, updatedNotes) {
    return knex.from("notes").where({ id }).update(updatedNotes);
  },
};

module.exports = NotesService;
