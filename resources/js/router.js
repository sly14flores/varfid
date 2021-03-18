import { createWebHashHistory, createRouter } from "vue-router";
import store from './store'

const PageWrapper = () => import("./PageWrapper");
import Login from "./pages/Login";
import ScanStart from "./pages/ScanStart";
import ChangePassword from "./pages/ChangePassword"

import Dashboard from "./pages/Dashboard";
import Scan from "./pages/Scan";
import Logs from "./pages/Logs";

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
// Types
import Types from "./pages/maintenance/types/Types"
import TypesList from "./pages/maintenance/types/List"
import TypeNew from "./pages/maintenance/types/New"
import TypeEdit from "./pages/maintenance/types/Edit"
// Models
import Models from "./pages/maintenance/models/Types"
import ModelsList from "./pages/maintenance/models/List"
import ModelNew from "./pages/maintenance/models/New"
import ModelEdit from "./pages/maintenance/models/Edit"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Startup",
    component: ScanStart,
  },
  {
    path: "/change/password",
    name: "ChangePassword",
    component: PageWrapper,
    props: {pageComponent: ChangePassword}
  }, 
  {
    path: "/dashboard",
    name: "Dashboard",
    component: PageWrapper,
    props: {pageComponent: Dashboard}
  },
  {
    path: "/scan",
    name: "Scan",
    component: PageWrapper,
    props: {pageComponent: Scan}
  },  
  {
    path: "/logs",
    name: "Logs",
    component: PageWrapper,
    props: {pageComponent: Logs}
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
      {
        path: 'types',
        name: 'Types',
        component: Types,
        children: [
          {
            path: '',
            name: 'TypesList',
            component: TypesList,
          },
          {
            path: 'add',
            name: 'NewType',
            component: TypeNew
          },
          {
            path: 'show/:id',
            name: 'ShowType',
            component: TypeEdit
          }          
        ]
      },
      {
        path: 'models',
        name: 'Models',
        component: Models,
        children: [
          {
            path: '',
            name: 'ModelsList',
            component: ModelsList,
          },
          {
            path: 'add',
            name: 'NewModel',
            component: ModelNew
          },
          {
            path: 'show/:id',
            name: 'ShowModel',
            component: ModelEdit
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

export default router;