"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeUploader = void 0;
const pieces_framework_1 = require("@activepieces/pieces-framework");
const auth_1 = require("./auth");
const upload_video_1 = require("./actions/upload-video");
exports.youtubeUploader = (0, pieces_framework_1.createPiece)({
    displayName: 'YouTube Uploader (Internal)',
    description: 'Internal-only piece to upload a video to YouTube.',
    // ✅ required by your framework build
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg',
    authors: ['You'], // change to your name or org
    auth: auth_1.googleAuth,
    actions: [upload_video_1.uploadVideo],
    triggers: [],
});
exports.default = exports.youtubeUploader;
//# sourceMappingURL=index.js.map