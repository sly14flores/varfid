export default [
    {
        label:'Dashboard',
        icon:'pi pi-fw pi-home',
        to:'/'
    },
    {
        label:'Users',
        icon:'pi pi-fw pi-users',
        items:[
          {
              label:'List',
              icon:'pi pi-fw pi-users',
              to: '/users'                       
          },              
          {
              label:'Add',
              icon:'pi pi-fw pi-user-plus',
              to: '/users/add'          
          },
        ]
    },
    {
        label:'Maintenance',
        icon:'pi pi-fw pi-cog',
        items:[
          {
              label:'Vehicles',
              items: [
                  {
                      label: 'List',
                      to: '/maintenance/vehicles'
                  },
                  {
                    label: 'Add',
                    to: '/maintenance/vehicles/add'
                },                  
              ]            
          },
        ]
    }    
]