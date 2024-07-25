import express from "express";
import {
  dashboardUser,
 
} from "../controllers/dashboardController";
import { ensureAuthenticated } from "../middleware/auth";

const router = express.Router();

// Main dashboard route
router.get("/", ensureAuthenticated, dashboardUser);



export default router;
