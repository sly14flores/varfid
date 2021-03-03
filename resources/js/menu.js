export default [
    {
        label:'Dashboard',
        icon:'pi pi-fw pi-home',
        to:'/'
    },
    {
        label:'Vehicles',
        icon:'pi pi-fw pi-users',
        items:[
          {
              label:'List',
              icon:'pi pi-fw pi-users',
              to: '/vehicles'                       
          },              
          {
              label:'Add',
              icon:'pi pi-fw pi-user-plus',
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
                items: [
                    {
                        label: 'List',
                        to: '/maintenance/users'
                    },
                    {
                        label: 'Add',
                        to: '/maintenance/users/add'
                    },                  
                ]            
            },            
            {
                label:'Brands',
                items: [
                    {
                        label: 'List',
                        to: '/maintenance/brands'
                    },
                    {
                        label: 'Add',
                        to: '/maintenance/brands/add'
                    },                  
                ]            
            },
        ]
    }    
]