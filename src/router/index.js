import Vue from 'vue'
import Router from 'vue-router'
import Login from "../view/Login";
import Home from "../view/Home";
import User from "../view/user/User";
import Device from "../view/devcie/Devcie";
import Profile from "../view/user/Profile";
import ChangePwd from "../view/user/ChangePwd";
import Pet from "../view/pet/Pet";
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path: '/user', component: User, name: 'User'},
        {path: '/user/profile', component: Profile, name: 'Profile'},
        {path: '/user/changePwd', component: ChangePwd, name: 'ChangePwd'},
        {path: '/device', component: Device, name: 'Device'},
        {path: '/pet', component: Pet, name: 'Pet'}
      ]
    },
  ]
})
