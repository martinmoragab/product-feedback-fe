<script setup lang="ts">
	import { ref } from 'vue';
	import type { Ref } from 'vue';
	import TitleCard from './components/TitleCard.vue';
	import FiltersCard from './components/FiltersCard.vue';
	import RoadMapCard from './components/RoadMapCard.vue';
	import SuggestionsBanner from './components/SuggestionsBanner.vue';
	import FeedbackList from './components/FeedbackList.vue';

	let filtersSelected: Ref<string[]> = ref([]);
	let sortingOption = ref('');
	const filterOptions = ['All', 'UI', 'UX', 'Bug', 'Enhancement', 'Feature'];
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

	function setFilters(filters: string[]) {
		console.log('filters', filters);
		filtersSelected.value = filters;
	};

	function setSortingFilter(sortOption: string) {
		sortingOption.value = sortOption;
		console.log('sort', sortingOption.value);
	}

</script>

<template>
	<div class="feedbacks-page">
		<div class="side-summary">
			<TitleCard productName='Front End Mentor'/>
			<FiltersCard @filters-selected="setFilters" :options="filterOptions"/>
			<RoadMapCard :roadmapStatuses="roadmapStatuses" />
		</div>
		<div>
			<SuggestionsBanner :suggestionsCount="6" @sortingSelected="setSortingFilter"/>
			<FeedbackList />
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