import Vue from 'vue'
import App from './App'
import store from "./store/vuex.js"

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store //app中使用vuex

const app = new Vue({
	store,
    ...App
})
app.$mount()
