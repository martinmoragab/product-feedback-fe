<script lang="ts" setup>
  import { reactive, ref } from 'vue';
	import type { Ref } from 'vue';
	import { FeedbackParams } from '../../@types';
	import useProductStore from '../../../stores/ProductStore';
	import ProductService from '../../../services/Product';
	import { FormInstance } from 'element-plus';

	const categories = ['All', 'UI', 'UX', 'Bug', 'Enhancement', 'Feature'];
  const newFeedback = reactive({
    title: '',
    category: 'Feature',
    details: '',
  });
  const rules = reactive({
    title: [
      {
        required: true,
        message: 'Title is required',
        trigger: 'blur'
      },
      {
        min: 5,
        message: 'Title should be greater than 5 characters',
        trigger: 'change'
      }
    ],
    category: [
      {
        required: true,
        trigger: 'change'
      }
    ],
    details: [
      {
        required: true,
        message: 'Can\'t be empty',
        trigger: 'change'
      },
      {
        min: 10,
        message: 'Detail should be greater than 10 characters',
        trigger: 'change'
      }
    ]
  });
	const createFeedbackForm: any = ref<FormInstance>();
	const formHasError = ref(false);
	const showSuccessAlert = ref(false);

	const productStore = useProductStore();
	const productId = productStore.getProduct._id;

	async function createFeedback(formEl: FormInstance) {
		const params: FeedbackParams = {
			...newFeedback,
			product: productId,
		}

		await formEl.validate((valid) => {
			if (!valid) {
				formHasError.value = true;
				return;
			}
		})
		try {
			await ProductService.createFeedback(params);
			formEl.resetFields();
			showSuccessAlert.value = true;
		} catch (e) {
			console.error(e);
		}
	}

	function closeAlert() {
		formHasError.value = false;
		showSuccessAlert.value = false;
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
		type="success"
		v-if="showSuccessAlert"
	>
		Your feedback was successfully created!
		<br>
		<router-link to="/feedbacks">Take me to feedbacks list</router-link>
	</el-alert>
  <el-card>
    <div class="add-circle">+</div>
    <h5>Create New Feedback</h5>
    <el-form
      :model="newFeedback"
			:rules="rules"
			label-position="top"
			class="form"
			ref="createFeedbackForm"
    >
      <div class="input-item">
        <h6 class="input-title">Feedback Title</h6>
        <el-form-item
          label="Add a short, descriptive headline"
          prop="title"
        >
          <el-input v-model="newFeedback.title" type="text" />
        </el-form-item>
      </div>
      <div class="input-item">
        <h6 class="input-title">Category</h6>
        <el-form-item
          label="Choose a category for your feedback"
          prop="category"
        >
          <el-select v-model="newFeedback.category">
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="input-item">
        <h6 class="input-title">Feedback Detail</h6>
        <el-form-item
          label="Include any specific comments on what should be improved, added, etc."
          prop="details"
        >
          <el-input v-model="newFeedback.details" type="textarea" />
        </el-form-item>
      </div>
      <div class="action-buttons">
        <el-button type="info">Cancel</el-button>
        <el-button type="primary" @click="createFeedback(createFeedbackForm)">Add Feedback</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
  .add-circle {
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: var(--white);
    width: 56px;
    height: 56px;
    background-image: linear-gradient(to right, #71A7F6, #4789EE, #a93ee4, #d24e9d, #d24e9d);
    border-radius: 50%;
  }
  .form {
    .el-form-item, .el-select {
      width: 100%;
    }
    .action-buttons {
      display: flex;
      justify-content: flex-end;
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