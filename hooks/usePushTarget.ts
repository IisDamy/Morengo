import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { databases, tablesDB, appwriteConfig } from '../lib/appwrite';

export function usePushToken(userId: string) {
  useEffect(() => {
    async function register() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') return;

      const { data: token } = await Notifications.getExpoPushTokenAsync();

      await tablesDB.updateRow(
        {
        databaseId:'YOUR_DB_ID', 
        tableId:'users', 
        rowId:userId, 
        data:{
        pushToken: token,
      }});
    }
    register();
  }, [userId]);
}