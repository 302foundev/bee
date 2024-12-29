export { }

declare global {
  interface ImportMeta {
    env: {
      VITE_BACKEND_URL: string;
      VITE_FRONTEND_URL: string;
    };
  }
}

// vite.config.ts
export const BACKEND_URL = 'bee-api-backend.vercel.app';
// export const FRONTEND_URL = 'https://beeslug.vercel.app';

// Local development
// export const BACKEND_URL = 'http://localhost:5000';
export const FRONTEND_URL = 'http://localhost:5173';
