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

<style>
@import url('https://fonts.googleapis.com/css?family=Tangerine|Inconsolata|Roboto&display=swap');

*, html, body {
  box-sizing: border-box;
}
</style>
