import React, { useEffect, useState, Suspense } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { fetchProducts } from '../services/api';
import { useCart } from '../store/CartContext';
import { showAddToCartNotification } from '../services/NotificationService';
import AppButton from '../components/AppButton';

const ProductCard = React.lazy(() => import('../components/ProductCard'));

const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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
      <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
        <AppButton title="Subscription" onPress={() => navigation.navigate('Subscription')} style={{ flex: 1, marginRight: 8 }} />
        <AppButton title="Go to Cart" onPress={() => navigation.navigate('Cart')} style={{ flex: 1, marginLeft: 8 }} />
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
