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
exports.createEarnedPoints = void 0;
const earnedPointsModel_1 = __importDefault(require("../models/earnedPointsModel"));
// Function to create earned points for a user
const createEarnedPoints = (userPoints) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, earnedFarmPoints = 0, earnedQuestPoints = 0 } = userPoints;
        const earnedPointsData = {
            username: username || '',
            earnedFarmPoints: earnedFarmPoints,
            earnedQuestPoints: earnedQuestPoints,
        };
        const earnedPoints = yield earnedPointsModel_1.default.create(earnedPointsData);
        return earnedPoints;
    }
    catch (error) {
        console.error("Error creating earned points:", error);
        return null;
    }
});
exports.createEarnedPoints = createEarnedPoints;
