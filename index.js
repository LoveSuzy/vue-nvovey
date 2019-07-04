import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App';

Vue.use(VueRouter)
Vue.component('App', App);

let isNew = false;
let isLoading = true;

const New = {
  template: '<div>new</div>'
}

const Old = {
  template: '<div>old</div>'
}

const Loading = {
  template: '<div>loading</div>',
  mounted() {
    setTimeout(() => {
      isLoading = false;
      isNew = true;
      console.log('new');
      router.push('/new');
    }, 1000)
  }
}

const router = new VueRouter({
  routes: [
    {
      path: '/new',
      component: New,
      beforeEnter: (to, from, next) => {
        if (isLoading) {
          next('/loading');
        } else if (!isNew) {
          next ('/old')
        }
        next();
      }
    },
    {
      path: '/old',
      component: Old,
      beforeEnter: (to, from, next) => {
        if (isLoading) {
          next('/loading');
        } else if (isNew) {
          next ('/new')
        }
        next();
      }
    },
    {
      path: '/loading',
      component: Loading 
    },
    {
      path: '*',
      redirect: '/loading'
    }
  ]
});

new Vue({
  el: '#app',
  router,
  template: '<App />'
})