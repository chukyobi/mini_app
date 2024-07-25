"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTwitter = void 0;
const authTwitter = (req, res) => {
    const { telegramUserId, followed } = req.query;
    if (followed === 'true') {
        // Redirect to the welcome page if the user has successfully followed the Twitter account
        res.redirect('/welcome');
    }
    else if (followed === 'false') {
        // Render the Twitter follow page with an error message if the user failed to follow the Twitter account
        res.send(`
            <html>
                <body>
                    <h1>Follow our Twitter account</h1>
                    <p>Please follow our Twitter account to proceed.</p>
                    <p style="color: red;">Failed to follow the Twitter account. Please try again.</p>
                    <form action="/auth/followTwitter" method="get">
                        <input type="hidden" name="telegramUserId" value="${telegramUserId}">
                        <button type="submit">Follow on Twitter</button>
                    </form>
                </body>
            </html>
        `);
    }
    else {
        // Render the initial Twitter follow page if no follow attempt has been made yet
        res.send(`
            <html>
                <body>
                    <h1>Welcome to the Twitter Follow Page</h1>
                    <p>Please follow our Twitter account to proceed.</p>
                    <form action="/auth/followTwitter" method="get">
                        <input type="hidden" name="telegramUserId" value="${telegramUserId}">
                        <button type="submit">Follow on Twitter</button>
                    </form>
                </body>
            </html>
        `);
    }
};
exports.authTwitter = authTwitter;
