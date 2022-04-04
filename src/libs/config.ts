const config = {
  port: parseInt(process.env.PORT || '80', 10),
  corsOptions: {
    origin: `http://${process.env.CLIENT_HOST}`,
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET,POST,PUT,DELETE',
  },
  cacheResponse: false,
  mongoose: {
    mongodbConnectionString: `${process.env.MONGO_DB_CONNECTION_STRING}`,
  },
  auth: {
    accessTokenSecret: `${process.env.ACCESS_TOKEN_SECRET}`,
    accessTokenLife: 90000,
    refreshTokenLife: 604800,
    maxRefreshSessionsCount: 3,
  },
  mail: {
    from: 'healthapp@gmail.com',
    user: `${process.env.EMAIL_USER}`,
    password: `${process.env.EMAIL_PASSWORD}`,
  },
  azureBlobStorage: {
    connectionString: `${process.env.AZURE_STORAGE_CONNECTION_STRING}`,
    blobContainerName: `${process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME}`,
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
};

export default config;
