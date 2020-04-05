import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import veqs from './veqs';


Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
// 绑定实例
veqs._bindInstance({
  id: 'app',
  dialogPath: 'dialogs'
});
Vue.prototype.veqs = veqs;


