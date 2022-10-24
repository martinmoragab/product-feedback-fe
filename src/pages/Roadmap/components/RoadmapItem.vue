<script lang="ts" setup>
  import { Feedback } from '../../../stores/@types';

  const props = defineProps({
    feedback: {
      required: true,
      type: Object as () => Feedback,
    }
  })

</script>

<template>
  <el-card class="roadmap-item planned">
    <div class="status-color">
      <div class="color" :class="feedback.status"></div>
      <p>{{ feedback.status }}</p>
    </div>
    <h6>{{ feedback.title }}</h6>
    <p>{{ feedback.details }}</p>
  </el-card>
</template>

<style lang="scss" scoped>
  .roadmap-item.planned {
    border-top: 5px solid orange;
    * {
      margin: 0;
    }
  }

  .status-color {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    p {
      margin: 0;
      color: var(--lightGray)
    }
    .color {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.Planned {
        background-color: var(--orange);
      }
      &.in_progress {
        background-color: var(--mainPurple);
      }
      &.Live {
        background-color: var(--lightBlue);
      }
    }
  }
</style>