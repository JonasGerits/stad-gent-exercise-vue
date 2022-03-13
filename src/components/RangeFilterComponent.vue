<template>
  <div class="flex justify-center items-center h-full w-full">
    <vue3-slider v-model="rangeInKm"
                 color="#374151"
                 track-color="#dee2e6"
                 :min="1"
                 :max="15"
                 :tooltip="true"
                 :tooltipText="`%v km`"
    />
  </div>
</template>

<style>
div.vue3-slider {
  margin-right: 0.75rem;
}
div.vue3-slider div.tooltip {
  display: flex !important;
}
div.vue3-slider div.handle {
  transform: scale(1.35);
  height: 12px;
  width: 12px;
  top: -3px;
  background: white;
  border: 1px solid #374151 !important;
}
</style>

<script>
import slider from "vue3-slider"
import {useFilterStore} from "@/stores/filterStore";

let filterStore;

export default {
  components: {
    "vue3-slider": slider
  },
  setup() {
    filterStore = useFilterStore();

    return {
      filterStore: filterStore,
    }
  },
  data() {
    return {
      rangeInKm: 5,
      minRangeInKm: 1,
      maxRangeInKm: 15,
    }
  },
  watch: {
    rangeInKm: function () {
      filterStore.$patch({
        rangeInKm: this.rangeInKm
      });
    }
  },
}
</script>