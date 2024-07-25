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
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8")); // Required for converting strings to UTF-8
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN_TELEGRAM;
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
// MySQL Database Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
// Create a MySQL connection pool
const pool = mysql2_1.default.createPool(dbConfig).promise();
if (!ENCRYPTION_SECRET) {
    console.error('Encryption secret is not defined.');
    process.exit(1); // Optionally exit the process or handle the error
}
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
        const response = yield axios_1.default.get(telegramApiUrl);
        if (response.data.ok) {
            const telegramUserId = response.data.result.id; // Extracting Telegram user ID
            // Encrypting telegramUserId
            const encryptedUserId = aes_1.default.encrypt(telegramUserId.toString(), ENCRYPTION_SECRET).toString();
            console.log(`Telegram user ID: ${telegramUserId}`); // Log the user ID
            console.log(`Redirecting to /auth/authTwitter?token=${encodeURIComponent(encryptedUserId)}`);
            res.redirect(`/auth/authTwitter?token=${encodeURIComponent(encryptedUserId)}`);
        }
        else {
            res.status(500).json({ error: 'Failed to fetch Telegram user info' });
        }
    }
    catch (error) {
        console.error('Error authenticating user via Telegram:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.authUser = authUser;
const authTwitter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, followed } = req.query;
    if (!token) {
        // Handle error: token not provided
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        // Decrypt token to get telegramUserId
        const decryptedUserId = aes_1.default.decrypt(token.toString(), ENCRYPTION_SECRET).toString(enc_utf8_1.default);
        // Check if decryptedUserId is valid
        if (!decryptedUserId) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        // Convert followed to integer if it's true
        const followedInt = followed === 'true' ? 10 : 0;
        // decrypt decryptedUserId
        const telegramUserId = decryptedUserId;
        if (followed === 'true') {
            // Create a new user in MySQL database
            yield createUser(telegramUserId, followedInt);
            res.redirect(`/dashboard/:${telegramUserId}`);
        }
        else if (followed === 'false') {
            // Throw an error if followed is explicitly false
            throw new Error('Error in following Twitter account');
        }
        else {
            // Render the Twitter follow page without an error message if followed is not provided
            res.send(`
        <html>
          <body>
            <h1>Follow our Twitter account</h1>
            <p>Please follow our Twitter account to proceed.</p>
            <form action="/auth/followTwitter" method="get">
              <input type="hidden" name="token" value="${token}">
              <button type="submit">Follow on Twitter</button>
            </form>
          </body>
        </html>
      `);
        }
    }
    catch (error) {
        console.error('Error decrypting token or following Twitter:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.authTwitter = authTwitter;
// Function to create a new user in MySQL database
function createUser(telegramUserId, farmedPoints) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield pool.getConnection();
            yield connection.execute('INSERT INTO users (telegram_user_id, value) VALUES (?, ?)', [telegramUserId, farmedPoints]);
            connection.release();
            console.log(`User created with Telegram user ID: ${telegramUserId} and value: ${farmedPoints}`);
        }
        catch (error) {
            console.error('Error creating user in database:', error);
            throw new Error('Internal server error');
        }
    });
}
