<script lang="ts">
  export default {
    name: 'FeedbackList',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>
	import { ref } from 'vue';
	import type { Ref } from 'vue';
	import { Feedback } from './@types';
	import FeedbackItem from './FeedbackItem.vue';

	const feedbacks: Ref<Feedback[]> = ref([
	])
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
			<el-button  type="primary" size="large">+ Add Feedback</el-button>
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