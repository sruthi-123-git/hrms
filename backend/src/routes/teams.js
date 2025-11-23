// const express = require("express");
// const router = express.Router();

// // Correct import: do NOT destructure
// const authMiddleware = require("../middlewares/authMiddleware");

// // Controller imports
// const {
//   listTeams,
//   createTeam,
//   updateTeam,
//   deleteTeam,
//   assignEmployee,
//   unassignEmployee
// } = require("../controllers/teamController");

// // Apply middleware
// router.use(authMiddleware);

// // Routes
// router.get("/", listTeams);
// router.post("/", createTeam);
// router.put("/:id", updateTeam);
// router.delete("/:id", deleteTeam);
// router.post("/:teamId/assign", assignEmployee);
// router.post("/:teamId/unassign", unassignEmployee);

// module.exports = router;

const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  listTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee
} = require("../controllers/teamController");

router.use(auth);

router.get("/", listTeams);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

router.post("/:teamId/assign", assignEmployee);

module.exports = router;
