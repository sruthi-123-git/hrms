const db = require("../../db");

module.exports = {
  create(orgId, userId, action, metaObj = {}) {
    const meta = JSON.stringify(metaObj);

    return db
      .prepare(
        `INSERT INTO logs (organisation_id, user_id, action, meta)
         VALUES (?, ?, ?, ?)`
      )
      .run(orgId, userId, action, meta);
  },

  findAll(orgId) {
    return db
      .prepare("SELECT * FROM logs WHERE organisation_id = ? ORDER BY id DESC")
      .all(orgId);
  }
};

