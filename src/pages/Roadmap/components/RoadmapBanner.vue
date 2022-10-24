<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import useProductStore from '../../../stores/ProductStore';

  const router = useRouter();
  const productStore = useProductStore();
  const { product } = storeToRefs(productStore);

  function goBack() {
    router.back();
  }

  function goToAddFeedback() {
    router.push({
			name: 'CreateFeedback',
			params: { id: product.value._id }
		})
  }
</script>

<template>
  <el-card class="banner roadmap">
    <div class="title-and-back">
      <el-button
        class="back-button"
        link
        @click="goBack"
      >
        <img src="@images/back-arrow.png"/>Go Back
      </el-button>
      <h5>Roadmap</h5>
    </div>
    <el-button
      type="primary"
      @click="goToAddFeedback"
    >
      + Add Feedback
    </el-button>
  </el-card>
</template>

<styles lang="scss" scoped>
  .banner {
    .el-card__body {
      flex-direction: row;
      justify-content: space-between !important;
      align-items: center !important;
    }
  }
  .title-and-back {
    text-align: left;
    span, h5 {
      margin: 0;
      color: var(--white) !important;
    }
  }
</styles>