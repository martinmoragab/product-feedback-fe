<script lang="ts">
  export default {
    name: 'SuggestionsBanner',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>
	import { ref, watch } from 'vue';
	import { useRouter } from 'vue-router';

	const props = defineProps({
		suggestionsCount: {
			type: Number,
			required: true,
		}
	})

	const emit = defineEmits(['sortingSelected']);
	const router = useRouter();

	const sortBy = ref('Most upvotes');
	const sortingOptions = ['Most upvotes', 'Least upvotes', 'Most comments', 'Least comments']; 

	function goToCreateFeedback() {
		router.push({
			name: 'CreateFeedback',
			params: { id: 'asd' }
		})
	}

	watch(sortBy, () => {
		emit('sortingSelected', sortBy);
	}, { immediate: true });

</script>

<template>
	<el-card class="banner">
		<img src="../../../assets/images/bulb.svg"/>
		<h6>{{ suggestionsCount }} Suggestions</h6>
		<p>Sort by:
			<el-select v-model="sortBy" size="small" class="transparent">
				<el-option
					v-for="option in sortingOptions"
					:key="option"
					:label="option"
					:value="option"
				/>
			</el-select>
		</p>
		<el-button
			type="primary"
			size="large"
			@click="goToCreateFeedback"
		>
			+ Add Feedback
		</el-button>
	</el-card>
</template>

<style lang="scss" scoped>
	.banner {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 70px;
		h6 {
			color: var(--white);
			margin: 12px 0;
		}
	}
</style>