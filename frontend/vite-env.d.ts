/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string; // <-- use your actual variable name
  // add more vars if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
export {};

declare global {
  interface Window {
    _env_: {
      VITE_BASE_URL: string;
      // add more vars here as needed
    };
  }
}
