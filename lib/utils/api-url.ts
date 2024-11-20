export function getApiUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, use the NEXT_PUBLIC_API_URL environment variable
  // In development, use the local server URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  return `${baseUrl}/${cleanPath}`;
}