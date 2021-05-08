import Vue from 'vue'
import App from './App.vue'

import gsap from "gsap";
import GSDevTools from "@/pure/gsap/GSDevTools";

gsap.registerPlugin(
  GSDevTools
);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
