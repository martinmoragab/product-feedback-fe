import { defineStore } from "pinia";
import RegistrationService from '../services/Registration';
import useProductStore from "./ProductStore";
import { User, RenderError } from "./@types";

const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: null as User | null,
    token: '',
    renderErrorMessage: {
      render: false,
      message: '',
    } as RenderError,
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
    },
    async signUp(firstName: string, lastName: string, username: string, email: string, password: string) {
      const { user, token } = await RegistrationService.SignUp(firstName, lastName, username, email, password);
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = '';
      const productStore = useProductStore();
      
    },
    toggleErrorMessage(render: boolean, message: string) {
      this.renderErrorMessage = {
        render,
        message
      }
    },
  }
});

export default useUserStore;