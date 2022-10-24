<script lang="ts" setup>
  import { ref, onUnmounted, computed } from 'vue';
  import { Menu, Close } from '@element-plus/icons-vue';
  import { LightenDarkenColor } from '../../../utils/lightenDarkenColor';
  import useProductStore from '../../../stores/ProductStore';

	const props = defineProps({
		productName: {
			type: String,
			required: true,
		},
    closeMenu: {
      type: Boolean,
      required: false,
    }
	})

  const emits = defineEmits(['viewportChange', 'toggleMenu'])
  const productStore = useProductStore();
  const productColor = productStore.product.mainColor;

  const isMenuOpen = ref(false);
  const viewportWidth = ref(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));

  function setViewportWidth(event: Event) {
    const width = window.innerWidth;
    viewportWidth.value = width;
    emits('viewportChange', viewportWidth.value);
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
    emits('toggleMenu');
  }

  const linearGradient = computed(() => {
    const lighterColor = LightenDarkenColor(productColor, 40);
    return `linear-gradient(to right, ${ productColor }, ${ lighterColor })`;
  })

  window.addEventListener('resize', setViewportWidth);

  onUnmounted(() => {
    window.removeEventListener('resize', setViewportWidth);
  })

</script>

<template>
	<el-card
    class="small title-card"
    :style="{ backgroundImage: linearGradient }"
  >
    <div class="product-info">
      <h5>{{ productName }}</h5>
      <p>Feedback board</p>
    </div>
    <el-button v-if="viewportWidth <= 510" @click="toggleMenu" :icon="isMenuOpen ? Close : Menu" circle />
	</el-card>
</template>

<style lang="scss" scoped>
.title-card {
	display: flex;
	align-items: flex-end;
  text-align: left;
	color: var(--white);
	background-image: linear-gradient(to right, #71A7F6, #4789EE, #a93ee4, #d24e9d, #d24e9d);
	h5, p {
		margin: 0;
		color: var(--white);
	}
}
</style>