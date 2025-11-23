const db = require("../db");

module.exports = {
  create(orgId, first_name, last_name, email, phone) {
    return db
      .prepare(
        `INSERT INTO employees (organisation_id, first_name, last_name, email, phone)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(orgId, first_name, last_name, email, phone);
  },

  findAll(orgId) {
    return db
      .prepare("SELECT * FROM employees WHERE organisation_id = ?")
      .all(orgId);
  },

  findById(id) {
    return db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
  },

  update(id, first_name, last_name, email, phone) {
    return db
      .prepare(
        `UPDATE employees 
         SET first_name=?, last_name=?, email=?, phone=? 
         WHERE id=?`
      )
      .run(first_name, last_name, email, phone, id);
  },

  delete(id) {
    return db.prepare("DELETE FROM employees WHERE id = ?").run(id);
  }
};
