<script lang="ts" setup>
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import useUserStore from '../stores/UserStore';

  const userStore = useUserStore();
  const router = useRouter();
  const { user } = storeToRefs(userStore);

  async function logOut() {
    await userStore.logout();
    router.push({ name: 'LogIn' });
  }

  const userPic = computed(() => {
    let url;
    if (user.value) {
      const sprites = 'avataaars';
      const seed = user.value?._id;
      url = `https://avatars.dicebear.com/api/${sprites}/${seed}.svg`
    } else url = 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png';
    return url;
	})

</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :src="userPic"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <div class="user-info" v-if="user">
          <h6>{{ user.firstName }} {{ user.lastName }}</h6>
          <p>@{{ user.username }}</p>
          <el-divider />
          <el-button type="danger" @click="logOut">Log out</el-button>
        </div>
        <el-dropdown-item v-if="!user">
          <router-link to="/login">Log in</router-link>
        </el-dropdown-item>
        <el-dropdown-item v-if="!user">
          <router-link to="/signup">Sign up</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" setup>
  a {
    text-decoration: none;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 15px;
    * {
      margin: 0;
    }
    div {
      margin: 0;
    }
  }
</style>