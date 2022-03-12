<template>
  <div>
    <div v-if="errorStr">
      Sorry, but the following error
      occurred: {{errorStr}}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="lng">
      Your location data is {{ lat }}, {{ lng }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gettingLocation: false,
      errorStr:null,
      lng: 0,
      lat: 0
    }
  },
  created() {
    if(!("geolocation" in navigator)) {
      this.errorStr = 'Geolocation is not available.';
      return;
    }

    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false;
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }, err => {
      this.gettingLocation = false;
      this.errorStr = err.message;
    })
  }
}
</script>