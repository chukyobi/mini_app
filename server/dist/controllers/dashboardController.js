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
exports.dashboardUser = void 0;
const userServices_1 = require("../services/userServices");
const dashboardUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: "User session not found" });
    }
    try {
        // Fetch the logged-in user's data
        const loggedInUser = yield (0, userServices_1.getUserDataFromDb)(userId);
        if (!loggedInUser) {
            return res.status(404).json({ error: "User not found" });
        }
        // Prepare response data for the logged-in user
        const userData = {
            userId: loggedInUser.usertelegramId,
            firstname: loggedInUser.firstname,
            username: loggedInUser.username,
            farmedPoints: loggedInUser.farmedPoints,
            walletAddress: loggedInUser.walletAddress,
            profileImage: loggedInUser.profileImage,
        };
        // Fetch all users sorted by farmedPoints in descending order
        const topUsers = yield (0, userServices_1.getAllUsersSortedByPoints)();
        // Prepare response data for dashboard (all users)
        const leaderboardData = topUsers.slice(0, 4).map((user) => ({
            userId: user.usertelegramId,
            firstname: user.firstname,
            username: user.username,
            farmedPoints: user.farmedPoints,
            profileImage: user.profileImage
        }));
        // Return response with both user data and dashboard data
        return res.json({ userData, leaderboardData });
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.dashboardUser = dashboardUser;
