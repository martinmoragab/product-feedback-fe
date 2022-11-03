import { apiClient } from "./AxiosConfig";
import useUserStore from '../stores/UserStore';

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
    } catch (e: any) {
      const userStore = useUserStore();
      const message = e.response.data;
      userStore.toggleErrorMessage(true, message);
      throw e;
    }
  },
  async SignUp(firstName: string, lastName: string, username: string, email: string, password: string) {
    try {
      const response = await apiClient.post('/users/signup', {
        user: {
          firstName,
          lastName,
          username,
          email,
          password,
        }
      });
      const { user, token } = response.data;
      apiClient.defaults.headers
        .common['Authorization'] = `Bearer ${token}`;
      return { user, token };
    } catch(e: any) {
      const userStore = useUserStore();
      const message = e.response.data.message;
      userStore.toggleErrorMessage(true, message);
      throw e;
    }
  }
}