import {Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export async function requestLocationPermission() {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        //Location permission granted
        return true;
      case RESULTS.BLOCKED:
        //Permission blocked, opening settings
        openSettings();
        return false;
      default:
        //Permission denied
        return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
