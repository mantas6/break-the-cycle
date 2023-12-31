<script setup>
import { computed } from "vue";
import { uniq } from "lodash/array";
import { map } from "lodash/collection";
import { kebabCase } from "lodash/string";

import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from "vue-router";
import PanelBlock from "@/components/panels/PanelBlock.vue";
import { useTimeStore } from "@/stores/time";
import { useActionsStore } from "@/stores/actions";
import {pickBy} from "lodash/object";
import {useUnlockStore} from "@/stores/unlock.js";

const time = useTimeStore();
const actions = useActionsStore();
const unlock = useUnlockStore();

const categories = computed(() => uniq(map(actions.all, 'category')));

const categoriesNotify = computed(() => {
  const actionsNotify = pickBy(actions.all, action => action.notify)
  return uniq(map(actionsNotify, 'category'));
});
</script>

<template>
  <PanelBlock class="flex justify-between" :locked="!unlock.categories">
    <div class="flex gap-3">
      <RouterLink to="/" active-class="underline" v-hover>All</RouterLink>
      <template v-for="category in categories" :key="category">
        <RouterLink :to="`/${kebabCase(category)}`" active-class="underline" v-hover>
          <span>{{ category }}</span>
          <span v-if="categoriesNotify.includes(category)" class="text-red-300">*</span>
        </RouterLink>
      </template>
    </div>
    <div class="flex gap-2 items-start">
      <RouterLink to="/settings" v-hover><Cog6ToothIcon class="w-6" /></RouterLink>
    </div>
  </PanelBlock>
</template>
