export interface ModelSearchResponse {
  results?: ModelSearchList[],
}

export interface ModelSearchList {
  uid?: string,
  animationCount?: number,
  viewerUrl?: string,
  // publishedAt (string, optional),
  // likeCount (integer, optional),
  // commentCount (integer, optional),
  // user (UserRelated, optional),
  isDownloadable?: boolean,
  name?: string,
  // viewCount (integer, optional),
  thumbnails?: ThumbnailsRelated, 
  // license (string, optional),
  // isPublished (boolean, optional),
  // staffpickedAt (string,null, optional),
  // archives (inline_model_7, optional),
  embedUrl?: string,
}

// UserRelated {
// username (string, optional),
// profileUrl (string, optional),
// account (string, optional),
// displayName (string, optional),
// uid (string, optional),
// uri (string, optional),
// avatar (AvatarRelated, optional)
// }

export interface ThumbnailsRelated {
  images?: Array<inline_model_10>,
}

// inline_model_7 {
// source (ArchiveNested, optional),
// glb (ArchiveNested, optional),
// usdz (ArchiveNested, optional),
// gltf (ArchiveNested, optional)
// }
// AvatarRelated {
// images (Array[inline_model_5], optional),
// uid (string, optional),
// uri (string, optional)
// }

export interface inline_model_10 {
  url?: string,
  width?: number,
  size?: number | undefined,
  uid?: string,
  height?: number
}

// ArchiveNested {
// faceCount (integer, optional),
// textureCount (integer, optional),
// size (integer, optional):
// archive size (in bytes)

// ,
// vertexCount (integer, optional),
// textureMaxResolution (integer, optional)
// }
// inline_model_5 {
// url (string, optional),
// width (integer, optional),
// height (integer, optional),
// size (integer, optional)
// }