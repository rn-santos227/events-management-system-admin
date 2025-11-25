
interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_DEV_BASE_URL?: string;
  readonly VITE_GRAPHQL_DEV_ENDPOINT?: string;
  readonly VITE_GRAPHQL_ENDPOINT?: string;
  readonly VITE_WS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}