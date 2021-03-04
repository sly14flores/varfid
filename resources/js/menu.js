export default [
    {
        label:'Dashboard',
        icon:'pi pi-fw pi-home',
        to:'/'
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
    },
    {
        label:'Maintenance',
        icon:'pi pi-fw pi-cog',
        items:[
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
        ]
    }    
]