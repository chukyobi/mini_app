"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const twitterFollowController_1 = require("../controllers/twitterFollowController");
const router = express_1.default.Router();
// Route for following a Twitter account
router.get("/followTwitter", twitterFollowController_1.followTwitter);
exports.default = router;
