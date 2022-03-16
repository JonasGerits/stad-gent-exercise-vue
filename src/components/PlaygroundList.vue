<template>
  <div class="shadow min-w-fit lg:min-w-96 flex" :class="playgroundsOpened ? 'flex' : 'hidden'">
    <div class="flex flex-col w-full">
      <div class="p-3 flex font-bold text-xl shadow">
        <p>{{ totalPlaygrounds }} resultaten gevonden</p>
      </div>
      <ul class="list-none p-0 overflow-auto playground-list">
        <PlaygroundListItem v-for="playground in playgrounds" :key="playground.record.id"
                            v-bind:record="playground.record"></PlaygroundListItem>
      </ul>
      <div class="p-3 flex font-bold text-xl shadow w-full flex justify-center"
           :class="playgrounds.length < 1 ? 'invisible' : ''">
        <PlaygroundPagination v-bind:total-playgrounds="totalPlaygrounds"/>
      </div>
    </div>
    <div class="flex px-2 rounded open-list-wrapper md:hidden">
      <button v-on:click="togglePlaygrounds" class="w-fit md:hidden open-list">
        <BootstrapIcon
            icon="arrow-left"
            size="2x"
        />
      </button>
    </div>
  </div>
</template>

<style>
ul.playground-list {
  height: calc(100vh - 282px);
}

div.open-list-wrapper {
  background-color: #374151;
}

button.open-list {
  color: white;
}
</style>

<script>
import PlaygroundListItem from "@/components/PlaygroundListItem";
import PlaygroundPagination from "@/components/PlaygroundPagination";
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';
import {useFilterStore} from "@/stores/filter-store";
import {usePlaygroundStore} from "@/stores/playground-store";
import {useMobileViewStore} from "@/stores/mobile-view-store";

let playgroundStore;
let filterStore;
let mobileViewStore;

export default {
  components: {
    PlaygroundPagination,
    PlaygroundListItem,
    BootstrapIcon
  },
  setup() {
    filterStore = useFilterStore();
    playgroundStore = usePlaygroundStore();
    mobileViewStore = useMobileViewStore();

    return {
      filterStore,
      playgroundStore,
      mobileViewStore
    }
  },
  data() {
    return {
      playgrounds: [],
      totalPlaygrounds: 0,
      playgroundsOpened: true
    }
  },
  computed: {
    playgroundsState() {
      return this.playgroundStore.playgrounds;
    },
    totalPlaygroundsState() {
      return this.playgroundStore.totalPlaygrounds;
    },
    playgroundsOpenedState() {
      return this.mobileViewStore.playgroundsOpened;
    }
  },
  watch: {
    playgroundsState: function () {
      this.playgrounds = this.playgroundStore.playgrounds;
    },
    totalPlaygroundsState() {
      this.totalPlaygrounds = this.playgroundStore.totalPlaygrounds;
    },
    playgroundsOpenedState() {
      this.playgroundsOpened = this.mobileViewStore.playgroundsOpened;
    }
  },
  created() {
    this.playgroundStore.updatePlaygrounds(this.filterStore.selectedFunctions, this.page, this.filterStore.location, this.filterStore.rangeInKm);
  },
  methods: {
    togglePlaygrounds() {
      this.mobileViewStore.togglePlaygroundsOpened();
    }
  }
}
</script>