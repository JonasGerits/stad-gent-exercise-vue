<template>
  <GoogleMap
      api-key="AIzaSyDa2fYoG3eOYOwbBr6My6Frxc6TpZU8AuE"
      style="width: 100%; height: 100%"
      :center="position"
      :zoom="15"
  >
    <Marker :options="{ position: position }" />
  </GoogleMap>
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'

const GENT_COORDINATES = { lat: 51.053581, lng: 3.722969 };

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      errorStr: undefined,
      position: GENT_COORDINATES,
    }
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
  }
}
</script>