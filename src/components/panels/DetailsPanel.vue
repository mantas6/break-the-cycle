<script setup>
import PanelBlock from "@/components/Panels/PanelBlock.vue";

import { usePassportStore } from "@/stores/stats/passport";
import { usePhysicalStore } from "@/stores/stats/physical";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { useSocialStore } from "@/stores/stats/social";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";
import StatBalanceFill from "@/components/StatBalanceFill.vue";

const passport = usePassportStore();
const physical = usePhysicalStore();
const nutrition = useNutritionStore();
const social = useSocialStore();
</script>

<template>
  <PanelBlock>
    <div class="grid gap-3">
      <div>
        <StatValue title="Age" :now="passport.age" />
      </div>
      <div class="flex flex-col gap-3">
        <StatBalance title="Physical" title-min="Tired" title-max="Lazy" v-bind="physical.energy" />
        <StatBalanceFill title="Nutrition" v-bind="nutrition.energy" />
      </div>
      <div class="grid grid-cols-2">
        <div class="flex flex-col items-center">
          <span>Social</span>
          <div class="w-full">
            <StatValue title="Construction" :now="social.construction.now" />
            <StatValue title="Destruction" :now="social.destruction.now" />
          </div>
        </div>
      </div>
    </div>
  </PanelBlock>
</template>
