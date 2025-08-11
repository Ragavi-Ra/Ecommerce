import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useCart } from '../store/CartContext';
import AppButton from '../components/AppButton';

const CartScreen = ({ navigation }: any) => {
    const { cart, removeFromCart, clearCart, calculateTotals, subscriptionType, selectedDates } = useCart();

    const totals = calculateTotals();
    const { basePrice, appliedDiscountPercent, finalPrice, subscriptionDiscountPercent, productDiscountPercent } = totals;

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (
                <Text style={styles.empty}>Your cart is empty</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text>Qty: {item.quantity}</Text>
                                    <Text>
                                        ${item.price.toFixed(2)}{' '}
                                        {item.discountPercentage ? (
                                            <Text style={styles.discount}>({item.discountPercentage}% OFF)</Text>
                                        ) : null}
                                    </Text>
                                </View>
                                <AppButton title="Remove" onPress={() => removeFromCart(item.id)} />
                            </View>
                        )}
                    />

                    <View style={styles.subscriptionRow}>
                        <Text style={{ fontWeight: '600' }}>Subscription:</Text>
                        <AppButton title="Choose Subscription" onPress={() => navigation.navigate('Subscription')} />
                    </View>

                    <View style={styles.pricing}>
                        <Text>Base (after product discounts): ${basePrice.toFixed(2)}</Text>
                        <Text>Product-level max discount: {productDiscountPercent}%</Text>
                        <Text>Subscription discount (5 or 10 days): {subscriptionDiscountPercent}%</Text>
                        <Text style={styles.applied}>Applied Discount: {appliedDiscountPercent}%</Text>
                        <Text style={styles.total}>Final Total: ${finalPrice.toFixed(2)}</Text>
                    </View>

                    <AppButton title="Clear Cart" onPress={clearCart} />
                </>
            )}
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    discount: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    image: { width: 60, height: 60, marginRight: 10 },
    title: { fontWeight: 'bold' },
    total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    pricing: { padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginVertical: 12 },
    applied: { fontWeight: '700', marginTop: 6 },
    subscriptionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
});
