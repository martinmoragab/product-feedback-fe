import { apiClient } from "./AxiosConfig";

export default {
  async getProduct() {
    try {
      const response = await apiClient.get('/product');
      return response.data.products[0];
    } catch (e) {
      throw e;
    }
  },
  async createFeedback(params: any) {
    try {
      const response = await apiClient.post('/feedback', {
        feedback: {
          ...params
        }
      });
    } catch (e) {
      throw e;
    }
  }
}