<script setup>
import { computed } from "vue";
import { uniq } from "lodash/array";
import { map } from "lodash/collection";
import { kebabCase } from "lodash/string";

import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from "vue-router";
import PanelBlock from "@/components/Panels/PanelBlock.vue";
import { useTimeStore } from "@/stores/time";
import { useActionsStore } from "@/stores/actions";

const time = useTimeStore();
const actions = useActionsStore();

const categories = computed(() => uniq(map(actions.all, 'category')));
</script>

<template>
  <PanelBlock class="flex justify-between">
    <div class="flex gap-3">
      <RouterLink to="/" v-hover>Home</RouterLink>
      <template v-for="category in categories" :key="category">
        <RouterLink :to="`/${kebabCase(category)}`" v-hover>{{ category }}</RouterLink>
      </template>
    </div>
    <div class="flex gap-2 items-start">
      <RouterLink to="/settings" v-hover><Cog6ToothIcon class="w-6" /></RouterLink>
    </div>
  </PanelBlock>
</template>
