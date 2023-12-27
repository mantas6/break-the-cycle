<script setup>
import { ScaleIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/vue/16/solid'
import PanelBlock from "@/components/panels/PanelBlock.vue";

import { usePassportStore } from "@/stores/stats/passport";
import { usePhysicalStore } from "@/stores/stats/physical";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { useSocialStore } from "@/stores/stats/social";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";
import StatBalanceFill from "@/components/StatBalanceFill.vue";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import HealthStatDetail from "@/components/details/HealthStatDetail.vue";
import {useCardiovascular} from "@/stores/stats/cardiovascular.js";
import {useUnlockStore} from "@/stores/unlock.js";

const passport = usePassportStore();
const physical = usePhysicalStore();
const nutrition = useNutritionStore();
const social = useSocialStore();
const digestive = useDigestiveStore();
const cardiovascular = useCardiovascular();
const unlock = useUnlockStore();
</script>

<template>
  <PanelBlock>
    <div class="grid gap-3 text-sm">
      <div>
        <StatValue title="Age" :now="passport.age" />
      </div>
      <div class="flex flex-col gap-3">
        <StatBalance v-if="unlock.physical" title="Physical" title-min="Tired" title-max="Lazy" v-bind="physical.energy" />
        <StatBalanceFill title="Nutrition" v-bind="nutrition.energy" />
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div class="flex flex-col items-center">
          <span class="flex gap-1"><ScaleIcon class="w-4" />Social</span>
          <div>
            <StatValue title="Construction" :item="social.construction">
              <template #title>
                <HandThumbUpIcon class="text-green-200 w-4" />
              </template>
            </StatValue>
            <StatValue :item="social.destruction">
              <template #title>
                <HandThumbDownIcon class="text-red-200 w-4" />
              </template>
            </StatValue>
          </div>
        </div>
        <HealthStatDetail title="Digestive" :stat="digestive" />
        <HealthStatDetail title="Cardio" :stat="cardiovascular" />
      </div>
    </div>
  </PanelBlock>
</template>
