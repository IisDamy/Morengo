import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import { databases } from '../lib/appwrite';

export function useOrderUpdates(orderId: string, initialStatus: string) {
  const [status, setStatus] = useState(initialStatus);

  // Layer 1: push listener — instant update while app is open
  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener((notification) => {
      const data = notification.request.content.data as {
        orderId: string;
        status: string;
      };
      if (data?.orderId === orderId) {
        setStatus(data.status);
      }
    });
    return () => sub.remove();
  }, [orderId]);

  // Layer 2: refetch on foreground — catches missed/dropped pushes
  useEffect(() => {
    const sub = AppState.addEventListener('change', async (nextState) => {
      if (nextState !== 'active') return;
      const order = await databases.getDocument('YOUR_DB_ID', 'orders', orderId);
      setStatus(order.status);
    });
    return () => sub.remove();
  }, [orderId]);

  return status;
}