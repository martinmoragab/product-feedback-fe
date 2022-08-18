import { apiClient } from "./AxiosConfig";

export default {
  async logIn(email: string, password: string) {
    try {
      const response = await apiClient.post('/users/login', {
        credentials: {
          email,
          password,
        }
      });
      const { user, token } = response.data;
      apiClient.defaults.headers
        .common['Authorization'] = `Bearer ${token}`;
      return { user, token };
    } catch (e) {
      throw e;
    }
  }
}