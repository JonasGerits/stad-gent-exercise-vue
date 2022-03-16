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
import {useFilterStore} from "@/stores/filter-store";
import {usePlaygroundStore} from "@/stores/playground-store";
import * as FunctionsService from "@/services/functions-service";

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
  async created() {
    this.functions = await FunctionsService.getUniqueFunctions();
  },
  methods: {
    getMultipleLabel() {
      return `${this.selectedFunctions.length} geselecteerde ${this.selectedFunctions.length > 1 ? 'functies' : 'functie'}`
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
