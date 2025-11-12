// Tiny helper to standardize logs later
export const logStep = (msg: string, extra?: unknown) => {
    if (extra !== undefined) {
      console.log(`[YouTube Uploader] ${msg}`, extra);
    } else {
      console.log(`[YouTube Uploader] ${msg}`);
    }
  };
