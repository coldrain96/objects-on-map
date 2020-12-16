import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/map'
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/objects',
    name: 'Objects',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Objects.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
