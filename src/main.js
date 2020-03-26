// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import modal from './modal/index';
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js';
//axios
import axios from 'axios';
//copy
import VueClipboard from 'vue-clipboard2';
//web3
import web3utils from '../src/service/web3utils';
//echarts

import Trans from './service/Trans';

Vue.use(VueClipboard);
Vue.use(ElementUI);
Vue.use(web3utils);
Vue.use(modal);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$Trans = Trans;
Vue.config.performance = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

