import { google, youtube_v3 } from 'googleapis';
import { Readable } from 'stream';

export interface UploadResult {
  videoId: string;
  url: string;
  privacy: 'public' | 'unlisted' | 'private';
}

interface FileObject {
  data?: Buffer;
  fileName?: string;
  filename?: string;
  mimeType?: string;
  type?: string;
  path?: string;
}

type MaybeFile = FileObject | Buffer | string;

interface ReadableFile {
  body: Readable;
  fileName?: string;
  mimeType?: string;
}

interface UploadParams {
  auth: any;
  file: MaybeFile;
  title: string;
  description: string;
  privacyStatus: 'public' | 'unlisted' | 'private';
}

/**
 * Converts various file formats into a Readable stream with metadata.
 * Supports Buffer, file path string, and file objects from automation platforms.
 */
function toReadable(file: MaybeFile): ReadableFile {
  if (!file) {
    throw new Error('No file provided.');
  }

  if (Buffer.isBuffer(file)) {
    return { body: Readable.from(file) };
  }

  if (typeof file === 'string') {
    const fs = require('fs');
    return { body: fs.createReadStream(file) };
  }

  // Handle file objects from automation platforms
  const fileObj = file as FileObject;
  const fileName = fileObj.fileName ?? fileObj.filename;
  const mimeType = fileObj.mimeType ?? fileObj.type;

  if (fileObj.path) {
    const fs = require('fs');
    return {
      body: fs.createReadStream(fileObj.path),
      fileName,
      mimeType
    };
  }

  if (fileObj.data && Buffer.isBuffer(fileObj.data)) {
    return {
      body: Readable.from(fileObj.data),
      fileName,
      mimeType
    };
  }

  throw new Error('Unsupported file format. Provide a Buffer, file path, or file object.');
}

/**
 * Builds an OAuth2 client for Google APIs.
 * Supports authentication from platform connections or environment variables.
 */
export async function buildOAuth2Client(auth: any) {
  const clientId = auth?.client_id ?? process.env.GOOGLE_CLIENT_ID;
  const clientSecret = auth?.client_secret ?? process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = auth?.redirect_url ?? 'https://developers.google.com/oauthplayground';

  if (!clientId || !clientSecret) {
    throw new Error(
        'Missing Google OAuth credentials. Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET ' +
        'environment variables or provide them via platform connection.'
    );
  }

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  oAuth2Client.setCredentials({
    access_token: auth?.access_token,
    refresh_token: auth?.refresh_token,
    expiry_date: auth?.expires_at ? new Date(auth.expires_at).getTime() : null,
  });

  return oAuth2Client;
}

/**
 * Uploads a video file to YouTube with specified metadata and privacy settings.
 * Returns video ID, URL, and privacy status upon successful upload.
 */
export async function uploadToYouTube(params: UploadParams): Promise<UploadResult> {
  const oAuth2Client = await buildOAuth2Client(params.auth);
  const yt = google.youtube({ version: 'v3', auth: oAuth2Client });

  const { body, mimeType } = toReadable(params.file);

  const res = await yt.videos.insert({
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
  });

  const videoId = res.data.id;

  if (!videoId) {
    throw new Error('Upload succeeded but no video ID was returned.');
  }

  return {
    videoId,
    url: `https://youtu.be/${videoId}`,
    privacy: params.privacyStatus,
  };
}