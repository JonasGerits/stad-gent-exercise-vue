<template>
 <li>
   {{record.fields.naam}}
   {{record.size}}
 </li>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['record'],
}
</script>