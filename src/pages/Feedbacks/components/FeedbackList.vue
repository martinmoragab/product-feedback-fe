<script lang="ts" setup>
	import { ref } from 'vue';
	import type { Ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { Feedback } from '../../@types';
	import FeedbackItem from './FeedbackItem.vue';

	const router = useRouter();

	const feedbacks: Ref<Feedback[]> = ref([
		{
      id: 'asd-123-fgh-456',
      title: 'Add a dark theme option',
      category: 'Feature',
      details: 'It would help people with',
      status: 'Planning',
      author: 'Martin Moraga',
      commentsCount: 2,
      votes: 20,
    },
    {
      id: 'qwe-123-rty-456',
      title: 'Allow video/image upload',
      category: 'Feature',
      details: 'Images and screencasts can enhance comments on solutions',
      status: 'Planning',
      author: 'Laszlo',
      commentsCount: 2,
      votes: 120,
    },
    {
      id: 'qwe-123-rty-456',
      title: 'Q&A within challenge hubs',
      category: 'Enhancement',
      details: 'Challenge specific Q&A would make for easy reference.',
      status: 'Planning',
      author: 'Author',
      commentsCount: 10,
      votes: 32,
    },
	])

	function goToCreateFeedback() {
		router.push({
			name: 'CreateFeedback',
			params: { id: 'asd' }
		})
	}
</script>

<template>
	<ul v-if="feedbacks.length > 0">
		<FeedbackItem
			v-for="feedback in feedbacks"
			:key="feedback.id"
			:feedback="feedback"
		/>
	</ul>
	<el-card v-else>
		<div class="no-content">
			<img src="../../../assets/images/inspector.svg"/>
			<h6>There is no feedback yet.</h6>
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