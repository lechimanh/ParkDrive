import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import DashboardOverview1 from '../views/dashboard-overview-1/Main.vue'

import Listparking from '../views/parking-management/Listparking.vue'
import Createparking from '../views/parking-management/Createparking.vue'

const routes = [
    {
        path: '/',
        component: SideMenu,
        children: [
            {
                path: '/',
                name: 'side-menu-dashboard-overview-1',
                component: DashboardOverview1
            }
        ]
    },
    {
        path: '/parking-management',
        component: SideMenu,
        children: [
            {
                path: '/list-parking',
                name: 'list-parking',
                component: Listparking
            },
            {
                path: '/create-parking',
                name: 'create-parking',
                component: Createparking
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})

export default router
