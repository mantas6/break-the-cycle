<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { pickBy } from "lodash/object";
import { kebabCase } from "lodash/string";
import { useActionsStore } from "@/stores/actions.js";
import ActionList from "@/components/actions/ActionList.vue";

const actions = useActionsStore();

const route = useRoute();

const filtered = computed(() => {
  const selectedCategory = route.params.category;

  if (!selectedCategory) {
    return actions.all;
  }

  return pickBy(actions.all, action => kebabCase(action.category) === selectedCategory)
})
</script>

<template>
  <div>
    <ActionList :items="filtered" grid />
  </div>
</template>
