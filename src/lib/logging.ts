// Tiny helper to standardize logs later
export const logStep = (msg: string, extra?: unknown) => {
    // In Activepieces, returning data is enough; console logs also appear in run details
    if (extra !== undefined) {
      console.log(`[YouTube Uploader] ${msg}`, extra);
    } else {
      console.log(`[YouTube Uploader] ${msg}`);
    }
  };
  