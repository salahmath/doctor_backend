const express = require("express");
const { register, login, users, updateUser, deleteUser, bloqUser } = require("../controlles/userControllers");
const { isAdmin } = require("../controlles/userControllers");

const router = express.Router();

// Routes utilisateur
router.post("/register", register);
router.post("/login", login);
router.get("/admin", isAdmin);
router.get("/users", isAdmin,users);
router.put("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)
router.put("/bloqedUser/:id",isAdmin,bloqUser)
module.exports = router;
