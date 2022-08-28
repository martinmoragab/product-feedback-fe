<script lang="ts" setup>
	import { Roadmap } from '../../../stores/@types';

	const props = defineProps({
		roadmapStatuses: {
			type: Object as () => Roadmap,
			required: true,
		}
	})
</script>

<template>
	<el-card class="small road-map">
		<div class="title-and-link">
			<h6>Roadmap</h6>
			<router-link to="/road-map">View</router-link>
		</div>
		<div class="road-map-count">
			<div class="status">
				<div class="status-color">
					<div class="color planned"></div>
					<p>Planned</p>
				</div>
				<h6>{{ roadmapStatuses.planned }}</h6>
			</div>
			<div class="status">
				<div class="status-color">
					<div class="color in_progress"></div>
					<p>In Progress</p>
				</div>
				<h6>{{ roadmapStatuses.in_progress }}</h6>
			</div>
			<div class="status">
				<div class="status-color">
					<div class="color live"></div>
					<p>Live</p>
				</div>
				<h6>{{ roadmapStatuses.live }}</h6>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
	.road-map {
		.title-and-link, .status {
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
					&.in_progress {
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