<template>
  <GMapMap
      style="width: 100%; height: 100%"
      :center="position"
      :zoom="15"
  >
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
import {useLocationStore} from "@/stores/locationStore";

const GENT_COORDINATES = { lat: 51.053581, lng: 3.722969 };
let playgroundStore;
let locationStore;

export default {
  setup() {
    playgroundStore = usePlaygroundStore();
    locationStore = useLocationStore();

    return {
      playgroundStore,
      locationStore
    }
  },
  data() {
    return {
      errorStr: undefined,
      position: GENT_COORDINATES,
      markerPositions: []
    }
  },
  computed: {
    playgroundStoreState() {
      return this.playgroundStore.playgrounds;
    },
    locationStoreState() {
      return this.locationStore.location;
    }
  },
  watch: {
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
    locationStoreState: function () {
      this.position = this.locationStore.location;
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
}
</script>