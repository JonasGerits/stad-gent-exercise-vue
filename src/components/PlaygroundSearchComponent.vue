<template>
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
</template>

<style>
  div.multiselect-placeholder, div.multiselect-multiple-label {
    overflow: hidden;
    white-space: nowrap;
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
