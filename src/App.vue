<script setup lang="ts">
  import useUserStore from './stores/UserStore';
  import { storeToRefs } from 'pinia';
  import UserAvatar from './components/UserAvatar.vue';

  const userStore = useUserStore();
  const { renderErrorMessage } = storeToRefs(userStore);

  function clearErrorMessage() {
    userStore.toggleErrorMessage(false, '');
  }

</script>

<template>
  <el-alert
    v-if="renderErrorMessage.render"
    type="error"
    @close="clearErrorMessage"
  >
    {{ renderErrorMessage.message }}
  </el-alert>
  <div class="user-options">
    <UserAvatar />
  </div>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.user-options {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
