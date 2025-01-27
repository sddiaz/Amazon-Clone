// StoreService.js
const BASE_URL = 'https://dummyjson.com';

export const StoreService = {

  getAllProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=0`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getProductsByCategory: async (category, limit) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}${limit && `?limit=${limit}`}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category products:', error);
      throw error;
    }
  }
};