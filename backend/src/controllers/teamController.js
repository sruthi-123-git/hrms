// const team = require("../models/team");
// const employee = require("../models/employee");
// const employeeTeam = require("../models/employeeTeam");
// const log = require("../middlewares/logAction");

// // List all teams for the user's organisation
// exports.listTeams = async (req, res) => {
//   try {
//     const teams = await team.findAll({
//       where: { organisation_id: req.user.orgId },
//       include: employee
//     });
//     res.json(teams);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch teams" });
//   }
// };

// // Create a new team
// exports.createTeam = async (req, res) => {
//   try {
//     const newTeam = await team.create({
//       ...req.body,
//       organisation_id: req.user.orgId
//     });

//     await log("team_created", req.user.orgId, req.user.userId, {
//       teamId: newTeam.id
//     });

//     res.status(201).json(newTeam);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create team" });
//   }
// };

// // Update a team
// exports.updateTeam = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [updated] = await team.update(req.body, {
//       where: { id, organisation_id: req.user.orgId }
//     });

//     if (!updated) return res.status(404).json({ message: "Team not found" });

//     await log("team_updated", req.user.orgId, req.user.userId, { teamId: id });
//     res.json({ message: "Team updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update team" });
//   }
// };

// // Delete a team
// exports.deleteTeam = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await team.destroy({
//       where: { id, organisation_id: req.user.orgId }
//     });

//     if (!deleted) return res.status(404).json({ message: "Team not found" });

//     await log("team_deleted", req.user.orgId, req.user.userId, { teamId: id });
//     res.json({ message: "Team deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete team" });
//   }
// };

// // Assign employee to a team
// exports.assignEmployee = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const { employeeId } = req.body;

//     await employeeTeam.create({ team_id: teamId, employee_id: employeeId });

//     await log("team_assignment", req.user.orgId, req.user.userId, {
//       teamId,
//       employeeId
//     });

//     res.json({ message: "Employee assigned to team" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to assign employee" });
//   }
// };

// // Unassign employee from a team
// exports.unassignEmployee = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const { employeeId } = req.body;

//     const removed = await employeeTeam.destroy({
//       where: { team_id: teamId, employee_id: employeeId }
//     });

//     if (!removed) return res.status(404).json({ message: "Assignment not found" });

//     await log("team_unassignment", req.user.orgId, req.user.userId, {
//       teamId,
//       employeeId
//     });

//     res.json({ message: "Employee unassigned from team" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to unassign employee" });
//   }
// };

const db = require("../../db");

exports.listTeams = (req, res) => {
  const teams = db
    .prepare("SELECT * FROM teams WHERE organisation_id = ?")
    .all(req.user.orgId);

  res.json(teams);
};

exports.createTeam = (req, res) => {
  const { name, description } = req.body;

  const result = db
    .prepare(
      `INSERT INTO teams (organisation_id, name, description) VALUES (?, ?, ?)`
    )
    .run(req.user.orgId, name, description);

  res.json({ id: result.lastInsertRowid });
};

exports.updateTeam = (req, res) => {
  const { name, description } = req.body;

  db.prepare(`UPDATE teams SET name=?, description=? WHERE id=?`).run(
    name,
    description,
    req.params.id
  );

  res.json({ message: "Updated" });
};

exports.deleteTeam = (req, res) => {
  db.prepare(`DELETE FROM teams WHERE id=?`).run(req.params.id);
  res.json({ message: "Deleted" });
};

exports.assignEmployee = (req, res) => {
  const { employeeId } = req.body;

  db.prepare(
    `INSERT INTO employee_teams (employee_id, team_id)
     VALUES (?, ?)`
  ).run(employeeId, req.params.teamId);

  res.json({ message: "Assigned" });
};
