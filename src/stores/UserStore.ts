import { defineStore } from "pinia";
import RegistrationService from '../services/Registration';
import useProductStore from "./ProductStore";
import { User } from "./@types";

const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {} as User,
    token: '',
  }),
  persist: true,
  getters: {
    getUser: (state) => state.user,
		getToken: (state) => state.token,
  },
  actions: {
    async logIn(email: string, password: string) {
      const { user, token } = await RegistrationService.logIn(email, password);
			const productSore = useProductStore();
			await productSore.setProducts();
			this.user = user;
      this.token = token;
    }
  }
});

export default useUserStore;