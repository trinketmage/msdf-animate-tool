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
  data() {
    return {
      text: "LOVE",
      stagger: 0.15,
      duration: 1.5
    }
  }
}).$mount('#app')
