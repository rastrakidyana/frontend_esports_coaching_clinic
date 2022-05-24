import Vue from 'vue'
import * as iziToast from 'izitoast'

Vue.use(iziToast)

export default {
    success(text) {
      return iziToast.success({
        title: 'Success',
        message: text,
        position: 'bottomCenter',
      })
    },
    error(text) {
      return iziToast.error({
        title: 'Error',
        message: text,
        position: 'bottomCenter',
      })
    },
    warning(text) {
      return iziToast.warning({
        title: 'Warning',
        message: text,
        position: 'bottomCenter',
      })
    },
    info(text) {
      return iziToast.info({
        title: 'Info',
        message: text,
        position: 'bottomCenter',
      })
    },
    question(text, yesOption) {
      iziToast.question({
        timeout: false,
        close: false,
        overlay: true,
        displayMode: 1,
        zindex: 999,
        title: 'Pertanyaan',
        message: text,
        position: 'center',
        buttons: [
          [
            '<button><b>Ya</b></button>',
            function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              yesOption()
            },
            true,
          ],
          [
            '<button>Tidak</button>',
            function(instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')              
            },
          ],
        ],
      })
    },
  }