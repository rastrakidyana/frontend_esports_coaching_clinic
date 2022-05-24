import * as iziToast from 'izitoast'

export default {
  success(text) {
    return iziToast.success({
      title: 'OK',
      message: text,
      position: 'topCenter',
    })
  },
  error(text) {
    return iziToast.error({
      title: 'Error',
      message: text,
      position: 'topCenter',
    })
  },
  warning(text) {
    return iziToast.warning({
      title: 'Warning',
      message: text,
      position: 'topCenter',
    })
  },
  info(text) {
    return iziToast.info({
      title: 'Info',
      message: text,
      position: 'topCenter',
    })
  },
  question(text, trueFunction , noFunction) {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      zindex: 999,
      title: 'Pertanyaan',
      message: text,
      position: 'center',
      buttons: [
        [
          '<button><b>YES</b></button>',
          function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
            trueFunction()
          },
          true,
        ],
        [
          '<button>NO</button>',
          function(instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
            noFunction()
          },
        ],
      ],
    })
  },
}
