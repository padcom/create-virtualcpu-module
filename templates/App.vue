<template>
  <Hello />
</template>

<script>
import { defineComponent } from 'vue'

import Hello from './components/Hello.vue'

export default defineComponent({
  components: {
    Hello,
  },
})
</script>
