<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import FeedbackForm from '../CreateFeedback/components/FeedbackForm.vue';

  const router = useRouter();

  function goBack() {
    router.back()
  }

</script>

<template>
	<div class="edit-feedback-page">
    <el-button
			class="back-button"
			link
      @click="goBack"
		>
      <img src="@images/back-arrow.png"/>Go Back
    </el-button>
    <FeedbackForm type="edit" />
  </div>
</template>

<style lang="scss" scoped>
  .edit-feedback-page {
    display: flex;
    flex-direction: column;
    gap: 50px;
    max-width: 540px;
    margin: auto;
  }
</style>