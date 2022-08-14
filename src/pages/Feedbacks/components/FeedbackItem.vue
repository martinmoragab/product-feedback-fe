<script lang="ts">
  export default {
    name: 'FeedbackItem',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>
	import type { Feedback } from '../../@types';
	import { useRouter } from 'vue-router';

	const props = defineProps({
		feedback: {
			required: true,
			type: Object as () => Feedback,
		}
	})

	const router = useRouter();

	function goToDetails() {
		router.push({
			name: 'FeedbackDetails',
			params: { id: props.feedback.id }
		})
	}

</script>

<template>
	<el-card class="feedback-card" @click="goToDetails">
		<div class="feedback-content">
			<div class="vote-info">
				<el-button class="vote">{{ feedback.votes }}</el-button>
				<div class="feedback-info">
					<h6>{{ feedback.title }}</h6>
					<p>{{ feedback.details }}</p>
					<el-tag>{{ feedback.category }}</el-tag>
				</div>
			</div>
			<div class="comments">
				<img class="question" src="../../../assets/images/Question.svg"/>
				<p>{{ feedback.commentsCount }}</p>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
	.feedback-content {
		display: flex;
		justify-content: space-between;
		width: 100%;
		.vote-info {
			display: flex;
		}
		.feedback-info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			margin-left: 10px;
			* {
				margin: 0;
			}
		}
		.comments {
			display: flex;
			align-items: center;
			justify-self: flex-end;
			gap: 8px;
			font-weight: bold;
			.question {
				width: 18px;
				height: 16px;
			}
		}
	}
</style>