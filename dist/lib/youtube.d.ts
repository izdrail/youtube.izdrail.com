export type UploadResult = {
    videoId: string;
    url: string;
    privacy: 'public' | 'unlisted' | 'private';
};
type MaybeFile = {
    data?: Buffer;
    fileName?: string;
    filename?: string;
    mimeType?: string;
    type?: string;
    path?: string;
} | Buffer | string;
export declare function buildOAuth2Client(auth: any): Promise<import("google-auth-library").OAuth2Client>;
export declare function uploadToYouTube(params: {
    auth: any;
    file: MaybeFile;
    title: string;
    description: string;
    privacyStatus: 'public' | 'unlisted' | 'private';
}): Promise<UploadResult>;
export {};
//# sourceMappingURL=youtube.d.ts.map