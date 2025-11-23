const db = require("../../db");

exports.listEmployees = (req, res) => {
  const employees = db
    .prepare("SELECT * FROM employees WHERE organisation_id = ?")
    .all(req.user.orgId);

  res.json(employees);
};

exports.createEmployee = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  const employee = db
    .prepare(
      `INSERT INTO employees (organisation_id, first_name, last_name, email, phone)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(req.user.orgId, first_name, last_name, email, phone);

  res.json({ id: employee.lastInsertRowid });
};

exports.updateEmployee = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const id = req.params.id;

  db.prepare(
    `UPDATE employees SET first_name=?, last_name=?, email=?, phone=? WHERE id=?`
  ).run(first_name, last_name, email, phone, id);

  res.json({ message: "Updated" });
};

exports.deleteEmployee = (req, res) => {
  db.prepare(`DELETE FROM employees WHERE id=?`).run(req.params.id);
  res.json({ message: "Deleted" });
};
