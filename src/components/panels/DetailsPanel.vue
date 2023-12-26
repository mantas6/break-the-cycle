<script setup>
import { ScaleIcon } from '@heroicons/vue/16/solid'
import PanelBlock from "@/components/Panels/PanelBlock.vue";

import { usePassportStore } from "@/stores/stats/passport";
import { usePhysicalStore } from "@/stores/stats/physical";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { useSocialStore } from "@/stores/stats/social";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";
import StatBalanceFill from "@/components/StatBalanceFill.vue";
import {useDigestiveStore} from "@/stores/stats/digestive.js";

const passport = usePassportStore();
const physical = usePhysicalStore();
const nutrition = useNutritionStore();
const social = useSocialStore();
const digestive = useDigestiveStore()
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
          <span class="flex"><ScaleIcon class="w-4" />Social</span>
          <div class="flex w-full justify-between">
            <StatValue class="flex-col" title="Construction" :now="social.construction.now" />
            <StatValue class="flex-col" title="Destruction" :now="social.destruction.now" />
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span>Digestive</span>
          <div class="w-full">
            <StatValue title="Health" format="percent" :now="digestive.health.now / digestive.health.max" />
            <StatValue title="Health" :now="digestive.health.now" />
            <StatValue title="Health Loss" class="text-red-200" :now="digestive.health.loss" />
            <StatValue title="Health Gain" class="text-green-200" :now="digestive.health.gain" />
            <StatValue title="Health Lifetime" format="percent" :now="digestive.healthLifetime.now / digestive.healthLifetime.max" />
            <StatValue title="Health Lifetime" :now="digestive.healthLifetime.now" />
            <StatValue title="Health Lifetime Loss" class="text-red-200" :now="digestive.healthLifetime.loss" />
          </div>
        </div>
      </div>
    </div>
  </PanelBlock>
</template>
