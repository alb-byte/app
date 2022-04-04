export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_HOST: string;
      PORT: string;
      HOST: string;
      AZURE_STORAGE_CONNECTION_STRING: string;
      AZURE_STORAGE_BLOB_CONTAINER_NAME: string;
      MONGO_DB_CONNECTION_STRING: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
      ACCESS_TOKEN_SECRET: string;
    }
  }
}
