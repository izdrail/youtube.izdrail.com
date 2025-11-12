# YouTube Upload Plugin

A powerful Activepieces plugin that enables seamless video uploads to YouTube through the YouTube Data API.

## Overview

This plugin provides a straightforward way to upload videos to YouTube channels directly from your Activepieces workflows. It handles authentication through Google OAuth and simplifies the YouTube upload process.

## Features

- 🎥 Direct video upload to YouTube
- 🔐 Secure Google OAuth authentication
- 🚀 Simple integration with Activepieces workflows
- ✨ Built with the Activepieces framework

## Prerequisites

Before using this plugin, you need to:

1. **Create a Google Cloud Project**
    - Go to the [Google Cloud Console](https://console.cloud.google.com/)
    - Create a new project or select an existing one

2. **Enable YouTube Data API v3**
    - In your Google Cloud Project, navigate to "APIs & Services" > "Library"
    - Search for "YouTube Data API v3"
    - Click "Enable"

3. **Configure OAuth 2.0 Credentials**
    - Go to "APIs & Services" > "Credentials"
    - Create OAuth 2.0 credentials
    - Add authorized redirect URIs for your Activepieces instance

## Installation

Install the plugin in your Activepieces instance:

```bash
npm install youtube-upload-activepieces
```

Or add it to your `package.json`:

```json
{
  "dependencies": {
    "youtube-upload-activepieces": "^1.0.0"
  }
}
```

## Configuration

### Authentication

The plugin uses Google OAuth for authentication. When adding the plugin to your flow:

1. Click on the authentication field
2. Select "Create New Connection"
3. Follow the Google OAuth flow to authorize access to your YouTube channel
4. The connection will be saved for future use

### Required Scopes

The plugin requires the following YouTube API scopes:
- `https://www.googleapis.com/auth/youtube.upload`
- `https://www.googleapis.com/auth/youtube`

## Usage

### Upload Video Action

The plugin provides an `uploadVideo` action that allows you to upload videos to YouTube.

**Basic Example:**

1. Add the "YouTube Upload" step to your flow
2. Select your authenticated Google connection
3. Configure the video upload parameters:
    - Video file (from previous step or file input)
    - Video title
    - Description
    - Privacy status (public, private, unlisted)
    - Tags
    - Category

**Workflow Example:**

```
Trigger (e.g., New file in Google Drive)
  ↓
YouTube Upload
  - Video File: {{trigger.file}}
  - Title: "My Video"
  - Description: "Uploaded via Activepieces"
  - Privacy: "private"
```

## Actions

### `uploadVideo`

Uploads a video file to YouTube.

**Parameters:**
- Video file (required)
- Title (required)
- Description (optional)
- Privacy status (required)
- Tags (optional)
- Category (optional)

## Development

### Project Structure

```
youtube-upload-activepieces/
├── src/
│   ├── index.ts          # Main plugin definition
│   ├── auth.ts           # Google OAuth configuration
│   └── actions/
│       └── upload-video.ts # Upload video action
├── package.json
├── LICENSE
└── README.md
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Author

**Stefan Bogdan**

## Company

**Laravel Company**  
Website: [https://laravelcompany.com](https://laravelcompany.com)

## Support

For issues, questions, or contributions, please:
- Open an issue in the repository
- Contact the author
- Refer to the [Activepieces documentation](https://www.activepieces.com/docs)

## License

This project is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

Copyright © 2024 Laravel Company

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** — You must give appropriate credit to Laravel Company, provide a link to the license, and indicate if changes were made.

For more details, see the [Creative Commons CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/).

## Credits

- Built with [Activepieces Framework](https://www.activepieces.com/)
- Powered by [YouTube Data API v3](https://developers.google.com/youtube/v3)
- Developed by [Laravel Company](https://laravelcompany.com)

---
