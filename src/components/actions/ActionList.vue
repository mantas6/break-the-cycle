<script setup>
import { computed } from "vue";
import ActionListItem from "./ActionListItem.vue";

const props = defineProps({
  items: Object,
  grid: Boolean,
})
</script>

<template>
  <div :class="{ 'grid-cols-2': grid }" class="grid gap-1">
    <template v-for="(action, actionName) in items" :key="actionName">
      <ActionListItem :name="actionName" v-bind="action" />
    </template>
  </div>
</template>
