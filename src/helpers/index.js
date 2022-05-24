import Vue from 'vue'
import popup from '@/helpers/popup.js'

export default {
  install: () => {
    Vue.prototype.$popup = popup
    Vue.$popup = popup
  },
}