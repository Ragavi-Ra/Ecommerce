// src/services/NotificationPermission.ts
import notifee from '@notifee/react-native';

export async function requestNotificationPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= 1) {
    console.log('Notification permission granted');
    return true;
  } else {
    console.warn('Notification permission denied');
    return false;
  }
}
