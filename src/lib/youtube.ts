import { google, youtube_v3 } from 'googleapis';
import { Readable } from 'stream';

export type UploadResult = {
  videoId: string;
  url: string;
  privacy: 'public'|'unlisted'|'private';
};

type MaybeFile =
  | { data?: Buffer; fileName?: string; filename?: string; mimeType?: string; type?: string; path?: string; }
  | Buffer
  | string; // fallback

// Convert various “file” shapes from pieces into a Readable stream + meta
function toReadable(file: MaybeFile): { body: Readable; fileName?: string; mimeType?: string } {
  if (!file) throw new Error('No file received.');

  // Buffer directly
  if (Buffer.isBuffer(file)) {
    return { body: Readable.from(file) };
  }

  // If it’s a path string
  if (typeof file === 'string') {
    // Treat as a path
    // Lazy require to avoid fs in web contexts
    const fs = require('fs');
    return { body: fs.createReadStream(file) };
  }

  // Object shapes used by automation platforms
  const f: any = file;
  const fileName = f.fileName ?? f.filename;
  const mimeType = f.mimeType ?? f.type;

  if (f.path) {
    const fs = require('fs');
    return { body: fs.createReadStream(f.path), fileName, mimeType };
  }
  if (f.data && Buffer.isBuffer(f.data)) {
    return { body: Readable.from(f.data), fileName, mimeType };
  }

  throw new Error('Unsupported file format. Provide a file Buffer or a path.');
}

export async function buildOAuth2Client(auth: any) {
  // Activepieces typically provides tokens on ctx.auth. Client ID/secret
  // can be provided by the platform; if not, fall back to env.
  const clientId = auth?.client_id ?? process.env.GOOGLE_CLIENT_ID;
  const clientSecret = auth?.client_secret ?? process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = auth?.redirect_url ?? 'https://developers.google.com/oauthplayground'; // not used at runtime

  if (!clientId || !clientSecret) {
    throw new Error('Missing Google OAuth client. Configure GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET or platform connection data.');
  }

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  oAuth2Client.setCredentials({
    access_token: auth?.access_token,
    refresh_token: auth?.refresh_token,
    // use null if we don’t have an expiry timestamp
    expiry_date: auth?.expires_at ? new Date(auth.expires_at).getTime() : null,
  });


  return oAuth2Client;
}

export async function uploadToYouTube(params: {
  auth: any;
  file: MaybeFile;
  title: string;
  description: string;
  privacyStatus: 'public'|'unlisted'|'private';
}): Promise<UploadResult> {
  const oAuth2Client = await buildOAuth2Client(params.auth);
  const yt = google.youtube({ version: 'v3', auth: oAuth2Client });

  const { body, fileName, mimeType } = toReadable(params.file);

  // Perform resumable upload
  const res = await (yt.videos.insert as any)({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: params.title,
        description: params.description,
      },
      status: {
        privacyStatus: params.privacyStatus,
      },
    } as youtube_v3.Schema$Video,
    media: {
      mimeType: mimeType ?? 'video/*',
      body,
    },
    uploadType: 'resumable',
  });

  const video: youtube_v3.Schema$Video = res?.data;
  const videoId = video?.id;

  if (!videoId) {
    throw new Error('Upload completed but no videoId returned.');
  }

  return {
    videoId,
    url: `https://youtu.be/${videoId}`,
    privacy: params.privacyStatus,
  };
}
