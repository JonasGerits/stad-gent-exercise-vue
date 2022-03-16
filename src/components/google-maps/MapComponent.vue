<template>
  <div class="flex w-full h-full mb-3 md:flex" :class="playgroundsOpened ? 'hidden' : 'flex'">
    <div class="close-map-wrapper">
      <button v-on:click="togglePlaygrounds()" class="w-full h-full md:hidden open-results text-white px-2">
        <BootstrapIcon
            icon="arrow-right"
            size="2x"
        />
      </button>
    </div>
    <div class="w-full h-full">
      <GMapMap
          style="width: 100%; height: 100%"
          :center="position"
          :zoom="zoom"
      >
        <GMapCircle
            :radius="rangeInKm * 1000"
            :center="position"
        />
        <GMapMarker
            :key="index"
            :position="m.position"
            v-for="(m, index) in markerPositions"
        />
      </GMapMap>
    </div>
  </div>
</template>

<style>
div.vue-map-container {
  height: 100%;
  width: 100%;
}

button.open-results {
  background-color: #374151;
}


div.close-map-wrapper {
  background-color: #374151;
}

button.close-map {
  color: white;
}
</style>
<script>
import {usePlaygroundStore} from "@/stores/playground-store";
import {useFilterStore} from "@/stores/filter-store";
import {useMobileViewStore} from "@/stores/mobile-view-store";

const GENT_COORDINATES = {lat: 51.053581, lng: 3.722969};
let playgroundStore;
let filterStore;
let mobileViewStore;

export default {
  setup() {
    playgroundStore = usePlaygroundStore();
    filterStore = useFilterStore();
    mobileViewStore = useMobileViewStore();

    return {
      playgroundStore,
      filterStore,
      mobileViewStore
    }
  },
  data() {
    return {
      errorStr: undefined,
      gpsLocation: undefined,
      position: GENT_COORDINATES,
      rangeInKm: 5,
      markerPositions: [],
      zoom: 12,
      playgroundsOpened: true
    }
  },
  computed: {
    playgroundStoreState() {
      return this.playgroundStore.playgrounds;
    },
    locationState() {
      return this.filterStore.location;
    },
    rangeInKmState() {
      return this.filterStore.rangeInKm;
    },
    selectedPlaygroundState() {
      return this.playgroundStore.selectedPlayground.id;
    },
    playgroundsOpenedState() {
      return this.mobileViewStore.playgroundsOpened;
    }
  },
  watch: {
    playgroundsOpenedState: function() {
      this.playgroundsOpened = this.mobileViewStore.playgroundsOpened;
    },
    gpsLocation: function () {
      filterStore.$patch({
        location: this.gpsLocation
      });
    },
    selectedPlaygroundState: function(){
      if (this.playgroundStore.selectedPlayground.id) {
        this.position = this.playgroundStore.selectedPlayground;
        this.zoom = 18;
      } else {
        this.position = this.filterStore.location;
        this.zoom = this.calculateZoom();
      }
    },
    playgroundStoreState: function () {
      this.markerPositions = [];
      this.playgroundStore.playgrounds.map(playground => {
        const coords = playground.record.fields['geo_point_2d'];

        this.markerPositions.push(
            {
              position: {
                lng: coords.lon,
                lat: coords.lat
              }
            }
        );
      });
    },
    locationState: function () {
      this.position = this.filterStore.location;
    },
    rangeInKmState: function () {
      this.rangeInKm = this.filterStore.rangeInKm;
      this.zoom = this.calculateZoom();
    },
  },
  created() {
    if (!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      this.gpsLocation = {lat: pos.coords.latitude, lng: pos.coords.longitude};
    }, err => {
      this.errorStr = err.message;
    });
  },
  methods: {
    togglePlaygrounds() {
      this.mobileViewStore.togglePlaygroundsOpened();
    },
    calculateZoom() {
      if (this.rangeInKm === 1) {
        return 15;
      }
      if (this.rangeInKm <= 2) {
        return 14;
      }
      if (this.rangeInKm <= 4) {
        return 13;
      }
      if (this.rangeInKm <= 8) {
        return 12;
      }
      if (this.rangeInKm <= 15) {
        return 11;
      }
    }
  }
}
</script>