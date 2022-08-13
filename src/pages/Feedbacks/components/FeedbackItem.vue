<script lang="ts">
  export default {
    name: 'FeedbackItem',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>
	import type { Feedback } from './@types';

	const props = defineProps({
		feedback: {
			required: true,
			type: Object as () => Feedback,
		}
	})

</script>

<template>
	<el-card>
		<div class="feedback-content">
			<div class="vote-info">
				<el-button type="primary">112</el-button>
				<div class="feedback-info">
					<h6>{{ feedback.title }}</h6>
					<p>{{ feedback.details }}</p>
					<el-tag>{{ feedback.category }}</el-tag>
				</div>
			</div>
			<div class="comments">
				<p>Q</p>
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
			justify-self: flex-end;
		}
	}
</style>