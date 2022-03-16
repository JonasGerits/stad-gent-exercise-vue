<template>
  <div class="flex w-full mb-3 hidden md:flex">
    <div class="w-full lg:w-80 mr-3">
      <LocationSearchComponent></LocationSearchComponent>
    </div>
    <div class="w-full lg:w-80 mx-3">
      <FunctionMultiSelectComponent />
    </div>
    <div class="w-full lg:w-80 mx-3">
      <RangeFilterComponent/>
    </div>
    <div class="w-full lg:w-80 flex ml-3">
     <ResetFilterButtonComponent />
    </div>
  </div>
  <div class="flex w-full mb-3 md:hidden">
    <button v-on:click="toggleMobileFilter" class="open-filter p-3 w-full rounded text-white font-bold hover:bg-white hover:border">Open filters</button>
    <div v-if="mobileFilterOpened" class="absolute w-full h-screen bg-white left-0 top-0 z-50">
      <div class="flex flex-col w-full">
        <div class="m-6">
          <div class="flex justify-between items-center">
            <h2 class="text-xl w-fit">Filter speelpleinen</h2>
            <button v-on:click="toggleMobileFilter">
              <BootstrapIcon
                  icon="x"
                  size="2x"
                  />
            </button>
          </div>
          <div class="my-3">
            <LocationSearchComponent></LocationSearchComponent>
          </div>
          <div class="my-3">
            <FunctionMultiSelectComponent />
          </div>
          <div class="my-10">
            <RangeFilterComponent/>
          </div>
          <div class="my-3">
            <ResetFilterButtonComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
button.open-filter {
  background-color: #374151;
}

button.open-filter:hover {
  color: #374151;
  border: 1px solid #374151;
}
</style>

<script>
import LocationSearchComponent from "@/components/search/components/LocationSearchComponent";
import FunctionMultiSelectComponent from "@/components/search/components/FunctionMultiSelectComponent";
import RangeFilterComponent from "@/components/search/components/RangeFilterComponent";
import ResetFilterButtonComponent from "@/components/search/components/ResetFilterButtonComponent";
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

export default {
  components: {
    FunctionMultiSelectComponent,
    RangeFilterComponent,
    LocationSearchComponent,
    ResetFilterButtonComponent,
    BootstrapIcon
  },
  data() {
    return {
      mobileFilterOpened: false
    }
  },
  methods: {
    toggleMobileFilter() {
      this.mobileFilterOpened = !this.mobileFilterOpened;
    }
  }
}
</script>
