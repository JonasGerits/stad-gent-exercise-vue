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
      <PlaygroundPagination v-bind:total-playgrounds="totalPlaygrounds" />
    </div>
  </div>
</template>

<style>
ul.playground-list {
  height: calc(100vh - 282px);
}
</style>

<script>
import PlaygroundListItem from "@/components/PlaygroundListItem";
import PlaygroundPagination from "@/components/PlaygroundPagination";
import {useFilterStore} from "@/stores/filterStore";
import {usePlaygroundStore} from "@/stores/playgroundStore";

let playgroundStore;
let filterStore;

export default {
  components: {
    PlaygroundPagination,
    PlaygroundListItem,
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
    }
  },
  computed: {
    playgroundsState() {
      return this.playgroundStore.playgrounds;
    },
    totalPlaygroundsState() {
      return this.playgroundStore.totalPlaygrounds;
    }
  },
  watch: {
    playgroundsState: function () {
      this.playgrounds = this.playgroundStore.playgrounds;
    },
    totalPlaygroundsState() {
      this.totalPlaygrounds = this.playgroundStore.totalPlaygrounds;
    }
  },
  created() {
    this.playgroundStore.updatePlaygrounds(this.filterStore.selectedFunctions, this.page, this.filterStore.location, this.filterStore.rangeInKm);
  },
}
</script>