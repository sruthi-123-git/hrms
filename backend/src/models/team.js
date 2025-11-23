const db = require("../../db");

module.exports = {
  create(orgId, name, description) {
    return db
      .prepare(
        `INSERT INTO teams (organisation_id, name, description) 
         VALUES (?, ?, ?)`
      )
      .run(orgId, name, description);
  },

  findAll(orgId) {
    return db
      .prepare("SELECT * FROM teams WHERE organisation_id = ?")
      .all(orgId);
  },

  update(id, name, description) {
    return db
      .prepare("UPDATE teams SET name=?, description=? WHERE id=?")
      .run(name, description, id);
  },

  delete(id) {
    return db.prepare("DELETE FROM teams WHERE id=?").run(id);
  }
};
