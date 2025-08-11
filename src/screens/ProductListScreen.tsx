import React, { useEffect, useState, Suspense } from 'react';
import { View, ActivityIndicator, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { fetchProducts } from '../services/api';
import { useCart } from '../store/CartContext';
import { showAddToCartNotification } from '../services/NotificationService';
import AppButton from '../components/AppButton';

const ProductCard = React.lazy(() => import('../components/ProductCard'));

const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          backgroundColor: '#fff',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Image
          source={{ uri: 'http://kambaaincorporation.com/images/kambaa-logo.webp' }}
          style={{ width: 120, height: 40, resizeMode: 'contain' }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{ padding: 6 }}
        >
          <Image
            source={{ uri: 'https://img.icons8.com/ios/50/000000/shopping-cart--v1.png' }}
            style={{ width: 28, height: 28, tintColor: 'black', }}
          />
          {cart.length > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: 'red',
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ padding: 8 }}>
        <AppButton
          title="Choose Subscription"
          onPress={() => navigation.navigate('Subscription')}
          style={{ width: '100%' }}
        />
      </View>

      <Suspense fallback={<ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 8,
            marginBottom: 12,
          }}
          renderItem={({ item }) => (
            <ProductCard
              title={item.title}
              price={item.price}
              thumbnail={item.thumbnail}
              onAddToCart={async () => {
                addToCart({
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  thumbnail: item.thumbnail,
                  quantity: 1,
                  discountPercentage: item.discountPercentage,
                });
                await showAddToCartNotification(item);
              }}
            />
          )}
        />
      </Suspense>
    </>
  );
};

export default ProductListScreen;
