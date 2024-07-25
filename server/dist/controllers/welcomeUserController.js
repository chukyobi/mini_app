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
exports.welcomeUser = void 0;
const userServices_1 = require("../services/userServices");
const welcomeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(400).json({ error: "User session not found" });
        }
        const user = yield (0, userServices_1.getUserDataFromDb)(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Check if the user is new
        const isNewUser = user.lastLogin === null || user.dateCreated.getTime() === user.lastLogin.getTime();
        // Update last login time
        yield (0, userServices_1.updateUserLastLogin)(userId);
        // Extract relevant user data for response
        const { firstname, username, farmedPoints, profileImage, referralLink, dateCreated, lastLogin } = user;
        // Prepare response data
        const userData = {
            userId,
            firstname,
            username,
            farmedPoints,
            profileImage,
            referralLink,
            dateCreated,
            lastLogin,
            isNewUser,
        };
        // Return response with user data
        return res.json({ userData });
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.welcomeUser = welcomeUser;
