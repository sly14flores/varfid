import { createWebHashHistory, createRouter } from "vue-router";
import store from './store'

import PageWrapper from "./PageWrapper";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword"

import Dashboard from "./pages/Dashboard";

/**
 * Vehicles
 */
import Vehicles from "./pages/vehicles/Vehicles";
import VehiclesList from "./pages/vehicles/List";
import VehicleNew from './pages/vehicles/New';
import VehicleEdit from './pages/vehicles/Edit';

/**
 * Maintenance
 */
import Maintenance from "./pages/maintenance/Maintenance"
// Users
import Users from "./pages/maintenance/users/Users";
import UsersList from "./pages/maintenance/users/List";
import UserNew from './pages/maintenance/users/New';
import UserEdit from './pages/maintenance/users/Edit';
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
    path: "/vehicles",
    name: "Vehicles",
    component: PageWrapper,
    props: {pageComponent: Vehicles},
    children: [
      {
        path: '',
        name: 'VehiclesList',
        component: VehiclesList
      },
      {
        path: 'add',
        name: 'NewVehicle',
        component: VehicleNew
      },
      {
        path: 'show/:id',
        name: 'ShowVehicle',
        component: VehicleEdit
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
        path: "users",
        name: "Users",
        component: Users,
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