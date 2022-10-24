<script lang="ts" setup>
  import { watch } from 'vue';
  import type { Ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';
	import useProductStore from '../../../stores/ProductStore';
	import FeedbackItem from './FeedbackItem.vue';

  const props = defineProps({
    sortingOption: {
      type: Object as () => Ref<string>,
      default: '',
    }
  })

	const router = useRouter();
	const productStore = useProductStore();
  const productId = productStore.getProduct._id;

	const { feedbacks } = storeToRefs(productStore);

  function updateFeedbacks() {
    let sortingOption = '';
    switch (props.sortingOption.value) {
      case 'Latest':
        sortingOption = 'createdAt_desc'
        break
      case 'Most comments':
        sortingOption = 'commentsLength_desc'
        break
      case 'Least comments':
        sortingOption = 'commentsLength_asc'
        break
      case 'Most upvotes':
        sortingOption = 'votes_desc'
        break
      case 'Least upvotes':
        sortingOption = 'votes_asc'
        break
    };
    productStore.setFeedbacks([], '', sortingOption);
  }

	function goToCreateFeedback() {
		router.push({
			name: 'CreateFeedback',
			params: { id: productId }
		})
	}

  watch(() => props.sortingOption, updateFeedbacks, { deep: true });

</script>

<template>
	<ul v-if="feedbacks.length > 0">
		<FeedbackItem
			v-for="feedback in feedbacks"
			:key="feedback._id"
			:feedback="feedback"
		/>
	</ul>
	<el-card v-else>
		<div class="no-content">
			<img src="@images/inspector.svg"/>
			<h6>There are no feedbacks yet.</h6>
			<p>Got a suggestion? Found a bug that needs to be squashed?</p>
			<p>We love hearing about new ideas to improve our app.</p>
			<el-button 
				type="primary"
				size="large"
				@click="goToCreateFeedback"
			>
				+ Add Feedback
			</el-button>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
ul {
	padding: 0;
}

.no-content {
	padding: 50px 0;
	width: 100%;
	h6 {
		margin: 50px auto 15px auto;
	}
	p {
		margin: 0;
	}
	button {
		margin-top: 50px;
	}
}
</style>