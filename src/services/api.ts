import axios from 'axios';
import { getDBConnection, createTable, saveProducts, getProducts } from './database';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  const db = await getDBConnection();
  await createTable(db);

  const cachedProducts = await getProducts(db);
  if (cachedProducts.length > 0) {
  }

  try {
    const response = await axios.get(API_URL);
    const products = response.data.products;

    await saveProducts(db, products);
    //Data fetched from API and cached locally

    return products.length > 0 ? products : cachedProducts;
  } catch (error) {
    //API fetch failed using cached data
    return cachedProducts;
  }
};
