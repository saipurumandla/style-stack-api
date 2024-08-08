const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/usersController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("users", 600), getUsers)
  .post(deCache("users"), addUser);

router
  .route("/:id")
  .delete(deCache("users"), deleteUser)
  .put(deCache("users"), updateUser)
  .get(cache("users", 600), getUser);

module.exports = router;
