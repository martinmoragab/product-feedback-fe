<script lang="ts" setup>
  import { ref } from 'vue';
  import ProductService from '../../services/Product';
  import ProductCard from './components/ProductCard.vue';
  import useUserStore from '../../stores/UserStore';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const isLoggedIn = !!userStore.getToken;

  const router = useRouter();

  const products = ref([]);

  async function getProducts() {
    try {
      const response = await ProductService.getProducts();
      products.value = response;
    } catch (e) {
      console.error(e);
    }
  }

  function goToCreateProduct() {
    router.push({
      name: 'CreateProduct',
    });
  }

  getProducts();

</script>

<template>
  <div class="title-and-action">
    <h1>Products</h1>
    <el-tooltip
      v-if="!isLoggedIn"
      class="box-item"
      effect="light"
      content="You must be logged in to create a product"
      placement="top-start"
    >
      <span>
        <el-button
          disabled
          size="large"
          type="primary"
          @click="goToCreateProduct"
        >
          Create product
        </el-button>
      </span>
      </el-tooltip>
    <el-button
      v-else
      size="large"
      type="primary"
      @click="goToCreateProduct"
    >
      Create product
    </el-button>
  </div>
  <p>Select a product to view and create feedbacks.</p>
  <div class="product-cards">
    <ProductCard v-for="product in products" :product="product" />
  </div>
</template>

<style lang="scss" scoped>
  * {
    text-align: left;
  }
  h1 {
    margin: 0;
  }
  p {
    font-size: 16px;
  }
  .title-and-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .product-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    @media screen and (max-width: 650px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>