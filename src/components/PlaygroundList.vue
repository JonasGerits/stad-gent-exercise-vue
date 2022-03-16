<template>
  <div class="shadow min-w-fit lg:min-w-96">
    <div class="p-3 flex font-bold text-xl shadow">
      <p>{{ totalPlaygrounds }} resultaten gevonden</p>
    </div>
    <ul class="list-none p-0 overflow-auto playground-list">
      <PlaygroundListItem v-for="playground in playgrounds" :key="playground.record.id"
                          v-bind:record="playground.record"></PlaygroundListItem>
    </ul>
    <div class="p-3 flex font-bold text-xl shadow w-full flex justify-center" :class="playgrounds.length < 1 ? 'invisible' : ''">
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
  height: calc(100vh - 282px);
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
      page: 1
    }
  },
  computed: {
    selectedFunctionsStore() {
      return this.filterStore.selectedFunctionsState;
    },
    rangeInKmState() {
      return this.filterStore.rangeInKm;
    },
    locationState() {
      return this.filterStore.location;
    }
  },
  watch: {
    page: async function () {
      await this.searchPlaygrounds();
    },
    selectedFunctionsStore: async function () {
      this.page = 1;

      await this.searchPlaygrounds();
    },
    rangeInKmState: async function () {
      this.page = 1;

      await this.searchPlaygrounds();
    },
    locationState: async function () {
      this.page = 1;

      await this.searchPlaygrounds();
    }
  },
  created() {
    this.searchPlaygrounds();
  },
  methods: {
    async searchPlaygrounds() {
      try {
        const res = await fetch(PlaygroundQueryBuilderUtil.getQuery(this.filterStore.selectedFunctionsState, this.page, this.filterStore.location, this.filterStore.rangeInKm));
        const jsonRes = await res.json();
        this.totalPlaygrounds = jsonRes.total_count;
        this.playgrounds = jsonRes.records;
        playgroundStore.$patch({
          playgrounds: this.playgrounds
        });
      } catch(error) {

      }
    }
  }
}
</script>