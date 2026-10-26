// Vite supplies the deployment prefix, including a GitHub Pages project path.
export const basePath = import.meta.env.BASE_URL;
export const assetPath = (path: string) => `${basePath}${path.replace(/^\//, '')}`;
export const pageHref = (hash = '#') => `${basePath}${hash}`;
