import {
    Action,
    createAction,
    Property,
  } from '@activepieces/pieces-framework';
  import { uploadToYouTube } from '../lib/youtube';
  
  export const uploadVideo: Action = createAction({
    name: 'upload_video',
    displayName: 'Upload Video to YouTube',
    description: 'Uploads a video file with title, description, and privacy.',
    props: {
      videoFile: Property.File({
        displayName: 'Video file',
        required: true,
        description: 'Select the video file to upload.',
      }),
      title: Property.ShortText({
        displayName: 'Title',
        required: true,
      }),
      description: Property.LongText({
        displayName: 'Description',
        required: true,
      }),
      privacy: Property.StaticDropdown({
        displayName: 'Privacy',
        required: true,
        options: {
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Unlisted', value: 'unlisted' },
            { label: 'Private', value: 'private' },
          ],
        },
        defaultValue: 'unlisted',
      }),
    },
    async run(ctx) {
      const {
        videoFile,
        title,
        description,
        privacy,
      } = ctx.propsValue as {
        videoFile: unknown;
        title: string;
        description: string;
        privacy: 'public'|'unlisted'|'private';
      };
  
      if (!title?.trim()) {
        throw new Error('Title is required.');
      }
      if (!description?.trim()) {
        throw new Error('Description is required.');
      }
      if (!videoFile) {
        throw new Error('Video file is required.');
      }
  
      console.log('[YouTube Uploader] Starting upload…');
  
      try {
        const result = await uploadToYouTube({
          auth: ctx.auth,
          file: videoFile as any,
          title,
          description,
          privacyStatus: privacy,
        });
  
        console.log('[YouTube Uploader] Upload complete', {
          videoId: result.videoId,
          url: result.url,
          privacy: result.privacy,
        });
  
        return result;
      } catch (err: any) {
        // Normalize common YouTube errors for end users
        const msg = err?.message ?? String(err);
        if (msg.includes('quota') || msg.includes('Rate Limit') || msg.includes('rateLimitExceeded')) {
          throw new Error('YouTube quota exceeded. Try later or check your Google Cloud quota.');
        }
        if (msg.includes('Unauthorized') || msg.includes('invalid_grant') || msg.includes('401')) {
          throw new Error('Authentication error. Reconnect your Google/YouTube account and try again.');
        }
        if (msg.includes('Unsupported file') || msg.includes('format')) {
          throw new Error('Unsupported video file. Provide a valid video format and try again.');
        }
        // Fallback
        throw new Error(`YouTube upload failed: ${msg}`);
      }
    },
  });
  