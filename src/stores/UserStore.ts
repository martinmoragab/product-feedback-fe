import { defineStore } from "pinia";
import UserStore from '../services/Registration';

const useUserStore = defineStore('UserStore', {
  state: () => ({
    user: {},
    token: '',
  }),
  persist: true,
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async logIn(email: string, password: string) {
      const { user, token } = await UserStore.logIn(email, password);
      this.user = user;
      this.token = token;
    }
  }
});

export default useUserStore;