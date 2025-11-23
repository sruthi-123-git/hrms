const db = require("../../db");

module.exports = {
  create(name) {
    return db
      .prepare("INSERT INTO organisations (name) VALUES (?)")
      .run(name);
  },

  findById(id) {
    return db.prepare("SELECT * FROM organisations WHERE id = ?").get(id);
  }
};
