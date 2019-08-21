import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css' // 引入elementUI的样式
import './styles/index.less' // 引入默认样式
import axios from './utils/axios.config'

Vue.prototype.$axios = axios // 把axios的插件给了vue的原型属性

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component) // 注册全局
// Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
