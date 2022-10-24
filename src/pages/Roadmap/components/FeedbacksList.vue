<script lang="ts" setup>
  import { emit } from 'process';
  import { Feedback } from '../../../stores/@types';
  import FeedbackItem from '../../Feedbacks/components/FeedbackItem.vue';

  const props = defineProps({
    status: {
      type: String,
      required: true,
    },
    feedbacks: {
      type: Object as () => Feedback[],
      required: true,
    }
  })

  const emits = defineEmits(['getFeedback']);

  function getFeedback() {
    emits('getFeedback');
  }

</script>

<template>
  <FeedbackItem
    v-for="feedback in feedbacks"
    :feedback="feedback"
    :status="status"
    @get-feedback="getFeedback"
  />
</template>

<style lang="scss" scoped>
</style>