"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const welcomeUserController_1 = require("../controllers/welcomeUserController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Apply the middleware to the routes that require authentication
router.get('/', auth_1.ensureAuthenticated, welcomeUserController_1.welcomeUser);
exports.default = router;
