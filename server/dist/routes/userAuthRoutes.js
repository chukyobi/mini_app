"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const router = express_1.default.Router();
// Route for authenticating user via Telegram
router.get("/authUser", userAuthController_1.authUser);
// Route for handling Twitter follow page and follow status
router.get("/authTwitter", userAuthController_1.authTwitter);
exports.default = router;
