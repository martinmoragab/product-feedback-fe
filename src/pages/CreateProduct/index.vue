<script lang="ts" setup>
  import NewProductForm from './components/NewProductForm.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function goToProducts() {
    router.push({
      name: 'Products'
    });
  }

</script>

<template>
  <el-button
    class="back-button"
    link
    @click="goToProducts"
  >
    <img src="@images/back-arrow.png"/>Go Back
  </el-button>
  <NewProductForm />
</template>

<style lang="scss" scoped>
.back-button {
  width: 100%;
  display: flex;
  justify-content: start;
  margin: 10px 0;
}
</style>