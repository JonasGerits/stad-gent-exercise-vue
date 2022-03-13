<template>
 <li class="overflow-hidden border-b-2 min-w-fit cursor-pointer" :class="record.id === selectedPlaygroundId ? 'active' :''" v-on:click="selectPlayground(record)">
   <div class="flex gap-4 p-3">
     <div class="md:w-32 lg:w-48 flex items-center hidden md:block">
       <div class="w-full md:h-32 lg:h-40 h-40">
         <img src="../assets/playground-stock-photo.png" class="w-full h-full object-cover rounded-lg">
       </div>
     </div>
     <div class="flex flex-col justify-center items-start w-60">
       <div class="font-bold text-xl text-left ">{{record.fields.naam}}</div>
       <div class="mb-3 text-sm">{{record.size}} m²</div>
       <div class="flex flex-wrap">
         <span v-for="playgroundFunction in playgroundFunctions" :key="playgroundFunction" class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{{playgroundFunction}}</span>
       </div>
     </div>
   </div>
 </li>
</template>

<style>
li.active {
  background-color: #dee2e6;
}
</style>

<script>
import {usePlaygroundStore} from "@/stores/playgroundStore";

let playgroundStore;

export default {
  setup() {
    playgroundStore = usePlaygroundStore();

    return {
      playgroundStore: playgroundStore,
    }
  },
  data() {
    return {
      playgroundFunctions: [],
      selectedPlaygroundId: 0
    }
  },
  props: ['record'],
  created() {
    this.playgroundFunctions = this.record?.fields?.functies?.split(',');
  },
  computed: {
    selectedPlaygroundState() {
      return this.playgroundStore.selectedPlayground.id;
    }
  },
  watch: {
    selectedPlaygroundState: function() {
      this.selectedPlaygroundId = this.playgroundStore.selectedPlayground.id;
    },
  },
  methods: {
    selectPlayground(playground) {
      const playgroundCoords = playground.fields.geo_point_2d;

      playgroundStore.$patch({
        selectedPlayground: { ...{ id: playground.id,
          lat: playgroundCoords.lat,
          lng: playgroundCoords.lon}}
      });
    }
  }
}
</script>