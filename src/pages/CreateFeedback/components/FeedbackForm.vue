<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
	import { FeedbackParams } from '../../@types';
  import { Feedback } from '../../../stores/@types';
	import useProductStore from '../../../stores/ProductStore';
	import ProductService from '../../../services/Product';
	import { FormInstance } from 'element-plus';

  const props = defineProps({
    type: {
      type: String,
      default: 'create'
    }
  })

  const router = useRouter();
  const { params } = useRoute();
  const { id: feedbackId } = params as any;
  
  let feedback = {} as Feedback;
	const categories = ['All', 'UI', 'UX', 'Bug', 'Enhancement', 'Feature'];
	const statuses = ['Not Started', 'Planned', 'In Progress', 'Live'];
  const newFeedback = reactive({
    title: '',
    category: 'Feature',
    details: '',
    status: '',
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
    status: [
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

  const formTitle = computed(() => {
    return props.type === 'create' ? 'Create New Feedback' : `Editing '${ newFeedback.title }'`
  })

	async function createFeedback(formEl: FormInstance) {
		const params: FeedbackParams = {
			...newFeedback,
			product: productId,
		}

    if (props.type === 'create') delete params.status;

		await formEl.validate((valid) => {
			if (!valid) {
				formHasError.value = true;
				return;
			}
		})
		try {
			if (props.type === 'create') await ProductService.createFeedback(params);
      else await ProductService.editFeedback(params, feedbackId);
			if (props.type === 'create') formEl.resetFields();
			showSuccessAlert.value = true;
		} catch (e) {
			console.error(e);
		}
	}

  async function deleteFeedback() {
    try {
      await ProductService.deleteFeedback(feedbackId);
      router.push({
        name: 'Feedbacks'
      })
		} catch (e) {
			console.error(e);
		}
  }

	function closeAlert() {
		formHasError.value = false;
		showSuccessAlert.value = false;
	}

  async function getFeedbackDetails() {
    if (props.type === 'edit') {
      feedback = await ProductService.getFeedback(feedbackId);
      newFeedback.title = feedback.title;
      newFeedback.category = feedback.category;
      newFeedback.details = feedback.details;
      newFeedback.status = feedback.status;
    }
  }

  getFeedbackDetails();

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
		Your feedback was successfully {{ props.type === 'create' ? 'created' : 'edited' }}!
		<br>
		<router-link to="/feedbacks">Take me to feedbacks list</router-link>
	</el-alert>
  <el-card>
    <div class="add-circle" v-if="props.type === 'create'">+</div>
    <div class="add-circle" v-else>
      <img src="../../../assets/images/edit-pencil.svg" />
    </div>
    <h5>{{ formTitle }}</h5>
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
      <div class="input-item" v-if="props.type === 'edit'">
        <h6 class="input-title">Update Status</h6>
        <el-form-item
          label="Change feedback state"
          prop="status"
        >
          <el-select v-model="newFeedback.status">
            <el-option
              v-for="status in statuses"
              :key="status"
              :label="status"
              :value="status"
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
        <div v-if="props.type === 'edit'">
          <el-button type="danger" @click="deleteFeedback">Delete</el-button>
        </div>
        <div>
          <el-button type="info">Cancel</el-button>
          <el-button type="primary" @click="createFeedback(createFeedbackForm)">
            {{ props.type === 'create' ? 'Add Feedback' : 'Save Feedback' }}
          </el-button>
        </div>
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
      justify-content: space-between;
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