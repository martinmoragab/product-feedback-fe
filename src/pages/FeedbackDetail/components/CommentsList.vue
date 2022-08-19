<script lang="ts" setup>
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import CommentItem from './CommentItem.vue';
	import { Comment } from '../../../stores/@types';
	import { computed } from '@vue/reactivity';

	const props = defineProps({
		comments: {
			required: true,
			type: Object as () => Comment[],
		}
	})

	const commentsCount = computed(() => {
		const count = props.comments.length;
		const word = count === 1 ? 'Comment' : 'Comments';
		return `${count} ${word}`;
	})

</script>

<template>
  <el-card>
    <ul class="comments-list" v-if="comments.length">
			<h6 class="comments-count">{{ commentsCount }}</h6>
      <CommentItem
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
      />
    </ul>
		<div class="no-comments" v-else>
			<img src="@images/inspector.svg" />
			<h6>No comments yet.</h6>
			<p>Add a new comment to start the conversation.</p>
		</div>
  </el-card>
</template>

<style lang="scss" scoped>
  .comments-list, .no-comments {
    display: flex;
    flex-direction: column;
    gap: 10px;
		.comments-count {
			display: flex;
			justify-self: flex-start;
			margin: 10px 0;
		}
  }
	.no-comments {
		width: 100%;
		align-items: center;
		* {
			margin: 0;
		}
	}
</style>