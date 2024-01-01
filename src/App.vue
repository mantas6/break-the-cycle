<script setup>
import { RouterView } from 'vue-router'
import HeaderPanel from "@/components/panels/HeaderPanel.vue";
import LocationPanel from "@/components/panels/LocationPanel.vue";
import PanelBlock from "@/components/panels/PanelBlock.vue";
import PlannerPanel from "@/components/panels/PlannerPanel.vue";
import DetailsPanel from "@/components/panels/DetailsPanel.vue";
</script>

<template>
  <div class="grid grid-cols-4 max-xl:grid-cols-2 gap-3 m-3 max-sm:hidden">
    <HeaderPanel />
    <LocationPanel class="col-span-2 max-xl:col-span-1" />
    <PlannerPanel class="row-span-2 max-xl:hidden" />

    <DetailsPanel />
    <PanelBlock class="col-span-2 max-xl:col-span-1 min-h-96">
      <RouterView />
    </PanelBlock>
  </div>
  <div class="hidden max-sm:block text-center p-3">Rotate to landscape</div>
</template>

