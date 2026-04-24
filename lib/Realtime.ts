import * as Notifications from 'expo-notifications';
import { databases } from './appwrite'; // your Appwrite client
import { client } from './appwrite';



async function registerPushToken(userId: string) {
  const { data: token } = await Notifications.getExpoPushTokenAsync();
  await databases.updateDocument('your-db-id', 'users', userId, {
    pushToken: token,
  });
}




// Cleanup on unmount
