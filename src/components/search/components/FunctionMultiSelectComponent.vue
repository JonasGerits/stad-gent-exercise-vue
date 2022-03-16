<template>
  <Multiselect
      v-model="selectedFunctions"
      :options="functions"
      :searchable="true"
      mode="multiple"
      placeholder="Kies een functie..."
      :hideSelected="false"
      :multipleLabel="getMultipleLabel"
  />
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
import {usePlaygroundStore} from "@/stores/playgroundStore";

let filterStore;
let playgroundStore;

export default {
  components: {
    Multiselect
  },
  setup() {
    filterStore = useFilterStore();
    playgroundStore = usePlaygroundStore();

    return {
      filterStore,
      playgroundStore
    }
  },
  data() {
    return {
      functions: [],
      selectedFunctions: [],
      loading: false,
    }
  },
  computed: {
    selectedFunctionsState() {
      return this.filterStore.selectedFunctions;
    }
  },
  watch: {
    selectedFunctionsState() {
      this.selectedFunctions = this.filterStore.selectedFunctions;
    },
    selectedFunctions: async function () {
      filterStore.$patch({
        selectedFunctions: this.selectedFunctions
      });

      await this.playgroundStore.updatePlaygrounds(
          this.filterStore.selectedFunctions,
          this.filterStore.page,
          this.filterStore.location,
          this.filterStore.rangeInKm);
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
