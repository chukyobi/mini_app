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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimPoints = exports.startFarmingPoints = exports.updateUserLastLogin = exports.getAllUsersSortedByPoints = exports.updateUser = exports.getUserByUsername = exports.getUserDataFromDb = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// Function to create a new user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userModel_1.default.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
});
exports.createUser = createUser;
// Function to get user data from DB by userId
const getUserDataFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByPk(userId);
        return user;
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
});
exports.getUserDataFromDb = getUserDataFromDb;
// Function to get user by username
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ where: { username } });
        return user;
    }
    catch (error) {
        console.error("Error fetching user by username:", error);
        return null;
    }
});
exports.getUserByUsername = getUserByUsername;
// Function to update a user
const updateUser = (usertelegramId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield userModel_1.default.update(updates, {
            where: { usertelegramId },
        });
        if (updated) {
            const updatedUser = yield userModel_1.default.findByPk(usertelegramId);
            return updatedUser;
        }
        return null;
    }
    catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
});
exports.updateUser = updateUser;
//Function to get all users by farmedPoints
const getAllUsersSortedByPoints = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all users sorted by totalfarmedPoints in DB in descending order
        const users = yield userModel_1.default.findAll({
            order: [['farmedPoints', 'DESC']],
        });
        return users;
    }
    catch (error) {
        console.error('Error fetching users sorted by points:', error);
        throw new Error('Failed to fetch users sorted by points');
    }
});
exports.getAllUsersSortedByPoints = getAllUsersSortedByPoints;
const updateUserLastLogin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.update({ lastLogin: new Date() }, { where: { usertelegramId: userId } });
});
exports.updateUserLastLogin = updateUserLastLogin;
// Function to start farming points for a user
const startFarmingPoints = (usertelegramId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ where: { usertelegramId } });
        if (!user) {
            throw new Error("User not found");
        }
        // your farming logic here
        // For now, we'll just simulate it with a delay
        // In a real application, you would likely use some background processing
        // library like Bull or agenda to handle this kind of task.
        const farmingDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
        const pointsPerMinute = 10;
        const totalPoints = (farmingDuration / (60 * 1000)) * pointsPerMinute;
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                user.farmedPoints += totalPoints;
                yield user.save();
                console.log(`Farming completed for user ${usertelegramId}. Points earned: ${totalPoints}`);
            }
            catch (error) {
                console.error("Error updating farmed points after farming:", error);
            }
        }), farmingDuration);
    }
    catch (error) {
        console.error("Error starting farming points:", error);
        throw new Error("Failed to start farming points");
    }
});
exports.startFarmingPoints = startFarmingPoints;
// Function to claim points for a user
const claimPoints = (usertelegramId, points) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ where: { usertelegramId } });
        if (!user) {
            throw new Error("User not found");
        }
        user.farmedPoints += points;
        yield user.save();
        return user;
    }
    catch (error) {
        console.error("Error claiming points:", error);
        return null;
    }
});
exports.claimPoints = claimPoints;
