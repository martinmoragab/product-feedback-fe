<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
	import { FormInstance } from 'element-plus';
	import { useRoute } from 'vue-router';
	import ProductService from '../../../services/Product';

	const emits = defineEmits([
		'getFeedback'
	]);

	const route = useRoute();
	const feedbackId = route.params.id;

  const commentForm = reactive({
    content: '',
  });
  const rules = reactive({
    content: [
      {
        required: true,
        message: 'A comment is required',
        trigger: 'change'
      },
    ]
  })
  const charactersLeft = ref(250);
	const createCommentForm: any = ref<FormInstance>();
	const formHasError = ref(false);

	async function postComment(formEl: FormInstance) {
		formHasError.value = false;
		await formEl.validate((valid) => {
			if (!valid) {
				formHasError.value = true;
				return;
			}
		})
		try {
			await ProductService.postComment(feedbackId, commentForm.content);
			emits('getFeedback')
			formEl.resetFields();
		} catch (e) {
			console.error(e);
		}
	}

	function closeAlert() {
		formHasError.value = false;
	}

  watch(commentForm, () => {
    const commentLength = commentForm.content.length;
    charactersLeft.value = 250 - commentLength;
  })
</script>

<template>
	<el-alert
		@close="closeAlert"
		effect='dark'
		title="Missing Fields"
		type="error"
		v-if="formHasError"
	>
		A comment cannot be empty.
	</el-alert>
  <el-card>
    <h6 class="title">Add Comment</h6>
    <el-form
      :model="commentForm"
			:rules="rules"
			label-position="top"
			class="form"
			ref="createCommentForm"
    >
      <el-form-item prop="content">
				<el-input
					v-model="commentForm.content"
					type="textarea"
					maxlength="250"
				/>
			</el-form-item>
      <div class="characters-button">
        <p>{{ charactersLeft }} characters left</p>
        <el-button type="primary" @click="postComment(createCommentForm)">Post Comment</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
  .title {
    margin: 10px 0;
  }
  .characters-button {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
</style>