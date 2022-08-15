<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Feedback } from '../@types';
  import FeedbackItem from '../Feedbacks/components/FeedbackItem.vue';
  import CommentsList from './components/CommentsList.vue';
  import AddCommentForm from './components/AddCommentForm.vue';

  const route = useRoute();
  const router = useRouter();

  const feedbackId = route.params.id;
  const feedback: Ref<Feedback> = ref({
    id: 'asd-123-fgh-456',
    title: 'Add a dark theme option',
    category: 'Feature',
    details: 'It would help people with',
    status: 'Planning',
    author: 'Martin Moraga',
    commentsCount: 2,
    votes: 20,
  });

  function goToFeedbacks() {
    router.push({
      name: 'Feedbacks'
    })
  }

</script>

<template>
  <div class="details-page">
    <div class="header">
      <el-button class="back-button" link @click="goToFeedbacks">
        <img src="../../assets/images/back-arrow.png"/>Go Back
      </el-button>
      <el-button type="primary" class="blue" size="large">Edit Feedback</el-button>
    </div>
    <FeedbackItem :feedback="feedback"/>
    <CommentsList />
    <AddCommentForm />
  </div>
</template>

<style lang="scss" scoped>
  .details-page {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 750px;
    margin: auto;
  }
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    img {
      margin-right: 15px;
    }
  }
</style>