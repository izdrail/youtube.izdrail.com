"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = void 0;
const pieces_framework_1 = require("@activepieces/pieces-framework");
exports.googleAuth = pieces_framework_1.PieceAuth.OAuth2({
    required: true,
    description: 'Connect your Google account that owns the target YouTube channel.',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: [
        'https://www.googleapis.com/auth/youtube.upload'
    ],
});
//# sourceMappingURL=auth.js.map