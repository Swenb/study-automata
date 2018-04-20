import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '../components/LandingPage';
import DFA from '../components/DFA';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: LandingPage,
    },
    {
      path: '/dfa',
      component: DFA,
    },
  ],
});
