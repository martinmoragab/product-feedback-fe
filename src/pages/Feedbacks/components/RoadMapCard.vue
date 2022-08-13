<script lang="ts">
  export default {
    name: 'RoadMapCard',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>
import { Status } from './@types';

	const props = defineProps({
		roadmapStatuses: {
			type: Object as () => Status[],
			required: true,
		}
	})

</script>

<template>
	<el-card class="small road-map">
		<div class="header">
			<h6>Roadmap</h6>
			<router-link to="/road-map">View</router-link>
		</div>
		<div class="road-map-count">
			<div
				v-for="status in roadmapStatuses"
				:key="status.name"
				class="status"
			>
				<div class="status-color">
					<div class="color" :class="status.class"></div>
					<p>{{ status.name }}</p>
				</div>
				<h6>{{ status.count }}</h6>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
	.road-map {
		.header, .status {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			h6 {
				margin: 0;
			}
		}
		.road-map-count {
			width: 100%;
			gap: 5px;
			margin-top: 10px;
			.status-color {
				align-items: center;
				display: flex;
				flex-direction: row;
				gap: 10px;
				p {
					margin: 0;
				}
				.color {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					&.planned {
						background-color: var(--orange);
					}
					&.in-progress {
						background-color: var(--mainPurple);
					}
					&.live {
						background-color: var(--lightBlue);
					}
				}
			}
		}
	}
</style>