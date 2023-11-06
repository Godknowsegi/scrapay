import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  app: {
    environment:
      process.env.APP_ENV === 'production' ? 'production' : process.env.APP_ENV,
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    name: process.env.APP_NAME || 'scrapay-backend',
    url: process.env.APP_URL,
    global_url_prefix: process.env.GLOBAL_URL_PREFIX || 'graphql',
    full_url: `${process.env.APP_URL}`,
  },
  db: {
    default: {
      db_url: process.env.DATABASE_URL,
    },
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: process.env.CORS_HEADERS || '*',
  },

//   jwt: {
//     access: {
//       secret: process.env.JWT_SECRET,
//       signInOptions: {
//         expiresIn: process.env.JWT_ACCEESS_EXPIRES_IN,
//       },
//     },
//     refresh: {
//       secret: process.env.JWT_SECRET,
//       signInOptions: {
//         expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
//       },
//     },
//   },

  auth: {
    id: process.env.ID,
    domain: process.env.DOMAIN,
  },
});
