import { defineStore } from "pinia";

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: () => ({
    
    menu: [
      // {
      //   icon: "HomeIcon",
      //   pageName: "side-menu-dashboard",
      //   title: "Dashboard",
      //   subMenu: [
      //     {
      //       icon: "",
      //       pageName: "side-menu-dashboard-overview-1",
      //       title: "Overview 1",
      //     },
         
      //   ],
      // },
     
      {
        icon: "ListIcon",
        pageName: "side-menu-inbox",
        title: "Khen thưởng",
      },
      "devider",
      {
        icon: "EditIcon",
        pageName: "side-menu-crud",
        title: "Crud",
        subMenu: [
          {
            icon: "",
            pageName: "side-menu-crud-data-list",
            title: "Data List",
          },
        ],
      },
      
      "devider",
    ],
  }),
});
