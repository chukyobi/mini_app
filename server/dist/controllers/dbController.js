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
exports.getUserData = void 0;
const userModel_1 = require("../models/userModel");
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const userData = yield (0, userModel_1.getUserDataFromDb)(userId);
        if (userData) {
            res.json(userData);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserData = getUserData;
