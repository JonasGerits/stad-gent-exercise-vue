<template>
  <GMapAutocomplete
      placeholder="Geef een adres in ... "
      @place_changed="updateLocation"
  >
  </GMapAutocomplete>
</template>

<style>
  input.pac-target-input {
    width: 100%;
    height: 100%;
    padding: 8px;
    border: var(--ms-border-width,1px) solid var(--ms-border-color,#d1d5db);
    border-radius: var(--ms-radius,4px);
  }
</style>

<script>
import {useLocationStore} from "@/stores/locationStore";

let locationStore;

export default {
  setup() {
    locationStore = useLocationStore();

    return {
      locationStore: locationStore,
    }
  },
  data() {
    return {
      location: {}
    }
  },
  watch: {
    location: function () {
      locationStore.$patch({
        location: this.location
      });
    }
  },
  methods: {
    updateLocation($event) {
      this.location = {
        lat: $event?.geometry?.location.lat(),
        lng: $event?.geometry?.location.lng(),
      }
    }
  }
}
</script>