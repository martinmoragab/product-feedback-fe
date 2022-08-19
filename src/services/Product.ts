import { apiClient } from "./AxiosConfig";
import { FeedbackParams } from "../pages/@types";
import useUserStore from "../stores/UserStore";

const setAuthorization = () => {
	const userStore = useUserStore();
	const token = userStore.getToken;
	// Set authorization token to axios instance
	apiClient.defaults.headers
    .common['Authorization'] = `Bearer ${token}`;
}

export default {
	async getProducts() {
    try {
      const response = await apiClient.get('/product');
      return response.data.products;
    } catch (e) {
      throw e;
    }
  },
	async getFeedbacks(productId: string) {
		try {
			const response = await apiClient.get(`/feedback/all/${productId}`)
			return response.data.feedbacks;
		} catch (e) {
			throw e;
		}
	},
	async getFeedback(feedbackId: string | string[]) {
		try {
			const response = await apiClient.get(`/feedback/${feedbackId}`);
			return response.data.feedback;
		} catch (e) {
			throw e;
		}
	},
  async createFeedback(params: FeedbackParams) {
		setAuthorization();
    try {
      const response = await apiClient.post('/feedback', {
        feedback: {
          ...params
        }
      });
    } catch (e) {
      throw e;
    }
  },
	async voteForFeedback(feedbackId: string) {
		setAuthorization();
    try {
      await apiClient.patch(`/feedback/${feedbackId}/vote`)
    } catch (e) {
      throw e;
    }
	}
}