const db = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerOrg = (req, res) => {
  const { orgName, adminName, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const org = db
    .prepare("INSERT INTO organisations (name) VALUES (?)")
    .run(orgName);

  const user = db
    .prepare(
      `INSERT INTO users (organisation_id, email, password_hash, name)
       VALUES (?, ?, ?, ?)`
    )
    .run(org.lastInsertRowid, email, hash, adminName);

  const token = jwt.sign(
    { userId: user.lastInsertRowid, orgId: org.lastInsertRowid },
    process.env.JWT_SECRET
  );

  res.json({ token });
};

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   const user = db
//     .prepare("SELECT * FROM users WHERE email = ?")
//     .get(email);

//   if (!user) return res.status(400).json({ message: "User not found" });

//   if (!bcrypt.compareSync(password, user.password_hash))
//     return res.status(400).json({ message: "Invalid password" });

//   const token = jwt.sign(
//     { userId: user.id, orgId: user.organisation_id },
//     process.env.JWT_SECRET
//   );

//   res.json({ token });
// };

exports.login = async (req, res) => {
  console.log("Login request body:", req.body); // see what is being sent
  try {
    const { email, password } = req.body;
    // your existing login logic here
  } catch (err) {
    console.error("Login error:", err); // see exact backend error
    res.status(500).json({ message: "Internal server error" });
  }
};
