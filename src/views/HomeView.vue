<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { pickBy } from "lodash/object";
import { kebabCase } from "lodash/string";
import { useActionsStore } from "@/stores/actions.js";
import ActionList from "@/components/actions/ActionList.vue";
import DeathScreen from "@/components/DeathScreen.vue";
import {useDeathStore} from "@/stores/death.js";

const actions = useActionsStore();
const passport = useDeathStore();

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
  <div v-if="passport.alive">
    <ActionList :items="filtered" grid />
  </div>
  <DeathScreen v-else />
</template>
