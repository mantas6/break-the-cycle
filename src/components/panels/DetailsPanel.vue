<script setup>
import { ScaleIcon, CogIcon, HeartIcon } from '@heroicons/vue/16/solid'
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
          <span class="flex gap-1"><ScaleIcon class="w-4" />Social</span>
          <div class="flex w-full justify-between">
            <StatValue class="flex-col" title="Construction" :item="social.construction" />
            <StatValue class="flex-col" title="Destruction" :item="social.destruction" />
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="flex gap-1"><CogIcon class="w-4" /> Digestive</span>
          <div>
            <StatValue format="percent" :item="digestive.health">
              <template #title>
                <HeartIcon class="text-green-300 w-4" />
              </template>
            </StatValue>
            <StatValue format="percent" :item="digestive.healthLifetime" :diff-low="0.01" :diff-high="0.5">
              <template #title>
                <HeartIcon class="text-red-300 w-4" />
              </template>
            </StatValue>
          </div>
        </div>
      </div>
    </div>
  </PanelBlock>
</template>
