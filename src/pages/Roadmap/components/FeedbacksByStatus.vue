<script lang="ts" setup>
  import { computed } from 'vue';
  import { Feedback } from '../../../stores/@types';
  import FeedbacksList from './FeedbacksList.vue'
  
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

  const emits = defineEmits(['getFeedbacks']);

  const feedbacksCount = computed(() => {
    return props.feedbacks?.length;
  })

  const subtitle = computed(() => {
    switch(props.status) {
      case 'Planned':
        return 'Ideas prioritized for research'
      case 'In Progress':
        return 'Currently being developed'
      case 'Live':
        return 'Release features'
      default:
        return ''
    }
  })

  function getFeedback() {
    emits('getFeedbacks');
  }

</script>

<template>
  <div class="content">
    <h6>{{ status }} ({{ feedbacksCount }})</h6>
    <p>{{ subtitle }}</p>
    <FeedbacksList :status="status" :feedbacks="feedbacks" @get-feedback="getFeedback"/>
  </div>
</template>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    h6 {
      margin: 0;
    }
    h6, p {
      text-align: left;
    }
  }

</style>