import { registerAs } from '@nestjs/config';
import { applicationConfig } from './config';

export default registerAs('app', () => ({
  database: {
    dbUrl: applicationConfig.database.dbUrl,
  },

  // JWT Config
  jwt: {
    jwtSecret: applicationConfig.jwt.jwtSecret,
  },
}));
