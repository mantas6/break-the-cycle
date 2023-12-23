<script setup>
import ActionListItem from "./ActionListItem.vue";

const props = defineProps({
  items: Object,
  grid: Boolean,
})

</script>

<template>
  <div :class="{ 'grid grid-cols-2': grid }">
    <template v-for="(action, actionName) in items" :key="actionName">
      <ActionListItem :name="actionName" v-bind="action" />
    </template>
  </div>
</template>
