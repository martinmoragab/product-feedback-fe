<script lang="ts">
  export default {
    name: 'TitleCard',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script lang="ts" setup>

	const props = defineProps({
		productName: {
			type: String,
			required: true,
		}
	})

</script>

<template>
	<el-card class="small title-card">
		<h5>{{ productName }}</h5>
		<p>Feedback board</p>
	</el-card>
</template>

<style lang="scss" scoped>
.title-card {
	display: flex;
	align-items: flex-end;
	color: var(--white);
	background-image: linear-gradient(to right, #71A7F6, #4789EE, #a93ee4, #d24e9d, #d24e9d);
	h5, p {
		margin: 0;
	}
	h5 {
		margin-top: 30px;
	}
}
</style>