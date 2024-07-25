"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    else {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
exports.ensureAuthenticated = ensureAuthenticated;
