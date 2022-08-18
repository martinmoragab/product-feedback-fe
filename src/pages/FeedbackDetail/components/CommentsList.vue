<script lang="ts" setup>
  import type { Ref } from 'vue';
  import { ref } from 'vue';
  import { IndividualComment } from '../../@types'
  import CommentItem from './CommentItem.vue';

  const comments: Ref<IndividualComment[]> = ref([
    {
			id: 'asd-123-fgh-456',
      content: 'Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.',
      author: {
        id: 'asdf',
        name: 'Elijah Moss',
        username: '@hexagon',
        profilePicture: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
      },
      date: '2022',
    },
    {
			id: 'jkl-789-asd-123',
      content: 'Second this! I do a lot of night coding and reading.',
      author: {
        id: 'asdf',
        name: 'James Skinner',
        username: '@hummingbird',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      },
      date: '2022',
    },
  ]);
</script>

<template>
  <el-card>
    <ul class="comments-list">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </el-card>
</template>

<style lang="scss" scoped>
  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>