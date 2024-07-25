"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryUserId = void 0;
const validator_1 = __importDefault(require("validator"));
/**
 * Validates if a string is a valid numeric userId
 * @param userId - The userId to validate
 * @returns true if valid, false otherwise
 */
const validateQueryUserId = (userId) => {
    return validator_1.default.isNumeric(userId);
};
exports.validateQueryUserId = validateQueryUserId;
