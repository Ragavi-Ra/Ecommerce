import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart, SubscriptionType } from '../store/CartContext';
import SubscriptionCalendar from '../components/SubscriptionCalendar';
import AppButton from '../components/AppButton';

export default function SubscriptionScreen({ navigation }: any) {
    const { setSubscriptionType, selectedDates, setSelectedDates, subscriptionType } = useCart();
    const [localType, setLocalType] = useState<SubscriptionType>(subscriptionType);
    const [userLocation, setUserLocation] = useState({  })

    const applyType = (type: SubscriptionType) => {
        setLocalType(type);
        setSubscriptionType(type);
    };

    const onSubscribe = () => {
        if (selectedDates.length !== 5 && selectedDates.length !== 10) {
            navigation.goBack();
            return;
        }
        navigation.goBack();
    };

    const onGoToMapPicker = () => {
        navigation.navigate('MapPicker', {
            onLocationSelect: (location: { latitude: number; longitude: number }) => {
                setUserLocation(location);
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Subscription</Text>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.card, localType === 'weekend' && styles.cardSelected]} onPress={() => applyType('weekend')}>
                    <Text style={styles.cardTitle}>Weekend</Text>
                    <Text style={styles.cardSub}>Sat, Sun</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, localType === 'weekday' && styles.cardSelected]} onPress={() => applyType('weekday')}>
                    <Text style={styles.cardTitle}>Weekdays</Text>
                    <Text style={styles.cardSub}>Mon–Fri</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, localType === 'random' && styles.cardSelected]} onPress={() => applyType('random')}>
                    <Text style={styles.cardTitle}>Random</Text>
                    <Text style={styles.cardSub}>Choose any days</Text>
                </TouchableOpacity>
            </View>

            <SubscriptionCalendar
                subscriptionType={localType}
                selectedDates={selectedDates}
                onChange={(dates) => setSelectedDates(dates)}
            />

            <View style={{ marginTop: 16 }}>
                <AppButton title="Subscribe" onPress={onSubscribe} />
            </View>
            <View style={{ marginTop: 16 }}>
                <AppButton title="Pick Location on Map" onPress={onGoToMapPicker} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    card: { flex: 1, padding: 12, marginHorizontal: 4, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
    cardSelected: { borderColor: '#3b82f6', backgroundColor: '#eef2ff' },
    cardTitle: { fontWeight: '700' },
    cardSub: { color: '#6b7280' },
});
