<script lang="ts" setup>
  import { ref, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import RoadmapBanner from './components/RoadmapBanner.vue'
  import FeedbacksByStatus from './components/FeedbacksByStatus.vue';
	import ProductService from '../../services/Product';
  import useProductStore from '../../stores/ProductStore';

  const route = useRoute();
  const productId = route.params.id as string;

  const productStore = useProductStore();
  productStore.selectProduct(productId);

  const isLoading = ref(true);

  const plannedFeedbacks = ref([]);
  const inProgressFeedbacks = ref([]);
  const liveFeedbacks = ref([]);

  const activeTab = ref('planned')
  const viewportWidth = ref(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));
  
  async function getPlannedFeedbacks() {
    isLoading.value = true;
    try {
      plannedFeedbacks.value = await (await ProductService.getFeedbacks(productId, [], 'Planned')).feedbacks;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function getInProgressFeedbacks() {
    isLoading.value = true;
    try {
      inProgressFeedbacks.value = await (await ProductService.getFeedbacks(productId, [], 'In Progress')).feedbacks;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function getLiveFeedbacks() {
    isLoading.value = true;
    try {
      liveFeedbacks.value = await (await ProductService.getFeedbacks(productId, [], 'Live')).feedbacks;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function getFeedbacksByStatus() {
    isLoading.value = true;
    try {
      await getPlannedFeedbacks();
      await getInProgressFeedbacks();
      await getLiveFeedbacks();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  function setViewportWidth(event: Event) {
    const width = window.innerWidth;
    viewportWidth.value = width;
  }

  window.addEventListener('resize', setViewportWidth);

  onUnmounted(() => {
    window.removeEventListener('resize', setViewportWidth);
  })

  getFeedbacksByStatus();

</script>

<template>
  <RoadmapBanner />
  <el-tabs
    v-if="viewportWidth <= 880"
    v-model="activeTab"
    type="card" 
    class="demo-tabs"
  >
    <el-tab-pane :label="`Planned (${plannedFeedbacks.length})`" name="planned">
      <FeedbacksByStatus
        status="Planned"
        :feedbacks="plannedFeedbacks"
        @get-feedbacks="getPlannedFeedbacks"
      />
    </el-tab-pane>
    <el-tab-pane :label="`In Progress (${inProgressFeedbacks.length})`" name="inProgress">
      <FeedbacksByStatus
        status="In Progress"
        :feedbacks="inProgressFeedbacks"
        @get-feedbacks="getInProgressFeedbacks"
      />
    </el-tab-pane>
    <el-tab-pane :label="`Live (${liveFeedbacks.length})`" name="live">
      <FeedbacksByStatus
        status="Live"
        :feedbacks="liveFeedbacks"
        @get-feedbacks="getLiveFeedbacks"
      />
    </el-tab-pane>
  </el-tabs>
  <div v-else class="feedbacks-list">
    <FeedbacksByStatus
      status="Planned"
      :feedbacks="plannedFeedbacks"
      @get-feedbacks="getPlannedFeedbacks"
    />
    <FeedbacksByStatus
      status="In Progress"
      :feedbacks="inProgressFeedbacks"
      @get-feedbacks="getInProgressFeedbacks"
    />
    <FeedbacksByStatus
      status="Live"
      :feedbacks="liveFeedbacks"
      @get-feedbacks="getLiveFeedbacks"
    />
  </div>
</template>

<styles lang="scss" scoped>
  .feedbacks-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .demo-tabs {
    width: 100%;
  }
</styles>