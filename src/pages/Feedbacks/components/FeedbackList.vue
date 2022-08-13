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
		{
			id: 'asd-123-fgh-456',
			title: 'Add a dark theme option',
			category: 'Feature',
			details: 'It would help people with',
			status: 'Planning',
			author: 'Martin Moraga',
			commentsCount: 2,
		},
		{
			id: 'qwe-123-rty-456',
			title: 'Allow video/image upload',
			category: 'Feature',
			details: 'Images and screencasts can enhance comments on solutions',
			status: 'Planning',
			author: 'Laszlo',
			commentsCount: 2,
		}
	])
</script>

<template>
	<ul>
		<FeedbackItem
			v-for="feedback in feedbacks"
			:key="feedback.id"
			:feedback="feedback"
		/>
	</ul>
</template>

<style lang="scss" scoped>
ul {
	padding: 0;
}
</style>