import { defineStore } from "pinia";

export const useTopMenuStore = defineStore("topMenu", {
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
    ],
  }),
});
