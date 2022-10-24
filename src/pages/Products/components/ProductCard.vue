<script lang="ts" setup>
  import { computed } from 'vue';
  import { Product } from '../../../stores/@types';
  import { useRouter } from 'vue-router';
  import { LightenDarkenColor } from '../../../utils/lightenDarkenColor';

  const props = defineProps({
    product: {
      type: Object as () => Product,
      required: true
    }
  })

  const router = useRouter();

  const productId = props.product._id;
  const productName = props.product.name;
  const productColor = props.product.mainColor;
  const productWebpage = props.product.webpage;

  async function selectProduct() {
    router.push(
      {
        name: 'Feedbacks',
        params: {
          id: productId,
        }
      }
    )
  }

  const linearGradient = computed(() => {
    const lighterColor = LightenDarkenColor(productColor, 40);
    return `linear-gradient(to right, ${ productColor }, ${ lighterColor })`;
  })

</script>

<template>
  <el-card
    @click="selectProduct"
    class="product-card"
    :style="{ backgroundImage: linearGradient }"
  >
    <div class="product-logo"></div>
    <h6>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="`Go to ${productWebpage}`"
        placement="top-start"
      >
        <a :href="productWebpage" target="_blank">{{ productName }}</a>
      </el-tooltip>
    </h6>
  </el-card>
</template>

<style lang="scss" scoped>
  .product-logo {
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 50%;
  }
</style>