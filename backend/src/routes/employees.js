const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.use(auth);

router.get("/", listEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
