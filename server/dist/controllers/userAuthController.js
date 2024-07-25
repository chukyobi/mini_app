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
exports.authTwitter = exports.authUser = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const aes_1 = __importDefault(require("crypto-js/aes"));
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const userServices_1 = require("../services/userServices");
dotenv_1.default.config();
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN_TELEGRAM;
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
if (!ENCRYPTION_SECRET) {
    console.error("Encryption secret is not defined.");
    process.exit(1);
}
/** This does the first authentication using telegram, and checks if the user exists or not and does the neccesary action */
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
        const response = yield axios_1.default.get(telegramApiUrl);
        if (response.data.ok) {
            const telegramUserId = response.data.result.id;
            const existingUser = yield (0, userServices_1.getUserDataFromDb)(telegramUserId.toString()); // Check if the user already exists in the database
            if (existingUser) {
                req.session.userId = telegramUserId; // Set session for the user
                console.log(`User ${telegramUserId} already exists.`);
                res.json({ status: "existing_user", userId: req.session.userId });
            }
            else {
                const encryptedUserId = aes_1.default.encrypt(telegramUserId.toString(), ENCRYPTION_SECRET).toString(); // Encrypting telegramUserId
                console.log(`Telegram user ID: ${telegramUserId}`);
                console.log(`Redirecting to /auth/authTwitter with token`);
                res.json({
                    status: "new_user",
                    token: encodeURIComponent(encryptedUserId),
                });
            }
        }
        else {
            res.status(500).json({ error: "Failed to fetch Telegram user info" });
        }
    }
    catch (error) {
        console.error("Error authenticating user via Telegram:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.authUser = authUser;
/** This takes care of when a new user succefully follows the twitter account.
 *  It creates the user and a session as well */
const authTwitter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, followed } = req.query;
    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }
    try {
        const decryptedUserId = aes_1.default.decrypt(token.toString(), ENCRYPTION_SECRET).toString(enc_utf8_1.default);
        if (!decryptedUserId) {
            return res.status(400).json({ error: "Invalid token" });
        }
        const followedInt = followed === "true" ? 10 : 0;
        const telegramUserId = decryptedUserId;
        if (followed === "true") {
            const userData = {
                usertelegramId: telegramUserId,
                firstname: null,
                username: null,
                farmedPoints: followedInt,
                walletAddress: null,
                profileImage: "/assets/default.jpg",
                referralLink: `https://t.me/jchukwudi_bot?start=${telegramUserId}`,
                completedTasks: null,
                numberofReferrals: null,
                dateCreated: new Date(),
                lastLogin: undefined,
            };
            try {
                // Create a new user
                const newUser = yield (0, userServices_1.createUser)(userData);
                if (!newUser) {
                    throw new Error("User creation failed");
                }
                req.session.userId = telegramUserId; // Set session for the user
                res.json({ status: "new_user", userId: telegramUserId });
                console.log(`New user created with Telegram user ID: ${telegramUserId}`);
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
        else if (followed === "false") {
            res.redirect(`/auth/authTwitter?token=${encodeURIComponent(token)}&error=follow`);
        }
        else {
            res.status(400).json({ error: "Invalid followed parameter" });
        }
    }
    catch (error) {
        console.error("Error decrypting token or handling Twitter follow:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.authTwitter = authTwitter;
