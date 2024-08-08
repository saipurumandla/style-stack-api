const express = require("express");
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployee,
} = require("../controllers/employeesController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("employees", 600), getEmployees)
  .post(deCache("employees"), addEmployee);

router
  .route("/:id")
  .delete(deCache("employees"), deleteEmployee)
  .put(deCache("employees"), updateEmployee)
  .get(cache("employees", 600), getEmployee);

module.exports = router;
