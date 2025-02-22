import Vue from 'vue'
import VueAMap from 'vue-amap' // 高德

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'f8754fd6a1250f6068a1881ba7bbb85e',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation'
  ],
  v: '1.4.4'
})
