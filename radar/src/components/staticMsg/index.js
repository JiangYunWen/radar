import state from './staticMsg.vue'
const staticMsg = {
  install (Vue) {
    Vue.component('staticMsg', state)
  }
}
export default staticMsg