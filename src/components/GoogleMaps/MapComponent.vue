<template>
  <GoogleMap
      api-key="AIzaSyDa2fYoG3eOYOwbBr6My6Frxc6TpZU8AuE"
      style="width: 100%; height: 100%"
      :center="position"
      :zoom="15"
  >
    <Marker v-for="marker in markerPositions" :key="marker" :options="{ position: marker }" />
  </GoogleMap>
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'
import {usePlaygroundStore} from "@/stores/playgroundStore";

const GENT_COORDINATES = { lat: 51.053581, lng: 3.722969 };
let playgroundStore;

export default {
  components: { GoogleMap, Marker },
  setup() {
    playgroundStore = usePlaygroundStore();

    return {
      playgroundStore
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
    }
  },
  watch: {
    playgroundStoreState: function () {
      this.markerPositions = [];
      this.playgroundStore.playgrounds.map(playground => {
        const coords = playground.record.fields['geo_point_2d'];

        this.markerPositions.push(
            {
              lng: coords.lon,
              lat: coords.lat
            }
        );
      });
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
    })
  },
}
</script>