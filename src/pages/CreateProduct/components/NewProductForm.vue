<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from 'element-plus';
  import ProductService from '../../../services/Product';

  const router = useRouter();

  const newProductForm = reactive({
    name: '',
    mainColor: '',
    webpage: '',
  });

  const formHasError = ref(false);
  const showSuccessAlert = ref(false);

  const rules = reactive({
    name: [
      {
        required: true,
        message: 'Name is required',
        trigger: 'blur'
      },
      {
        min: 5,
        message: 'Name should be greater than 5 characters',
        trigger: 'change'
      }
    ],
    mainColor: [
      {
        pattern: /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        message: 'Color must be a hexadecimal string'
      }
    ],
    webpage: [
      {
        required: true,
        trigger: 'blur',
        message: 'Webpage is required'
      },
      {
        pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        message: 'This does not seems to be a webpage 🤔'
      },
    ],
  });

	const createProductForm: any = ref<FormInstance>();

  function closeAlert() {
    formHasError.value = false;
    showSuccessAlert.value = false;
	}

  async function createProduct(formEl: FormInstance) {
    await formEl.validate((valid) => {
			if (!valid) {
				formHasError.value = true;
				return;
			}
		})

    try {
      const response = await ProductService.createProduct(newProductForm);
      const productId = response.data.product._id;
      showSuccessAlert.value = true;
      setTimeout(() => {
        router.push({
          name: 'Feedbacks',
          params: { id: productId }
        })
      }, 3000);
    } catch (e) {
      throw e;
    }
  }

</script>

<template>
  <el-alert
		@close="closeAlert"
		effect='dark'
		title="Missing Fields"
		type="error"
		v-if="formHasError"
	>
		Please provide all required fields.
	</el-alert>
	<el-alert
		@close="closeAlert"
		effect='dark'
		title="Success!"
		v-if="showSuccessAlert"
	>
    Your product was successfully created!
		<br>
		You will be redirected to your project
	</el-alert>
  <el-card>
    <h5>New Product</h5>
    <el-form
      :model="newProductForm"
      :rules="rules"
      label-position="top"
      class="form"
      ref="createProductForm"
    >
      <div class="input-item">
        <h6 class="input-title">Product Name</h6>
        <el-form-item
          label="Add the name of your product"
          prop="name"
        >
          <el-input v-model="newProductForm.name" type="text" />
        </el-form-item>
      </div>
      <div class="input-item">
        <h6 class="input-title">Main Color</h6>
        <el-form-item
          label="Add the main color of your product"
          prop="mainColor"
        >
          <el-input v-model="newProductForm.mainColor" type="text" />
        </el-form-item>
      </div>
      <div class="input-item">
        <h6 class="input-title">Web Page</h6>
        <el-form-item
          label="Add the web page of your product"
          prop="webpage"
        >
          <el-input v-model="newProductForm.webpage" type="text" />
        </el-form-item>
      </div>
      <div class="action-buttons">
        <div>
          <el-button type="primary" @click="createProduct(createProductForm)">Create Product</el-button>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.form {
    .el-form-item, .el-select {
      width: 100%;
    }
    .action-buttons {
      display: flex;
      justify-content: end;
      margin-top: 10px;
    }
  }
  .input-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    .input-title {
      margin: 0;
    }
  }
</style>