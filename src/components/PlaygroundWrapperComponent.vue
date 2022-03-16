<template>
  <div class="m-6">
    <SearchWrapperComponent></SearchWrapperComponent>
    <div class="flex border my-3">
      <PlaygroundList></PlaygroundList>
      <div class="col-span-2 w-full">
        <MapComponent/>
      </div>
    </div>
  </div>
</template>

<script>
import PlaygroundList from "@/components/PlaygroundList";
import MapComponent from "@/components/google-maps/MapComponent";
import SearchWrapperComponent from "@/components/search/SearchWrapperComponent";

export default {
  components: {
    SearchWrapperComponent,
    MapComponent,
    PlaygroundList,
  }
}
</script>