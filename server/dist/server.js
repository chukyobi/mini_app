"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userAuthRoutes_1 = __importDefault(require("./routes/userAuthRoutes"));
const twitterAuthRoute_1 = __importDefault(require("./routes/twitterAuthRoute"));
const dashboardRoute_1 = __importDefault(require("./routes/dashboardRoute"));
const userWelcomeRoute_1 = __importDefault(require("./routes/userWelcomeRoute"));
const updateUsernameRoute_1 = __importDefault(require("./routes/updateUsernameRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
}));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));
// Routes
app.use("/auth", userAuthRoutes_1.default);
app.use("/auth", twitterAuthRoute_1.default);
app.use("/welcome", userWelcomeRoute_1.default);
app.use("/dashboard", dashboardRoute_1.default);
app.use('/updateUser', updateUsernameRoute_1.default);
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'src', 'assets')));
app.get("/", (req, res) => {
    res.redirect("/auth/authUser");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
