<template>
  <button class="p-3 bg-red-600 rounded text-white font-bold hover:bg-white hover:text-red-600 hover:border hover:border-red-600"
          v-on:click="resetFilters"
  >
    Verwijder filters
  </button>
</template>

<script>
import {useFilterStore} from "@/stores/filterStore";

let filterStore;

export default {
  setup() {
    filterStore = useFilterStore();

    return {
      filterStore,
    }
  },
  methods: {
    resetFilters() {
      this.filterStore.resetFilters();
    }
  }
}
</script>
