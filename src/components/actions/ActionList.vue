<script setup>
import { computed } from "vue";
import ActionListItem from "./ActionListItem.vue";
import {set, transform} from "lodash/object.js";

const props = defineProps({
  items: Object,
  grid: Boolean,
})

const categorized = computed(() => {
  const iteratee = (acc, action, actionName) => set(acc, [action.category, actionName], action);
  return transform(props.items, iteratee, {});
});
</script>

<template>
  <div class="grid gap-1">
    <template v-for="(actionsItems, categoryName) in categorized" :key="categoryName">
      <div class="text-xs text-zinc-300" v-if="Object.keys(categorized).length > 1">{{ categoryName }}</div>
      <div :class="{ 'grid-cols-2': grid }" class="grid gap-1">
        <template v-for="(action, actionName) in actionsItems" :key="actionName">
          <ActionListItem :name="actionName" v-bind="action" />
        </template>
      </div>
    </template>
  </div>
</template>
