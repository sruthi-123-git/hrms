const db = require("../../db");

module.exports = {
  assign(employeeId, teamId) {
    return db
      .prepare(
        `INSERT INTO employee_teams (employee_id, team_id)
         VALUES (?, ?)`
      )
      .run(employeeId, teamId);
  },

  unassign(employeeId, teamId) {
    return db
      .prepare(
        `DELETE FROM employee_teams 
         WHERE employee_id=? AND team_id=?`
      )
      .run(employeeId, teamId);
  },

  findTeamsByEmployee(employeeId) {
    return db
      .prepare(
        `SELECT t.* FROM teams t
         JOIN employee_teams et ON et.team_id = t.id
         WHERE et.employee_id = ?`
      )
      .all(employeeId);
  }
};
