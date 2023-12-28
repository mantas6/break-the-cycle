<script setup>
import { RouterView } from 'vue-router'
import HeaderPanel from "@/components/panels/HeaderPanel.vue";
import LocationPanel from "@/components/panels/LocationPanel.vue";
import PanelBlock from "@/components/panels/PanelBlock.vue";
import PlannerPanel from "@/components/panels/PlannerPanel.vue";
import DetailsPanel from "@/components/panels/DetailsPanel.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-3 m-3">
    <HeaderPanel />
    <LocationPanel class="col-span-2" />
    <PlannerPanel class="row-span-2" />

    <DetailsPanel />
    <PanelBlock class="col-span-2 min-h-96">
      <RouterView />
    </PanelBlock>
  </div>
</template>

