<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Feedback } from '../../stores/@types';
	import ProductService from '../../services/Product';
  import useUserStore from '../../stores/UserStore';
  import FeedbackItem from '../Feedbacks/components/FeedbackItem.vue';
  import CommentsList from './components/CommentsList.vue';
  import AddCommentForm from './components/AddCommentForm.vue';

  const router = useRouter();
	const route = useRoute();

  const userStore = useUserStore();

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

  function goToEditFeedback() {
    router.push({
      name: 'EditFeedback',
    })
  }

	async function getFeedbackInformation() {
		try {
			const feedbackItem = await ProductService.getFeedback(feedbackId);
			feedback.value = feedbackItem;
      console.log('feed', feedback.value)
		} catch (e) {
			console.error(e);
		}
	}

  const canEdit = computed(() => {
    const author = feedback.value.author;
    const loggedUserId = userStore.getUser._id;

    return author === loggedUserId;

  })
	
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
        v-if="canEdit"
				class="blue"
				type="primary"
				size="large"
        @click="goToEditFeedback"
			>
				Edit Feedback
			</el-button>
    </div>
    <FeedbackItem :feedback="feedback" @get-feedback="getFeedbackInformation"/>
    <CommentsList :comments="feedback.comments" />
    <AddCommentForm @get-feedback="getFeedbackInformation" />
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