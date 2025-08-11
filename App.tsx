// App.tsx
import React, { useEffect } from 'react';
import { CartProvider } from './src/store/CartContext.tsx';
import AppNavigator from './AppNavigator.tsx';
import { requestLocationPermission } from './src/services/LocationPermission.ts';
import { requestNotificationPermission } from './src/services/NotificationPermission';

export default function App() {
  useEffect(() => {
    (async () => {
      const locationGranted = await requestLocationPermission();
      if (!locationGranted) {
        console.warn('Location permission not granted');
      }

      const notificationGranted = await requestNotificationPermission();
      if (!notificationGranted) {
        console.warn('Notification permission not granted');
      }
    })();
  }, []);

  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
