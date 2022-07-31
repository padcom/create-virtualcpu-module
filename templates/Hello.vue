<template>
  <h2 class="a">{{ message }}</h2>
  <h2 class="b">{{ message }}</h2>
  <h2 class="c">{{ message }}</h2>
</template>

<script>
import { defineComponent } from 'vue'
import { useGreeter } from '../composables/greeter'

export default defineComponent({
  setup() {
    const { message } = useGreeter('Jenny')
    return { message }
  }
})
</script>

<style scoped>
h2 {
  color: forestgreen;
  font-size: 64px;
}
.a {
  font-family: 'Roboto';
}
.b {
  font-family: 'Tangerine';
}
.c {
  font-family: 'Inconsolata';
}
</style>
