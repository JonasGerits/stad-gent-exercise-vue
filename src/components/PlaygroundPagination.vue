<template>
      <v-pagination
          v-model="page"
          :pages="Math.ceil(totalPlaygrounds / 10)"
          :range-size="1"
          active-color="#374151"
      />
</template>

<style>
ul.Pagination button {
  font-size: 16px;
}

button.Page-active {
  color: white;
  font-weight: 900;
}
</style>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {useFilterStore} from "@/stores/filterStore";
import {usePlaygroundStore} from "@/stores/playgroundStore";

let playgroundStore;
let filterStore;

export default {
  components: {
    VPagination
  },
  props: ['totalPlaygrounds'],
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
      page: 1
    }
  },
  computed: {
    pageState() {
      return this.filterStore.page;
    },
    totalPlaygroundsState() {
      return this.playgroundStore.totalPlaygrounds;
    }
  },
  watch: {
    pageState() {
      this.page = this.filterStore.page;
    },
    totalPlaygroundsState() {
      this.page = 1;
    },
    page: function () {
      filterStore.$patch({
        page: this.page
      });
      this.playgroundStore.updatePlaygrounds(this.filterStore.selectedFunctions, this.page, this.filterStore.location, this.filterStore.rangeInKm);
    },
  }
}
</script>