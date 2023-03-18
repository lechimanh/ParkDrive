import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import DashboardOverview1 from '../views/dashboard-overview-1/Main.vue'

import Listparking from '../views/parking-management/Listparking.vue'
import Createparking from '../views/parking-management/Createparking.vue'
import Updateparking from '../views/parking-management/updateParking.vue'
import CreateParkingSlot from '../views/parkingslots/parkingslot-create.vue'
import ListParkingSlot from '../views/parkingslots/parkingslot-list.vue'
import UpdateParkingSlot from '../views/parkingslots/parkingslot-update.vue'
UpdateParkingSlot
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
                path: '/parking-management/list-parking',
                name: 'list-parking',
                component: Listparking
            },
            {
                path: '/parking-management/create-parking',
                name: 'create-parking',
                component: Createparking
            },
            {
                path: '/parking-management/update-parking',
                name: 'update-parking',
                component: Updateparking
            }
        ]
    },
    {
        path: '/parking-slot',
        component: SideMenu,
        children: [
            {
                path: '/parking-slot/list-parking-slot',
                name: 'list-parkingslot',
                component: ListParkingSlot
            },
            {
                path: '/parking-slot/create-parking-slot',
                name: 'create-parkingslot',
                component: CreateParkingSlot
            },
            {
                path: '/parking-slot/update-parking-slot',
                name: 'update-parkingslot',
                component: UpdateParkingSlot
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
