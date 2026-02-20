import express from "express";
import { createUser,login,logout } from "./user.controller.js"
const router = express.Router();

router.post("/register", createUser);
router.post("/login",login);
router.post("/logout",logout)

export default router;