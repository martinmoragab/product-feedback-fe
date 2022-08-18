<script lang="ts" setup>
  import { IndividualComment } from '../../@types';

  const props = defineProps({
    comment: {
      type: Object as () => IndividualComment,
      required: true,
    }
  })
</script>

<template>
  <div class="comment">
    <img class="author-picture" :src="comment.author.profilePicture"/>
    <div class="comment-content">
      <h6>{{ comment.author.name }}</h6>
      <p class="username">{{ comment.author.username }}</p>
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