<script setup lang="ts">
	import { ref, onBeforeMount, watch } from 'vue';
	import type { Ref } from 'vue';
	import useProductStore from '../../stores/ProductStore';
	import TitleCard from './components/TitleCard.vue';
	import FiltersCard from './components/FiltersCard.vue';
	import RoadMapCard from './components/RoadMapCard.vue';
	import SuggestionsBanner from './components/SuggestionsBanner.vue';
	import FeedbackList from './components/FeedbackList.vue';

	const filterOptions = ['All', 'UI', 'UX', 'Bug', 'Enhancement', 'Feature'];

	const productStore = useProductStore();
	const product = productStore.getProduct;
	const feedbacksCount = ref(productStore.getFeedbacksCount);
	const roadmapStatuses = ref(productStore.getRoadmap);
	let filtersSelected: Ref<string[]> = ref([]);
	let sortingOption = ref('');

	function setFilters(filters: string[]) {
		filtersSelected.value = filters;
	};

	function setSortingFilter(sortOption: string) {
		sortingOption.value = sortOption;
	}

	watch(filtersSelected, () => {
		if (filtersSelected.value.includes('All')) productStore.setFeedbacks([]);
		else productStore.setFeedbacks(filtersSelected.value)
	})

	onBeforeMount(() => {
		productStore.setFeedbacks(filtersSelected.value);
	})

</script>

<template>
	<div class="feedbacks-page">
		<div class="side-summary">
			<TitleCard :productName="product.name" />
			<FiltersCard @filters-selected="setFilters" :options="filterOptions" />
			<RoadMapCard :roadmapStatuses="roadmapStatuses" />
		</div>
		<div>
			<SuggestionsBanner :suggestionsCount="feedbacksCount" @sortingSelected="setSortingFilter" />
			<FeedbackList />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.feedbacks-page {
	display: grid;
	grid-template-columns: 250px auto;
	gap: 10px;
	@media screen and (max-width: 650px) {
		display: flex;
		flex-direction: column;
	}
}
</style>