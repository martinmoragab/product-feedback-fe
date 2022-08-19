<script lang="ts" setup>
	import { computed } from '@vue/reactivity';
	import type { Feedback } from '../../../stores/@types';
	import { useRouter } from 'vue-router';

	const props = defineProps({
		feedback: {
			required: true,
			type: Object as () => Feedback,
		}
	})

	const feedbackVotes = computed(() => {
		return Object.keys(props.feedback.votes).length;
	})

	const router = useRouter();

	function goToDetails() {
		router.push({
			name: 'FeedbackDetails',
			params: { id: props.feedback._id }
		})
	}

	function voteForFeedback(event: Event) {
		event.stopPropagation();
		console.log('Increased vote');
	}
</script>

<template>
	<el-card class="feedback-card" @click="goToDetails">
		<div class="feedback-content">
			<div class="vote-info">
				<el-button class="vote" @click="voteForFeedback">{{ feedbackVotes }}</el-button>
				<div class="feedback-info">
					<h6>{{ feedback.title }}</h6>
					<p>{{ feedback.details }}</p>
					<el-tag>{{ feedback.category }}</el-tag>
				</div>
			</div>
			<div class="comments">
				<img class="comment-icon" src="@images/Question.svg"/>
				<p>{{ feedback.comments.length }}</p>
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
			text-align: left;
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
			.comment-icon {
				width: 18px;
				height: 18px;
			}
		}
	}
</style>