export const uploadConfig = {
  directory: process.env.RENMESHI_UPLOAD_DIR ?? 'data/uploads/recipes',
  maxRequestBytes: 8 * 1024 * 1024,
  maxFileBytes: 6 * 1024 * 1024,
  maxDimension: 4096,
}