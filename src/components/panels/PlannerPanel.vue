<script setup>
import PanelBlock from "@/components/panels/PanelBlock.vue";
import ActionList from "@/components/actions/ActionList.vue";

import { useActionsStore } from "@/stores/actions";
import StatValue from "@/components/StatValue.vue";
import {useUnlockStore} from "@/stores/unlock";

const actions = useActionsStore();
const unlock = useUnlockStore();
</script>

<template>
  <PanelBlock class="flex flex-col" :locked="!unlock.planner">
    <div class="grid grid-cols-2 gap-3">
      <StatValue title="Planned hours">
        <span>{{ actions.currentDuration }}h / {{ actions.maxDuration }}h</span>
      </StatValue>
    </div>
    <ActionList :items="actions.allActive" />
  </PanelBlock>
</template>
