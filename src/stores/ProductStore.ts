import { defineStore } from "pinia";
import ProductService from '../services/Product';
import { Product, Feedback } from "./@types";

const useProductStore = defineStore('UserStore', {
  state: () => ({
    product: {} as Product,
    feedbacks: [] as Feedback[],
  }),
  persist: true,
  getters: {
    getProduct: (state) => state.product,
    getFeedbacks: (state) => state.product.feedbacks,
  },
  actions: {
    async setProduct() {
      try {
        const response: Product = await ProductService.getProduct();
        this.product = response;
      } catch (e) {
        throw e;
      }
    },
  }
});

export default useProductStore;