import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListScreen from './src/screens/ProductListScreen';
import CartScreen from './src/screens/CartScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import MapPickerScreen from './src/screens/MapPickerScreen';

export type RootStackParamList = {
  ProductList: undefined;
  Cart: undefined;
  Subscription: undefined;
  MapPicker: { onLocationSelect: (location: { latitude: number; longitude: number }) => void } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Subscription' }} />
        <Stack.Screen name="MapPicker" component={MapPickerScreen} options={{ title: 'Pick Location' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
