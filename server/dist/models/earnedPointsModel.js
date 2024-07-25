"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const userModel_1 = __importDefault(require("./userModel"));
class EarnedPoints extends sequelize_1.Model {
}
EarnedPoints.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'username', // This references the username field in the User model
        },
    },
    earnedFarmPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    earnedQuestPoints: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'EarnedPoints',
    tableName: "earnedPoints",
    timestamps: false,
});
// Define the association between User and EarnedPoints
userModel_1.default.hasMany(EarnedPoints, {
    foreignKey: 'username',
});
EarnedPoints.belongsTo(userModel_1.default, {
    foreignKey: 'username',
});
exports.default = EarnedPoints;
