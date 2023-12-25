<script setup>
import PanelBlock from "@/components/Panels/PanelBlock.vue";

import { usePassportStore } from "@/stores/stats/passport";
import { usePhysicalStore } from "@/stores/stats/physical";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { useSocialStore } from "@/stores/stats/social";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";
import StatBalanceFill from "@/components/StatBalanceFill.vue";
import {useCardiovascular} from "@/stores/stats/cardiovascular";

const passport = usePassportStore();
const physical = usePhysicalStore();
const nutrition = useNutritionStore();
const social = useSocialStore();
const cardiovascular = useCardiovascular()
</script>

<template>
  <PanelBlock>
    <div class="grid gap-3 text-sm">
      <div>
        <StatValue title="Age" :now="passport.age" />
      </div>
      <div class="flex flex-col gap-3">
        <StatBalance title="Physical" title-min="Tired" title-max="Lazy" v-bind="physical.energy" />
        <StatBalanceFill title="Nutrition" v-bind="nutrition.energy" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col items-center">
          <span>Social</span>
          <div class="w-full">
            <StatValue title="Construction" :now="social.construction.now" />
            <StatValue title="Destruction" :now="social.destruction.now" />
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span>Cardiovascular</span>
          <div class="w-full">
            <StatValue title="Health" format="percent" :now="cardiovascular.health.now / cardiovascular.health.max" />
            <StatValue title="Health" :now="cardiovascular.health.now" />
            <StatValue title="Health Loss" class="text-red-200" :now="cardiovascular.health.loss" />
            <StatValue title="Health Gain" class="text-green-200" :now="cardiovascular.health.gain" />
            <StatValue title="Health Lifetime" format="percent" :now="cardiovascular.healthLifetime.now / cardiovascular.healthLifetime.max" />
            <StatValue title="Health Lifetime" :now="cardiovascular.healthLifetime.now" />
            <StatValue title="Health Lifetime Loss" class="text-red-200" :now="cardiovascular.healthLifetime.loss" />
          </div>
        </div>
      </div>
    </div>
  </PanelBlock>
</template>
