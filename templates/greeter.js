import { ref } from 'vue'

export function useGreeter(name) {
  return { message: ref(`Hello ${name}`) }
}
