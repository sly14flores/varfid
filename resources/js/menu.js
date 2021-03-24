const manageUsersMenu = [
    {
        label:'Users',
        icon:'pi pi-fw pi-users',
        items: [
            {
                label: 'List',
                icon:'pi pi-fw pi-list',
                to: '/maintenance/users'
            },
            {
                label: 'Add',
                icon:'pi pi-fw pi-plus',
                to: '/maintenance/users/add'
            },                  
        ]            
    }
]

const maintenanceMenu = [
    {
        label:'Maintenance',
        icon:'pi pi-fw pi-cog',
        items:[]
    }
]

const maintenanceSubMenus = [
    {
        label:'Vehicle Types',
        icon:'pi pi-fw pi-circle-off',
        items: [
            {
                label: 'List',
                icon:'pi pi-fw pi-list',
                to: '/maintenance/types'
            },
            {
                label: 'Add',
                icon:'pi pi-fw pi-plus',
                to: '/maintenance/types/add'
            },                  
        ]            
    },                   
    {
        label:'Brands',
        icon:'pi pi-fw pi-circle-off',
        items: [
            {
                label: 'List',
                icon:'pi pi-fw pi-list',
                to: '/maintenance/brands'
            },
            {
                label: 'Add',
                icon:'pi pi-fw pi-plus',
                to: '/maintenance/brands/add'
            },                  
        ]            
    },
    {
        label:'Models',
        icon:'pi pi-fw pi-circle-off',
        items: [
            {
                label: 'List',
                icon:'pi pi-fw pi-list',
                to: '/maintenance/models'
            },
            {
                label: 'Add',
                icon:'pi pi-fw pi-plus',
                to: '/maintenance/models/add'
            },                  
        ]            
    },       
]

const mainMenu = [
    {
        label:'Dashboard',
        icon:'pi pi-fw pi-home',
        to:'/dashboard'
    },
    {
        label:'Logs',
        icon:'pi pi-fw pi-list',
        to:'/logs'
    },
    {
        label:'Reports',
        icon:'pi pi-fw pi-book',
        to:'/reports'
    },         
    {
        label:'Vehicles',
        icon:'pi pi-fw pi-discord',
        items:[
          {
              label:'List',
              icon:'pi pi-fw pi-list',
              to: '/vehicles'                       
          },              
          {
              label:'Add',
              icon:'pi pi-fw pi-plus',
              to: '/vehicles/add'          
          },
        ]
    }
]

export {
    mainMenu,
    maintenanceMenu,    
    manageUsersMenu,
    maintenanceSubMenus,
}