import { createPiece } from '@activepieces/pieces-framework';
import { googleAuth } from './auth';
import { uploadVideo } from './actions/upload-video';

export const youtubeUploader = createPiece({
  displayName: 'YouTube Uploader (Internal)',
  description: 'Internal-only piece to upload a video to YouTube.',

  // ✅ required by your framework build
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg',
  authors: ['You'], // change to your name or org

  auth: googleAuth,
  actions: [uploadVideo],
  triggers: [],
});

export default youtubeUploader;
