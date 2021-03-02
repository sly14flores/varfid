import { createWebHashHistory, createRouter } from "vue-router";
import store from './store'

import PageWrapper from "./PageWrapper";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword"

import Dashboard from "./pages/Dashboard";

/**
 * Users
 */
import Users from "./pages/users/Users";
import UsersList from "./pages/users/List";
import UserNew from './pages/users/New';
import UserEdit from './pages/users/Edit';

/**
 * Maintenance
 */
import Maintenance from "./pages/maintenance/Maintenance"
// Brands
import Brands from "./pages/maintenance/brands/Brands"
import BrandsList from "./pages/maintenance/brands/List"
import BrandNew from "./pages/maintenance/brands/New"
import BrandEdit from "./pages/maintenance/brands/Edit"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/change/password",
    name: "ChangePassword",
    component: PageWrapper,
    props: {pageComponent: ChangePassword}
  },  
  {
    path: "/",
    name: "Dashboard",
    component: PageWrapper,
    props: {pageComponent: Dashboard}
  },
  {
    path: "/users",
    name: "Users",
    component: PageWrapper,
    props: {pageComponent: Users},
    children: [
      {
        path: '',
        name: 'UsersList',
        component: UsersList
      },
      {
        path: 'add',
        name: 'NewUser',
        component: UserNew
      },
      {
        path: 'show/:id',
        name: 'ShowUser',
        component: UserEdit
      }
    ]
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    component: PageWrapper,
    props: {pageComponent: Maintenance},
    children: [
      {
        path: 'brands',
        name: 'Brands',
        component: Brands,
        children: [
          {
            path: '',
            name: 'BrandsList',
            component: BrandsList,
          },
          {
            path: 'add',
            name: 'NewBrand',
            component: BrandNew
          },
          {
            path: 'show/:id',
            name: 'ShowBrand',
            component: BrandEdit
          }          
        ]
      },      
    ]
  },  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from) => {
  
//   const { dispatch } = store
//   dispatch('TRANSITIONING', true)

// })

// router.afterEach((to, from) => {

//   const { dispatch } = store
//   dispatch('TRANSITIONING', false)

// })

export default router;