import { PieceAuth } from '@activepieces/pieces-framework';

export const googleAuth = PieceAuth.OAuth2({
  required: true,
  description: 'Connect to youtube.',
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  scope: [
    'https://www.googleapis.com/auth/youtube.upload'
  ],
});
