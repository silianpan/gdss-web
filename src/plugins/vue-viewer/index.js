import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// defalut install
Vue.use(Viewer)
Viewer.setDefaults({
  defaultOptions: {
    inline: true,
    button: false,
    navbar: false,
    title: true,
    toolbar: {
      next: false,
      prev: false
    },
    tooltip: false,
    movable: false,
    zoomable: false,
    rotatable: false,
    scalable: false,
    transition: false,
    fullscreen: false,
    keyboard: false,
    url: 'data-source'
  }
})
