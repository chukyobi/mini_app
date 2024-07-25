"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsername = void 0;
const userServices_1 = require("../services/userServices");
const updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId; // Get userId from session
    const { username, firstname } = req.body;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized access" });
    }
    if (!username || !firstname) {
        return res.status(400).json({ error: "Username and First Name are required" });
    }
    try {
        // Check if the username already exists
        const existingUser = yield (0, userServices_1.getUserByUsername)(username);
        if (existingUser) {
            return res.status(400).json({ error: "Username is taken" });
        }
        // Get user by userId
        const user = yield (0, userServices_1.getUserDataFromDb)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield (0, userServices_1.updateUser)(userId, { username, firstname });
        // Respond with a status to the frontend
        res.status(200).json({ status: "userupdated", userId });
    }
    catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUsername = updateUsername;
