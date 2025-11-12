import { createPiece } from '@activepieces/pieces-framework';
import { googleAuth } from './auth';
import { uploadVideo } from './actions/upload-video';

export const youtubeUploader = createPiece({
  displayName: 'YouTube Upload',
  description: 'Piece to upload a video to YouTube.',

  // ✅ required by your framework build
  logoUrl: 'https://laravelcompany.com/logo.svg',
  authors: ['Stefan Bogdan'],

  auth: googleAuth,
  actions: [uploadVideo],
  triggers: [],
});

export default youtubeUploader;
