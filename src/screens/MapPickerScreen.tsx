import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../services/LocationPermission';

type MapPickerScreenProps = {
  navigation: any;
  route: {
    params?: {
      onLocationSelect: (location: { latitude: number; longitude: number }) => void;
    };
  };
};

export default function MapPickerScreen({ navigation, route }: MapPickerScreenProps) {
  const initialLatitude = 11.023868721033416;
  const initialLongitude = 77.00440862883563;

  const [region, setRegion] = useState<Region>({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        setMarkerPosition({ latitude, longitude });
      },
      () => Alert.alert('Error', 'Could not get current location'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    (async () => {
      const granted = await requestLocationPermission();
      if (granted) {
        getCurrentLocation();
      } else {
        Alert.alert('Permission Denied', 'Location permission is needed to pick location');
      }
    })();
  }, [getCurrentLocation]);

//   const onConfirm = () => {
//     route.params?.onLocationSelect?.(markerPosition);
//     navigation.goBack();
//   };
const onConfirm = () => {
  const { latitude, longitude } = markerPosition;
  Alert.alert(
    'Selected Location',
    `Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}`,
    [
      {
        text: 'OK',
        onPress: () => {
          route.params?.onLocationSelect?.(markerPosition);
          navigation.goBack();
        },
      },
    ]
  );
};

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    setRegion((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        onPress={handleMapPress}
      >
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Confirm Location" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
});
