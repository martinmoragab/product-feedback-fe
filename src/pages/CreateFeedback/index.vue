<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import CreateFeedbackForm from './components/CreateFeedbackForm.vue';

  const router = useRouter();

  function goToFeedbacks() {
    router.push({
      name: 'Feedbacks',
    })
  };
</script>

<template>
  <div class="create-feedback-page">
    <el-button
			class="back-button"
			link
			@click="goToFeedbacks"
		>
      <img src="../../assets/images/back-arrow.png"/>Go Back
    </el-button>
    <CreateFeedbackForm />
  </div>
</template>

<style lang="scss" scoped>
  .create-feedback-page {
    display: flex;
    flex-direction: column;
    gap: 50px;
    max-width: 540px;
    margin: auto;
  }
</style>