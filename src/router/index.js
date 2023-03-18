import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import DashboardOverview1 from '../views/dashboard-overview-1/Main.vue'
import ListCategoryNews from '../views/category/List.vue'
import CreateCategoryNews from '../views/category/Create.vue'
import ListNews from '../views/news/List.vue'
import CreateNews from '../views/news/Create.vue'
import ListLake from '../views/news/List.vue'
import CreateLake from '../views/news/Create.vue'
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
        path: '/category-news',
        component: SideMenu,
        children: [
            {
                path: '/category-news/list',
                name: 'category-news-list',
                component: ListCategoryNews
            },
            {
                path: '/category-news/create',
                name: 'category-news-create',
                component: CreateCategoryNews
            }
        ]
    },
    {
        path: '/news',
        component: SideMenu,
        children: [
            {
                path: '/news/list',
                name: 'news-list',
                component: ListNews
            },
            {
                path: '/news/create',
                name: 'news-create',
                component: CreateNews
            }
        ]
    },
    {
        path: '/lake',
        component: SideMenu,
        children: [
            {
                path: '/lake/list',
                name: 'lake-list',
                component: ListNews
            },
            {
                path: '/lake/create',
                name: 'lake-create',
                component: CreateNews
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})

export default router
