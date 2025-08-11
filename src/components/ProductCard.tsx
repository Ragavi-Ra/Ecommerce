import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppButton from './AppButton'; 

interface ProductCardProps {
  title: string;
  price: number;
  thumbnail: string;
  onAddToCart: () => void;
}

const windowWidth = Dimensions.get('window').width;
const cardMargin = 8;
const cardWidth = (windowWidth - cardMargin * 3) / 2;

const ProductCard: React.FC<ProductCardProps> = ({ title, price, thumbnail, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price} USD</Text>
      </View>
      <AppButton title="Add" onPress={onAddToCart} />
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: cardMargin,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: cardWidth,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: 'green',
  },
});
