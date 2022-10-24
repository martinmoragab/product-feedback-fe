import { defineStore } from "pinia";
import ProductService from '../services/Product';
import { Product, Feedback, Roadmap } from "./@types";

const useProductStore = defineStore('ProductStore', {
  state: () => ({
		products: [] as Product[],
    product: {} as Product,
    feedbacks: [] as Feedback[],
		roadmap: {} as Roadmap,
  }),
  persist: true,
  getters: {
    getProduct: (state) => state.product,
    getFeedbacks: (state) => state.feedbacks,
    getFeedbacksCount: (state) => state.feedbacks.length,
		getRoadmap: (state) => state.roadmap,
  },
  actions: {
    async setProducts() {
      try {
        const response: Product[] = await ProductService.getProducts();
        this.products = response;
				this.product = response[0];
				await this.setFeedbacks([]);
      } catch (e) {
        throw e;
      }
    },
    async selectProduct(productId: string) {
      try {
        const product = await ProductService.getProduct(productId);
        this.product = product;
        await this.setFeedbacks();
      } catch (e) {
        throw e;
      }
    },
		async setFeedbacks(filters: string[] = [], status: string = '', sort: string = 'createdAt_desc') {
			const productId = this.product._id;
			try {
				const response: any = await ProductService.getFeedbacks(productId, filters, status, sort);
				this.feedbacks = response.feedbacks;
				this.roadmap = response.roadmapCounts;
			} catch (e) {
				throw e;
			}
		},
    clearProducts() {
      this.product = {} as Product;
      this.products = [] as Product[];
      this.feedbacks = [] as Feedback[];
      this.roadmap = {} as Roadmap;
    },
  }
});

export default useProductStore;