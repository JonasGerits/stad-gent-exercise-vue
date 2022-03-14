<template>
  <div class="flex w-full mb-3">
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
    <div class="w-full md:w-80 mr-3">
      <RangeFilterComponent/>
    </div>
    <div class="w-full md:w-80 flex">
      <button class="p-3 bg-red-600 rounded text-white font-bold hover:bg-white hover:text-red-600 hover:border hover:border-red-600"
              v-on:click="resetFilters"
      >
        Verwijder filters
      </button>
    </div>
  </div>
</template>

<style>
div.multiselect {
  height: 100%;
}
div.multiselect-placeholder, div.multiselect-multiple-label {
  overflow: hidden;
  white-space: nowrap;
}
</style>

<script>
import Multiselect from '@vueform/multiselect';
import {useFilterStore} from "@/stores/filterStore";
import LocationSearchComponent from "@/components/search/LocationSearchComponent";
import RangeFilterComponent from "@/components/search/RangeFilterComponent";

let filterStore;

export default {
  components: {
    RangeFilterComponent,
    LocationSearchComponent,
    Multiselect
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
  computed: {
    selectedFunctionsState() {
      return this.filterStore.selectedFunctionsState;
    }
  },
  watch: {
    selectedFunctionsState() {
      this.selectedFunctions = this.filterStore.selectedFunctionsState;
    },
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
    resetFilters() {
      this.filterStore.resetFilters();
    },
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
