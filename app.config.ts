// app.config.js
import 'dotenv/config';

// Import your existing app.json content
import appJson from './app.json' assert { type: 'json' };

export default {
  expo: {
    ...appJson.expo,
    extra: {
      // Add your secrets here
      appwriteDatabaseId: process.env.APPWRITE_DATABASE_ID,
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
    },
  },
};