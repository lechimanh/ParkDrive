import { createRouter, createWebHistory } from 'vue-router'
import { getToken, checkAuth } from '../utils/auth'
import SideMenu from '../layouts/side-menu/Main.vue'
import SimpleMenu from '../layouts/simple-menu/Main.vue'
import TopMenu from '../layouts/top-menu/Main.vue'
import Inbox from '../views/inbox/Main.vue'
import ErrorPage from '../views/error-page/Main.vue'
import ListHistoryRemunerative from '../views/inbox/ListHistory.vue'
import CreateRemunerative from '../views/inbox/Create.vue'
import ListOrganization from '../views/inbox/ListOrganization.vue'
import GroupReview from '../views/inbox/GroupReview/GroupReview.vue'
import CreateGroupReview from '../views/inbox/GroupReview/CreateGroupReview.vue'
import ListNominated from '../views/inbox/Nominated/ListNominated.vue'
import FileManager from '../views/inbox/FileManager.vue'
import ListDecentralization from '../views/inbox/User/ListDecentralization.vue'
import CreateDecentralization from '../views/inbox/User/CreateDecentralization.vue'
import store from '../stores'
import { isEmpty } from 'lodash'
import ListUser from '../views/inbox/User/ListUser.vue'
import Login from '../views/auth/Login.vue'
import CreateUser from '../views/inbox/User/CreateUser.vue'
import Error403Page from '../views/error-page/403.vue'
import Checkin from '../views/user/ListCheckin.vue'
import ListCheckinEmployee from '../views/user/ListCheckinEmployee.vue'
import EmployeeCreate from '../views/user/Create.vue'
import ListFile from '../views/file/FileManage.vue'
import CreateFile from '../views/file/FileCreate.vue'
import ListFolder from '../views/file/FolderList.vue'
import CreateFolder from '../views/file/FolderCreate.vue'
import UpdateFolder from '../views/file/FolderUpdate.vue'
import CallbackUrl from '../views/auth/CallbackUrl.vue'

const token = getToken()
if (store.state.auth.token !== token) {
    store.dispatch('auth/setToken', token)
}
const routes = [
    {
        path: '/',
        component: SideMenu,
        children: [
            {
                path: '/side-menu-remunerative',
                name: 'side-menu-remunerative',
                component: Inbox,
                meta: {
                    requiresAuth: true,
                    id: 2
                }
            },
            {
                path: '/remunerative/list-history',
                name: 'remunerative-history',
                component: ListHistoryRemunerative,
                meta: {
                    requiresAuth: true,
                    id: 5
                }
            },
            {
                path: '/remunerative/create',
                name: 'remunerative-create',
                component: CreateRemunerative,
                meta: {
                    requiresAuth: true,
                    id: 6
                }
            },
            {
                path: '/remunerative/list-organization',
                name: 'remunerative-list-organization',
                component: ListOrganization,
                meta: {
                    requiresAuth: true,
                    id: 4
                }
            },
            {
                path: '/remunerative/group-review',
                name: 'remunerative-group-review',
                component: GroupReview,
                meta: {
                    requiresAuth: true,
                    id: 7
                }
            },
            {
                path: '/remunerative/group-review/create-group-review',
                name: 'remunerative-group-review_create',
                component: CreateGroupReview,
                meta: {
                    requiresAuth: true,
                    id: 7
                }
            },
            {
                path: '/remunerative/nominated/list-nominated',
                name: 'remunerative-list-nominated',
                component: ListNominated,
                meta: {
                    requiresAuth: true,
                    id: 8
                }
            },
            {
                path: '/remunerative/file-manager',
                name: 'remunerative-file-manager',
                component: FileManager,
                meta: {
                    requiresAuth: true,
                    id: 9
                }
            },
            {
                path: '/user/list-decentralization',
                name: 'list-decentralization',
                component: ListDecentralization,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/user/create-decentralization',
                name: 'create-decentralization',
                component: CreateDecentralization,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/user/list-user',
                name: 'list-user',
                component: ListUser,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/user/create-user',
                name: 'create-user',
                component: CreateUser,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/user/checkin',
                name: 'checkin-user',
                component: Checkin,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/',
                name: 'list-checkin-employee',
                component: ListCheckinEmployee,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/user/create-employee',
                name: 'create-employee',
                component: EmployeeCreate,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/file/list-folder',
                name: 'list-folder',
                component: ListFolder,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/file/create-folder',
                name: 'create-folder',
                component: CreateFolder,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/file/update-folder',
                name: 'update-folder',
                component: UpdateFolder,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/file/list-file',
                name: 'list-file',
                component: ListFile,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/file/create-file',
                name: 'create-file',
                component: CreateFile,
                meta: {
                    requiresAuth: true,
                    id: 0
                }
            },
            {
                path: '/callback-url',
                name: 'callback-url',
                component: CallbackUrl
            }
        ]
    },
    {
        path: '/simple-menu',
        component: SimpleMenu,
        children: [
            {
                path: 'inbox',
                name: 'simple-menu-inbox',
                component: Inbox
            }
        ]
    },
    {
        path: '/top-menu',
        component: TopMenu,
        children: [
            {
                path: 'inbox',
                name: 'top-menu-inbox',
                component: Inbox
            }
        ]
    },
    {
        path: '/error-page',
        name: 'error-page',
        component: ErrorPage
    },
    {
        path: '/:pathMatch(.*)*',
        component: ErrorPage
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/permission-page',
        name: 'permission-page',
        component: Error403Page
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    let { token, user, menus } = store.state.auth
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (token && isEmpty(user)) {
        await store.dispatch('auth/getAuthUser', token)
        user = store.state.auth.user
    }
    let checkMenu = true
    if (to.meta.id && parseInt(user.userType)) {
        checkMenu = menus.includes(to.meta.id)
    }

    if (token && (to.path === '/login' || to.path === '/') && !isEmpty(user) && checkMenu) {
        next()
    } else if (!token && requiresAuth) {
        next({
            path: '/login'
        })
    } else if (token && requiresAuth && !checkMenu) {
        next({
            path: '/permission-page'
        })
    } else {
        next()
    }
})

export default router
