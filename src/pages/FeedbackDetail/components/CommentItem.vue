<script lang="ts" setup>
	import { computed } from '@vue/reactivity';
	import { Comment } from '../../../stores/@types';

  const props = defineProps({
    comment: {
      type: Object as () => Comment,
      required: true,
    }
  })

	const fullName = computed(() => {
		const firstName = props.comment.author.firstName;
		const lastName = props.comment.author.lastName;
		return `${firstName} ${lastName}`;
	})

	const authorPic = computed(() => {
		const sprites = 'micah';
		const seed = props.comment.author._id;
		return `https://avatars.dicebear.com/api/${sprites}/${seed}.svg`
	})

</script>

<template>
  <div class="comment">
    <img class="author-picture" :src="authorPic"/>
    <div class="comment-content">
      <h6>{{ fullName }}</h6>
      <p class="username">@{{ comment.author.username }}</p>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .comment {
    display: flex;
    gap: 30px;
    padding: 15px 0;
    border-bottom: 1px solid var(--darkWhite);
    .author-picture {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
			background-color: var(--darkWhite);
    }
    .comment-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
			text-align: left;
			* {
				margin: 0;
			}
      .username {
        margin-bottom: 15px;
      }
    }
  }
</style>