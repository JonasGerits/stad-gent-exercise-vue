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
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
}
</style>

<script>
import {useFilterStore} from "@/stores/filterStore";

let filterStore;

export default {
  setup() {
    filterStore = useFilterStore();

    return {
      filterStore: filterStore,
    }
  },
  data() {
    return {
      location: {}
    }
  },
  computed: {
    locationState() {
      return this.filterStore.location;
    }
  },
  watch: {
    locationState() {
      this.location = this.filterStore.location;
    },
    location: function () {
      filterStore.$patch({
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