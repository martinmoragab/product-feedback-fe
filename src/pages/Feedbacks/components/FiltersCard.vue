<script lang="ts" setup>
import { ref, watch } from 'vue';
	
	const props = defineProps({
		options: {
			type: Array,
			required: true,
		}
	});

	const emit = defineEmits(['filtersSelected']);

	let filtersSelected = ref(['All']);

	watch(filtersSelected, (newVal, oldVal = []) => {
		if (oldVal?.includes('All') && newVal.length > 1) filtersSelected.value = filtersSelected.value.filter(filter => filter !== 'All');
		if (oldVal?.length > 1 && newVal.includes('All')) filtersSelected.value = ['All'];
		emit('filtersSelected', filtersSelected.value);
	}, { immediate: true })

</script>

<template>
	<el-card class="small">
		<div class="filters">
			<el-checkbox-group v-for="option in options" :key="option" v-model="filtersSelected">
				<el-checkbox :label="option" border size="small"/>
			</el-checkbox-group>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>