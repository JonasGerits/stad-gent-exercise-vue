<template>
  <div class="flex w-full mb-3">
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
</template>

<script>
import LocationSearchComponent from "@/components/search/components/LocationSearchComponent";
import FunctionMultiSelectComponent from "@/components/search/components/FunctionMultiSelectComponent";
import RangeFilterComponent from "@/components/search/components/RangeFilterComponent";
import ResetFilterButtonComponent from "@/components/search/components/ResetFilterButtonComponent";

export default {
  components: {
    FunctionMultiSelectComponent,
    RangeFilterComponent,
    LocationSearchComponent,
    ResetFilterButtonComponent
  }
}
</script>
