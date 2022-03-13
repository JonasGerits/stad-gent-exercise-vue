<template>
  <div class="flex w-full">
    <div class="w-full md:w-80 mr-3">
      <GMapAutocomplete
          placeholder="Geef een adres in ... "
          @place_changed="updateLocation"
      >
      </GMapAutocomplete>
    </div>
    <div class="w-full md:w-80">
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
  </div>
</template>

<style>
  div.multiselect-placeholder, div.multiselect-multiple-label {
    overflow: hidden;
    white-space: nowrap;
  }

  input.pac-target-input {
    width: 100%;
    height: 100%;
    padding: 8px;
    border: var(--ms-border-width,1px) solid var(--ms-border-color,#d1d5db);
    border-radius: var(--ms-radius,4px);
  }
</style>

<script>
import Multiselect from '@vueform/multiselect';
import {useFilterStore} from "@/stores/filterStore";

let filterStore;

export default {
  components: {
    Multiselect,
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
      loading: false
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
    updateLocation($event) {
      console.log('addresss changed', $event?.geometry?.location.lat());
      console.log('addresss changed', $event?.geometry?.location.lng());
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
