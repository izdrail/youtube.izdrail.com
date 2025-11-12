"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logStep = void 0;
// Tiny helper to standardize logs later
const logStep = (msg, extra) => {
    // In Activepieces, returning data is enough; console logs also appear in run details
    if (extra !== undefined) {
        console.log(`[YouTube Uploader] ${msg}`, extra);
    }
    else {
        console.log(`[YouTube Uploader] ${msg}`);
    }
};
exports.logStep = logStep;
//# sourceMappingURL=logging.js.map