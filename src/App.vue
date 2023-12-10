<script setup>
import { RouterView } from 'vue-router'
import HeaderPanel from "@/components/panels/HeaderPanel.vue";
import LocationPanel from "@/components/panels/LocationPanel.vue";
import Panel from "@/components/panels/Panel.vue";
import PlannerPanel from "@/components/panels/PlannerPanel.vue";
import DetailsPanel from "@/components/panels/DetailsPanel.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-3 m-3">
    <HeaderPanel />
    <LocationPanel class="col-span-2" />
    <DetailsPanel class="row-span-2" />

    <PlannerPanel />
    <Panel class="col-span-2">
      <RouterView />
    </Panel>
  </div>
</template>

