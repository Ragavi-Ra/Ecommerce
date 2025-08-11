import notifee from '@notifee/react-native';

export async function requestNotificationPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= 1) {
    //Notification permission granted
    return true;
  } else {
    //Notification permission denied
    return false;
  }
}
