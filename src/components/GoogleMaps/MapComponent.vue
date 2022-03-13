<template>
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
</template>

<style>
div.vue-map-container {
  height: 100%;
  width: 100%;
}
</style>
<script>
import {usePlaygroundStore} from "@/stores/playgroundStore";
import {useFilterStore} from "@/stores/filterStore";

const GENT_COORDINATES = { lat: 51.053581, lng: 3.722969 };
let playgroundStore;
let filterStore;

export default {
  setup() {
    playgroundStore = usePlaygroundStore();
    filterStore = useFilterStore();

    return {
      playgroundStore,
      filterStore: filterStore
    }
  },
  data() {
    return {
      errorStr: undefined,
      position: GENT_COORDINATES,
      rangeInKm: 5,
      markerPositions: [],
      zoom: 12
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
    }
  },
  watch: {
    position: function () {
      filterStore.$patch({
        location: this.position
      });
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
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      this.position = { lat: pos.coords.latitude, lng: pos.coords.longitude};
    }, err => {
      this.errorStr = err.message;
    });
  },
  methods: {
    calculateZoom() {
      if(this.rangeInKm === 1) {
        return 15;
      }
      if(this.rangeInKm <= 2) {
        return 14;
      }
      if(this.rangeInKm <= 4) {
        return 13;
      }
      if (this.rangeInKm <= 8) {
        return 12;
      }
      if(this.rangeInKm <= 15) {
        return 11;
      }
    }
  }
}
</script>