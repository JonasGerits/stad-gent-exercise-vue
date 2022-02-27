<template>
 <li class="overflow-hidden border-b-2 min-w-fit">
   <div class="flex gap-4 p-3">
     <div class="w-48 flex items-center">
       <div class="w-full h-40">
         <img src="../assets/playground-stock-photo.png" class="w-full h-full object-cover rounded-lg">
       </div>
     </div>
     <div class="flex flex-col justify-center items-start w-72">
       <div class="font-bold text-xl text-left ">{{record.fields.naam}}</div>
       <div class="mb-3 text-sm">{{record.size}} m²</div>
       <div class="flex flex-wrap">
         <span v-for="playgroundFunction in playgroundFunctions" :key="playgroundFunction" class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{{playgroundFunction}}</span>
       </div>
     </div>
   </div>
 </li>
</template>

<script>
export default {
  data() {
    return {
      playgroundFunctions: []
    }
  },
  props: ['record'],
  created() {
    this.playgroundFunctions = this.record.fields.functies.split(',');
  }
}
</script>