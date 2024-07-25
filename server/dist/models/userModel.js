"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class User extends sequelize_1.Model {
}
User.init({
    usertelegramId: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true, // Make username field unique
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    farmedPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    walletAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    referralLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    completedTasks: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numberofReferrals: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    dateCreated: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    lastLogin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.default,
    modelName: 'User',
    tableName: "users",
    timestamps: false,
});
exports.default = User;
