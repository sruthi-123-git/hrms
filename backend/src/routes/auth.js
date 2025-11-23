// const express = require("express");
// const { login, registerOrg } = require("../controllers/authController");
// const router = express.Router();

// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

//     // Lookup user in DB (pseudo-code)
//     const user = await db.getUserByEmail(email);
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     const valid = password === user.password; // Replace with proper hash check
//     if (!valid) return res.status(401).json({ message: "Invalid email or password" });

//     const token = generateJWT(user.id); // Your JWT function
//     res.json({ token });
//   } catch (err) {
//     next(err); // Send error to global handler
//   }
// });


// router.post("/register", registerOrg);

// module.exports = router;

const express = require("express");
const { login, registerOrg } = require("../controllers/authController");
const db = require("../../db");  // ✅ FIX ADDED
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await db.getUserByEmail(email); // Now db exists 🎉
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const valid = password === user.password;
    if (!valid) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateJWT(user.id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", registerOrg);

module.exports = router;
