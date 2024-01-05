<script setup>
import { ScaleIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/vue/16/solid'
import PanelBlock from "@/components/panels/PanelBlock.vue";

import { usePhysicalStore } from "@/stores/stats/physical";
import { useNutritionStore } from "@/stores/stats/nutrition";
import { useSocialStore } from "@/stores/stats/social";
import StatValue from "@/components/StatValue.vue";
import StatBalance from "@/components/StatBalance.vue";
import StatBalanceFill from "@/components/StatBalanceFill.vue";
import {useDigestiveStore} from "@/stores/stats/digestive.js";
import {useCardiovascularStore} from "@/stores/stats/cardiovascular.js";
import {useUnlockStore} from "@/stores/unlock.js";
import {useIntellectStore} from "@/stores/stats/intellect.js";
import {useNeuronalStore} from "@/stores/stats/neuronal.js";
import {useRespiratoryStore} from "@/stores/stats/respiratory.js";
import {useReproductiveStore} from "@/stores/stats/reproductive.js";

const physical = usePhysicalStore();
const nutrition = useNutritionStore();
const social = useSocialStore();

const neuronal = useNeuronalStore();

const digestive = useDigestiveStore();
const cardiovascular = useCardiovascularStore();
const respiratory = useRespiratoryStore();

const reproductive = useReproductiveStore()

const unlock = useUnlockStore();
const intellect = useIntellectStore();
</script>

<template>
  <PanelBlock>
    <div class="grid gap-3 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <StatValue v-if="intellect.education.now > 0" title="Education" :item="intellect.education" />
      </div>
      <div class="flex flex-col gap-3">
        <StatBalance v-if="unlock.physical" title="Physical" title-min="Tired" title-max="Lazy" v-bind="physical.energy" />
        <StatBalanceFill v-if="unlock.nutrition" title="Nutrition" v-bind="nutrition.energy" borders />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <StatBalanceFill v-bind="cardiovascular.health" title="Cardio." bar-color="bg-green-400" />
        <StatBalanceFill v-bind="respiratory.health" title="Resp." bar-color="bg-green-400" />
        <StatBalanceFill v-bind="digestive.health" title="Digest." bar-color="bg-green-400" />
        <StatBalanceFill v-bind="neuronal.health" title="Neuro." bar-color="bg-green-400" />
        <StatBalanceFill v-bind="reproductive.health" title="Reprod." bar-color="bg-green-400" />
      </div>
      <div class="flex flex-col items-center">
        <span class="flex gap-1 font-medium"><ScaleIcon class="w-4" />Social</span>
        <div class="flex gap-2">
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
    </div>
  </PanelBlock>
</template>
