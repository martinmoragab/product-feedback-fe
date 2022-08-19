import { defineStore } from "pinia";
import ProductService from '../services/Product';
import { Product, Feedback } from "./@types";

const useProductStore = defineStore('ProductStore', {
  state: () => ({
		products: [] as Product[],
    product: {} as Product,
    feedbacks: [] as Feedback[],
  }),
  persist: true,
  getters: {
    getProduct: (state) => state.product,
    getFeedbacks: (state) => state.feedbacks,
    getFeedbacksCount: (state) => state.feedbacks.length,
  },
  actions: {
    async setProducts() {
      try {
        const response: Product[] = await ProductService.getProducts();
        this.products = response;
				this.product = response[0];
				await this.setFeedbacks();
      } catch (e) {
        throw e;
      }
    },
		async setFeedbacks() {
			const productId = this.product._id;
			try {
				const response: any = await ProductService.getFeedbacks(productId);
				this.feedbacks = response;
			} catch (e) {
				throw e;
			}
		},
  }
});

export default useProductStore;