<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';

  const commentForm = reactive({
    content: '',
  });
  const rules = reactive({
    content: [
      {
        required: true,
        message: 'A comment is required',
        trigger: 'blur'
      },
    ]
  })
  const charactersLeft = ref(250);

  watch(commentForm, () => {
    const commentLength = commentForm.content.length;
    charactersLeft.value = 250 - commentLength;
  })
</script>

<template>
  <el-card>
    <h6 class="title">Add Comment</h6>
    <el-form
      :model="commentForm"
			:rules="rules"
			label-position="top"
			class="form"
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
        <el-button type="primary">Post Comment</el-button>
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