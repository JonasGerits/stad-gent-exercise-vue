<template>
  <div class="shadow min-w-fit">
    <div class="p-3 flex font-bold text-xl shadow">
      <p>{{totalPlaygrounds}} resultaten gevonden</p>
    </div>
    <ul class="list-none p-0 overflow-auto playground-list">
      <PlaygroundListItem v-for="playground in playgrounds" :key="playground.record.id" v-bind:record="playground.record"></PlaygroundListItem>
    </ul>
    <div class="p-3 flex font-bold text-xl shadow w-full flex justify-center">
      <v-pagination
          v-model="page"
          :pages="Math.ceil(totalPlaygrounds / 10)"
          :range-size="1"
          active-color="#374151"
      />
    </div>
  </div>
</template>

<style>
ul.playground-list {
  max-height: calc(100vh - 282px);
}

ul.Pagination button {
  font-size: 16px;
}

button.Page-active {
  color: white;
  font-weight: 900;
}
</style>

<script>
import PlaygroundListItem from "@/components/PlaygroundListItem";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {useFilterStore} from "@/stores/filterStore";
import {usePlaygroundStore} from "@/stores/playgroundStore";

import * as PlaygroundQueryBuilderUtil from "@/utils/PlaygroundQueryBuilderUtil";

let playgroundStore;
let filterStore;

export default {
  components: {
    PlaygroundListItem,
    VPagination
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
      playgrounds: [],
      totalPlaygrounds: 0,
      loading: false,
      page: 1
    }
  },
  computed: {
    selectedFunctionsStore() {
      return this.filterStore.selectedFunctionsState;
    }
  },
  watch: {
    page: async function () {
      this.loading = true;
      try {
        const res = await fetch(PlaygroundQueryBuilderUtil.getQuery(this.filterStore.selectedFunctionsState, this.page));
        const jsonRes = await res.json();
        this.totalPlaygrounds = jsonRes.total_count;
        this.playgrounds = jsonRes.records;
        playgroundStore.$patch({
          playgrounds: this.playgrounds
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Error! Could not reach the API. ' + error
      }
    },
    selectedFunctionsStore: async function () {
      this.loading = true;
      this.page = 1;
      try {
        const res = await fetch(PlaygroundQueryBuilderUtil.getQuery(this.filterStore.selectedFunctionsState, this.page));
        const jsonRes = await res.json();
        this.totalPlaygrounds = jsonRes.total_count;
        this.playgrounds = jsonRes.records;
        playgroundStore.$patch({
          playgrounds: this.playgrounds
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Error! Could not reach the API. ' + error
      }
    },
  },
  created() {
    this.initPlaygrounds();
  },
  methods: {
    async initPlaygrounds() {
      this.loading = true;
      try {
        const res = await fetch(PlaygroundQueryBuilderUtil.getQuery(this.filterStore.selectedFunctionsState, this.page));
        const jsonRes = await res.json();
        this.playgrounds = jsonRes.records;
        this.totalPlaygrounds = jsonRes.total_count;
        playgroundStore.$patch({
          playgrounds: this.playgrounds
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = 'Error! Could not reach the API. ' + error
      }
    },
  }
}
</script>