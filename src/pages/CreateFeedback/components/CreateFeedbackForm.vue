<script lang="ts" setup>
  import { reactive } from 'vue';

	const categories = ['All', 'UI', 'UX', 'Bug', 'Enhancement', 'Feature'];
  const newFeedback = reactive({
    title: '',
    category: 'Feature',
    detail: '',
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
    detail: [
      {
        required: true,
        message: 'Can\'t be empty',
        trigger: 'blur'
      },
      {
        min: 10,
        message: 'Detail should be greater than 10 characters',
        trigger: 'change'
      }
    ]
  });

</script>

<template>
  <el-card>
    <div class="add-circle">+</div>
    <h5>Create New Feedback</h5>
    <el-form
      :model="newFeedback"
			:rules="rules"
			label-position="top"
			class="form"
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
          prop="detail"
        >
          <el-input v-model="newFeedback.detail" type="textarea" />
        </el-form-item>
      </div>
      <div class="action-buttons">
        <el-button type="info">Cancel</el-button>
        <el-button type="primary">Add Feedback</el-button>
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