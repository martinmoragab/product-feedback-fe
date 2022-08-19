<script lang="ts" setup>
  import { ref, watch, onBeforeMount } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Feedback } from '../../stores/@types';
	import ProductService from '../../services/Product';
  import FeedbackItem from '../Feedbacks/components/FeedbackItem.vue';
  import CommentsList from './components/CommentsList.vue';
  import AddCommentForm from './components/AddCommentForm.vue';

  const router = useRouter();
	const route = useRoute();

	const feedbackId = route.params.id;
  const feedback: Ref<Feedback> = ref({
		_id: '',
		title: '',
		category: '',
		details: '',
		status: '',
		author: '',
		product: '',
		votes: {},
		comments: [],
	});

  function goToFeedbacks() {
    router.push({
      name: 'Feedbacks'
    })
  }

	async function getFeedbackInformation() {
		try {
			const feedbackItem = await ProductService.getFeedback(feedbackId);
			feedback.value = feedbackItem;
			return feedback;
		} catch (e) {
			console.error(e);
		}
	}
	
	getFeedbackInformation();
</script>

<template>
  <div class="details-page">
    <div class="action-buttons">
      <el-button
				class="back-button"
				@click="goToFeedbacks"
				link
			>
        <img src="@images/back-arrow.png"/>Go Back
      </el-button>
      <el-button
				class="blue"
				type="primary"
				size="large"
			>
				Edit Feedback
			</el-button>
    </div>
    <FeedbackItem :feedback="feedback" @get-feedback="getFeedbackInformation"/>
    <CommentsList />
    <AddCommentForm />
  </div>
</template>

<style lang="scss" scoped>
  .details-page {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 750px;
    margin: auto;
  }
  .action-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>