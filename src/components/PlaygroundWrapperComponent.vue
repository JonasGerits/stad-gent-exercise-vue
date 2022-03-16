<template>
  <div class="m-6 flex flex-col h-full md:block">
    <SearchWrapperComponent></SearchWrapperComponent>
    <div class="hidden border my-3 md:flex">
      <PlaygroundList></PlaygroundList>
      <div class="col-span-2 w-full">
        <MapComponent/>
      </div>
    </div>
    <div class="h-full block md:hidden">
      <PlaygroundList />
      <MapComponent />
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