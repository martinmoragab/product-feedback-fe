<script setup lang="ts">
	import { ref, onMounted } from 'vue';
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
	const feedbacks = productStore.getFeedbacks;
	const roadmapStatuses = [
		{
			name: 'Planned',
			class: 'planned',
			count: 3,
		},
		{
			name: 'In Progress',
			class: 'in-progress',
			count: 5,
		},
		{
			name: 'Live',
			class: 'live',
			count: 1,
		},
	]

	let filtersSelected: Ref<string[]> = ref([]);
	let sortingOption = ref('');

	function setFilters(filters: string[]) {
		filtersSelected.value = filters;
	};

	function setSortingFilter(sortOption: string) {
		sortingOption.value = sortOption;
	}

	productStore.setProduct();

</script>

<template>
	<div class="feedbacks-page" v-if="product">
		<div class="side-summary">
			<TitleCard :productName="product.name" />
			<FiltersCard @filters-selected="setFilters" :options="filterOptions" />
			<RoadMapCard :roadmapStatuses="roadmapStatuses" />
		</div>
		<div>
			<SuggestionsBanner :suggestionsCount="feedbacks.length" @sortingSelected="setSortingFilter" />
			<FeedbackList :feedbacks="feedbacks" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.feedbacks-page {
	display: grid;
	grid-template-columns: 250px auto;
	gap: 10px;
}
</style>