import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../services/LocationPermission';

const OSM_RASTER_STYLE = {
    version: 8,
    sources: {
        osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors"
        }
    },
    layers: [{ id: "osm", type: "raster", source: "osm" }]
};

export default function MapPickerScreen({ navigation, route }: any) {
    const [location, setLocation] = useState<[number, number]>([77.5946, 12.9716]);
    const [marker, setMarker] = useState<[number, number] | null>(null);

    const setCurrentLocation = useCallback(async () => {
        const granted = await requestLocationPermission();
        if (!granted) return Alert.alert("Permission denied", "Location access is needed to select your location.");

        Geolocation.getCurrentPosition(
            pos => {
                const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
                setLocation(coords);
                setMarker(coords);
            },
            err => Alert.alert("Error", "Unable to get location: " + err.message),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => { setCurrentLocation(); }, [setCurrentLocation]);

    const onMapPress = (e: any) => {
        const coords: [number, number] = e.geometry.coordinates;
        setMarker(coords);
    };

    const confirm = () => {
        if (!marker) return Alert.alert("Select a location first");

        const selectedLat = marker[1];
        const selectedLng = marker[0];

        Alert.alert(
            "Location Selected",
            `Latitude: ${selectedLat.toFixed(6)}\nLongitude: ${selectedLng.toFixed(6)}`
        );

        route.params?.onLocationSelect({ latitude: selectedLat, longitude: selectedLng });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MapLibreGL.MapView style={styles.map} mapStyle={OSM_RASTER_STYLE} onPress={onMapPress}>
                <MapLibreGL.Camera zoomLevel={14} centerCoordinate={marker || location} />
                {marker && <MapLibreGL.PointAnnotation id="picked" coordinate={marker}><View style={styles.marker} /></MapLibreGL.PointAnnotation>}
            </MapLibreGL.MapView>
            <View style={styles.buttons}>
                <Button title="Use My Location" onPress={setCurrentLocation} />
                <Button title="Confirm" onPress={confirm} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    marker: {
        height: 20, width: 20, borderRadius: 10,
        backgroundColor: "red", borderColor: "#fff", borderWidth: 2,
    },
    buttons: {
        position: "absolute", bottom: 20, left: 20, right: 20,
        flexDirection: "row", justifyContent: "space-between"
    }
});
