<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import type { ComputedRef } from 'vue';
	import type { Feedback } from '../../../stores/@types';
	import { useRouter } from 'vue-router';
	import useUserStore from '../../../stores/UserStore';
	import ProductService from '../../../services/Product';
  import useProductStore from '../../../stores/ProductStore';

	const props = defineProps({
    status: {
      required: false,
      type: String,
    },
		feedback: {
			required: true,
			type: Object as () => Feedback,
		},
	})

  const productStore = useProductStore();
  const userStore = useUserStore();
  const { user } = userStore;
  const emits = defineEmits(['getFeedback']);
  const userTriedToVoteLoggedOut = ref(false);

	const feedbackVotes = computed(() => {
		return Object.keys(props.feedback.votes).length;
	})

	const userVoted: ComputedRef<boolean> = computed(() => {
    if (user) {
      const userId = userStore.getUser?._id;
      const votes = props.feedback.votes;
      if (userId) return votes.hasOwnProperty(userId);
      else return false;
    } else {
      return false;
    }
	})

	const router = useRouter();

	function goToDetails() {
		router.push({
			name: 'FeedbackDetails',
			params: { id: props.feedback?._id }
		})
	}

  const statusClass = computed(() => {
    const status = props.feedback.status;
    let className = '';
    switch (status) {
      case 'Planned':
        return 'planned'
      case 'In Progress':
        return 'in-progress'
      case 'Live':
        return 'live'
      default:
        return ''
    }
  });

  function resetTriedToVote() {
    userTriedToVoteLoggedOut.value = false;
  }

	async function voteForFeedback(event: Event) {
    event.stopPropagation();
    resetTriedToVote();
    if (!user) {
      userTriedToVoteLoggedOut.value = true;
      return;
    }
		try {
			await ProductService.voteForFeedback(props.feedback._id);
			await productStore.setFeedbacks();
      emits('getFeedback');
		} catch (e) {
			console.error(e);
		}
	}
</script>

<template>
  <el-alert
    @close="resetTriedToVote"
		effect='dark'
		title="Cannot vote"
		type="error"
		v-if="userTriedToVoteLoggedOut"
	>
		You must be logged in to vote.
	</el-alert>
	<el-card
    class="feedback-card"
    :class="status ? `status-border-${statusClass}` : ''"
    @click="goToDetails"
  >
    <div class="status-color" v-if="status">
      <div class="color" :class="statusClass"></div>
      <p>{{ feedback.status }}</p>
    </div>
		<div class="feedback-content">
			<div class="vote-info">
        <el-button
          class="vote"
          :class="userVoted ? 'voted-by-user' : ''"
          @click="voteForFeedback"
        >
          {{ feedbackVotes }}
        </el-button>
				<div class="feedback-info">
					<h6 class="text-to-ellipsis">{{ feedback.title }}</h6>
					<p class="text-to-ellipsis">{{ feedback.details }}</p>
					<el-tag>{{ feedback.category }}</el-tag>
				</div>
			</div>
			<div class="comments">
				<img class="comment-icon" src="@images/Question.svg"/>
				<p>{{ feedback.comments.length }}</p>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
  .status-color {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 15px;
    p {
      margin: 0;
      color: var(--lightGray)
    }
    .color {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.planned {
        background-color: var(--orange);
      }
      &.in-progress {
        background-color: var(--mainPurple);
      }
      &.live {
        background-color: var(--lightBlue);
      }
    }
  }
  .status-border-planned {
    border-top: 5px solid var(--orange);
  }
  .status-border-in-progress {
    border-top: 5px solid var(--mainPurple);
  }
  .status-border-live {
    border-top: 5px solid var(--lightBlue);
  }
	.feedback-content {
		display: flex;
		justify-content: space-between;
		width: 100%;
		.vote-info {
			display: flex;
		}
		.feedback-info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			margin-left: 10px;
			text-align: left;
			* {
				margin: 0;
			}
		}
		.comments {
			display: flex;
			align-items: center;
			justify-self: flex-end;
			gap: 8px;
			font-weight: bold;
			.comment-icon {
				width: 18px;
				height: 18px;
			}
		}
  }
</style>