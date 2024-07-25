"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import bodyParser from 'body-parser';
const dotenv_1 = __importDefault(require("dotenv"));
const userAuthRoutes_1 = __importDefault(require("./routes/userAuthRoutes"));
const twitterAuthRoute_1 = __importDefault(require("./routes/twitterAuthRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/auth', userAuthRoutes_1.default); // Mount user routes under /auth path
app.use('/auth', twitterAuthRoute_1.default); // Mount twitter routes under /auth path
app.get('/', (req, res) => {
    res.redirect('/auth/authUser');
});
//welcome page
app.get('/welcome', (req, res) => {
    res.send('<h1>Welcome!</h1><p>You have successfully followed our Twitter account.</p>');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
