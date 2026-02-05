<template>
  <PageLayout>
    <template #header-back>
      <ArrowLeft :size="20" />
    </template>

    <template #header-title> Task Details </template>

    <template #header-action>
      <RouterLink :to="`/tasks/${taskId}/edit`" class="action-button">
        <Pencil :size="18" />
      </RouterLink>
    </template>

    <template #main>
      <DetailedTaskCard />
    </template>

    <template #footer>
      <DeleteTaskButton />
    </template>
  </PageLayout>
</template>

<script lang="ts">
import { ArrowLeft, Pencil, Trash } from 'lucide-vue-next'
import PageLayout from '@/components/layouts/PageLayout.vue'
import DetailedTaskCard from '@/components/DetailedTaskCard.vue'
import DeleteTaskButton from '@/components/DeleteTaskButton.vue'

export default {
  components: {
    PageLayout,
    DetailedTaskCard,
    DeleteTaskButton,
    ArrowLeft,
    Pencil,
    Trash,
  },
  data() {
    return {
      taskId: '',
    }
  },
  mounted() {
    this.taskId = this.$route.params.id as string
  },
}
</script>

<style scoped></style>
