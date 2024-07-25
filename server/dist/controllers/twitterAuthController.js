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
exports.followTwitter = void 0;
const twitter_lite_1 = __importDefault(require("twitter-lite"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new twitter_lite_1.default({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const TWITTER_USERNAME = process.env.TWITTER_USERNAME;
// Function to handle Twitter follow action
const followTwitter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telegramUserId } = req.query;
        // Make a request to Twitter API to initiate follow
        const response = yield client.post('friendships/create', {
            screen_name: TWITTER_USERNAME,
            follow: true,
        });
        // Handle Twitter API response
        if (response && response.screen_name === TWITTER_USERNAME) {
            console.log(`User ${telegramUserId} successfully followed Twitter account ${TWITTER_USERNAME}`);
            res.redirect(`/auth/authTwitter?telegramUserId=${telegramUserId}&followed=true`);
        }
        else {
            console.log(`User ${telegramUserId} failed to follow Twitter account ${TWITTER_USERNAME}`);
            res.redirect(`/auth/authTwitter?telegramUserId=${telegramUserId}&followed=false`);
        }
    }
    catch (error) {
        console.error('Error following Twitter account:', error);
        res.redirect(`/auth/authTwitter?telegramUserId=${req.query.telegramUserId}&followed=false`);
    }
});
exports.followTwitter = followTwitter;
