const db = require("../../db");

module.exports = {
  create(organisation_id, email, password_hash, name) {
    return db
      .prepare(
        "INSERT INTO users (organisation_id, email, password_hash, name) VALUES (?, ?, ?, ?)"
      )
      .run(organisation_id, email, password_hash, name);
  },

  findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  findById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  }
};
