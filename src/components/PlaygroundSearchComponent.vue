<template>
  <div class="flex w-full">
    <div class="w-full md:w-80 mr-3">
      <LocationSearchComponent></LocationSearchComponent>
    </div>
    <div class="w-full md:w-80 mr-3">
      <Multiselect
          v-model="selectedFunctions"
          :options="functions"
          loading="loading"
          :searchable="true"
          mode="multiple"
          placeholder="Kies een functie..."
          :hideSelected="false"
          :multipleLabel="getMultipleLabel"
      />
    </div>
    <div class="w-full md:w-80">
      <div class="flex justify-center items-center h-full w-full">
        <vue3-slider v-model="rangeInKm"
                     color="#374151"
                     track-color="#dee2e6"
                     :min="1"
                     :max="15"
                     :tooltip="true"
                     :tooltipText="`${rangeInKm} km`"
        />
      </div>
    </div>
  </div>
</template>

<style>
  div.multiselect-placeholder, div.multiselect-multiple-label {
    overflow: hidden;
    white-space: nowrap;
  }
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
import Multiselect from '@vueform/multiselect';
import {useFilterStore} from "@/stores/filterStore";
import LocationSearchComponent from "@/components/LocationSearchComponent";
import slider from "vue3-slider"

let filterStore;

export default {
  components: {
    LocationSearchComponent,
    Multiselect,
    "vue3-slider": slider
  },
  setup() {
    filterStore = useFilterStore();

    return {
      filterStore,
    }
  },
  data() {
    return {
      functions: [],
      selectedFunctions: [],
      loading: false,
      rangeInKm: 5,
      minRangeInKm: 1,
      maxRangeInKm: 15
    }
  },
  watch: {
    selectedFunctions: function () {
      filterStore.$patch({
        selectedFunctionsState: this.selectedFunctions
      });
    }
  },
  created() {
    this.initPlaygroundFunctions();
  },
  methods: {
    getMultipleLabel() {
      return `${this.selectedFunctions.length} geselecteerde ${this.selectedFunctions.length > 1 ? 'functies' : 'functie'}`
    },
    async initPlaygroundFunctions() {
      this.loading = true;

      const res = await fetch('https://data.stad.gent/api/v2/catalog/datasets/speelterreinen-gent/aggregates?select=&group_by=functies');
      await res.json().then(response => {
        let uniqueFunctions = [];
        response.aggregations.map(aggregation => {
          let aggregationFunctions = aggregation.functies.split(',');

          aggregationFunctions.map(playgroundFuntion => {
            let trimmedPlaygroundFunction = playgroundFuntion.trim();

            if (!uniqueFunctions.includes(trimmedPlaygroundFunction)) {
              uniqueFunctions.push(trimmedPlaygroundFunction);
            }
          });
        });

        this.functions = uniqueFunctions;
        this.loading = false;
      });
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
