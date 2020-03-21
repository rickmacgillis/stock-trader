import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes';
import App from './App.vue'

import store from './store/store';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'https://[MY DB].firebaseio.com/';

const router = new VueRouter({
  mode: 'history',
  routes,
});

Vue.filter('currency', value => '$' + value.toLocaleString());

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
