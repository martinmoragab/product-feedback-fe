<script setup lang="ts">
	import { ref, onBeforeMount, watch } from 'vue';
	import type { Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import openSocket from 'socket.io-client';
	import useProductStore from '../../stores/ProductStore';
	import TitleCard from './components/TitleCard.vue';
	import FiltersCard from './components/FiltersCard.vue';
	import RoadMapCard from './components/RoadMapCard.vue';
	import SuggestionsBanner from './components/SuggestionsBanner.vue';
	import FeedbackList from './components/FeedbackList.vue';
  import 'animate.css';

	const filterOptions = ['All', 'UI', 'UX', 'Bug', 'Enhancement', 'Feature'];

  const router = useRouter();
  const route = useRoute();
  const productId = route.params.id;
	const productStore = useProductStore();
	const { product, roadmap: roadmapStatuses } = storeToRefs(productStore);
	const openMenu = ref(false);
  let filtersSelected: Ref<string[]> = ref([]);
	let sortingOption: Ref<string> = ref('');
  let newFeedbacks = ref(false);
  const isMobile = ref(false);

	function setFilters(filters: string[]) {
		filtersSelected.value = filters;
	};

	function setSortingFilter(sortOption: string) {
		sortingOption.value = sortOption;
	}

  function viewportChange(viewportWidth: number) {
    if (viewportWidth <= 510) isMobile.value = true;
    else isMobile.value = false;
  }

  function toggleMenu() {
    openMenu.value = !openMenu.value
  }

  function getFeedbacks() {
    productStore.setFeedbacks();
    newFeedbacks.value = false;
  }

  function goToProducts() {
    router.push({ name: 'Products' });
  }

	watch(filtersSelected, () => {
		if (filtersSelected.value.includes('All')) productStore.setFeedbacks([]);
		else productStore.setFeedbacks(filtersSelected.value)
  })

	onBeforeMount(async () => {
    if (window.innerWidth <= 510) isMobile.value = true;
		productStore.setFeedbacks(filtersSelected.value);
	})

  const socket = openSocket(import.meta.env.VITE_API_BASE_URL);

  socket.on('feedbackAdded', data => {
    const product = data.product;
    if (product === productStore.product._id) newFeedbacks.value = true;
  });

  await productStore.selectProduct(productId as string);

</script>

<template>
  <div class="products-button">
    <el-button
        class="back-button"
        link
        @click="goToProducts"
      >
      <img src="@images/back-arrow.png"/>Products
    </el-button>
  </div>
	<div class="feedbacks-page">
    <el-alert
      v-if="newFeedbacks"
      effect="dark"
      :title="`There are new feedbacks for ${product.name}`" type="info">
      <template #default>
        <el-button
          size="small"
          type="primary"
          @click="getFeedbacks"
          >
          Load them!
        </el-button>
      </template>
    </el-alert>
		<div class="side-summary">
			<TitleCard :productName="product.name" @viewport-change="viewportChange" @toggle-menu="toggleMenu"/>
			<FiltersCard v-if="!isMobile" @filters-selected="setFilters" :options="filterOptions" />
			<RoadMapCard v-if="!isMobile" :roadmapStatuses="roadmapStatuses" />
		</div>
    <div v-show="isMobile && openMenu" class="collapsable-menu">
      <div class="menu-content" :class="openMenu ? 'animate__animated animate__slideInRight' : 'animate__animated animate__slideOutRight'">
        <FiltersCard @filters-selected="setFilters" :options="filterOptions" />
        <RoadMapCard :roadmapStatuses="roadmapStatuses" />      
      </div>
    </div>
		<div>
			<SuggestionsBanner @sortingSelected="setSortingFilter" />
			<FeedbackList :sortingOption="sortingOption" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
  .products-button {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
.feedbacks-page {
	display: grid;
	grid-template-columns: 250px auto;
	gap: 10px;
	@media screen and (max-width: 820px) {
		display: flex;
		flex-direction: column;
    .side-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
	}
  @media screen and (max-width: 510px) {
    .side-summary {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
  }
  .collapsable-menu {
    top: 86.55px;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    top: 86.55px;
    z-index: 99;
    overflow: hidden;
    right: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .menu-content {
    align-self: flex-end;
    background-color: var(--mediumWhite);
    height: 100vh;
    padding: 10px;
    width: 80%;
  }
}
</style>