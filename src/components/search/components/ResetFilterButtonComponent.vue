<template>
  <button class="p-3 bg-red-600 rounded text-white font-bold hover:bg-white hover:text-red-600 hover:border hover:border-red-600"
          v-on:click="resetFilters"
  >
    Verwijder filters
  </button>
</template>

<script>
import {useFilterStore} from "@/stores/filterStore";
import {usePlaygroundStore} from "@/stores/playgroundStore";

let filterStore;
let playgroundStore;

export default {
  setup() {
    filterStore = useFilterStore();
    playgroundStore = usePlaygroundStore();

    return {
      filterStore,
      playgroundStore,
    }
  },
  methods: {
    async resetFilters() {
      this.filterStore.resetFilters();

      await this.playgroundStore.updatePlaygrounds(
          this.filterStore.selectedFunctions,
          this.filterStore.page,
          this.filterStore.location,
          this.filterStore.rangeInKm);
    }
  }
}
</script>
