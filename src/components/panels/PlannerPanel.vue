<script setup>
import PanelBlock from "@/components/Panels/PanelBlock.vue";
import ActionList from "@/components/actions/ActionList.vue";

import { useActionsStore } from "@/stores/actions";
import StatValue from "@/components/StatValue.vue";

const actions = useActionsStore();
</script>

<template>
  <PanelBlock class="flex flex-col">
    <div class="grid grid-cols-2 gap-3">
      <StatValue title="Planned hours">
        <span>{{ actions.currentDuration }}h / {{ actions.maxDuration }}h</span>
      </StatValue>
    </div>
    <ActionList :items="actions.allActive" />
  </PanelBlock>
</template>
