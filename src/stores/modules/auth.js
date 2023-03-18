import AuthApi from '../../api-services/AuthApi'
import { setToken, removeToken } from '../../utils/auth'
const state = {
    request: false,
    failure: null,
    token: '',
    user: {},
    menus: []
}

const mutations = {
    AUTH_REQUEST: (state) => {
        state.request = true
    },
    AUTH_SUCCESS: (state, { token, userInfo }) => {
        state.request = false
        state.failure = null
        state.token = token
        state.user = userInfo
    },
    AUTH_FAILURE: (state, error) => {
        state.request = false
        state.failure = error.response.data.code
    },
    CLEAR_USER: (state) => {
        state.token = null
        state.user = {}
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER: (state, user) => {
        state.user = user
    },
    SET_MENU: (state, menus) => {
        state.menus = menus
    }
}

const actions = {
    login: async ({ commit }, form) => {
        commit('AUTH_REQUEST')

        const data = await AuthApi.login(form)
        if (data.error == 'OK') {
            return false
        }
        console.log(data)
        commit('AUTH_SUCCESS', data)

        const dataMenu = await AuthApi.getAuthUser({}, data.token)
        var ids = []
        if (dataMenu.roleEntity != null && dataMenu.roleEntity?.menu != undefined) {
            ids = dataMenu.roleEntity?.menu.map((obj) => obj.id)
        }
        commit('SET_MENU', ids)
        setToken(data.token)
        return true
    },
    lineLogin: async ({ commit }, data) => {
        const dataMenu = await AuthApi.getAuthUser({}, data.token)
        var ids = []
        if (dataMenu.roleEntity != null && dataMenu.roleEntity?.menu != undefined) {
            ids = dataMenu.roleEntity?.menu.map((obj) => obj.id)
        }
        commit('SET_MENU', ids)
        setToken(data.token)
        return true
    },

    logout: async ({ dispatch }) => {
        //api logout
        // await logout();
        dispatch('clearUser')
        return true
    },
    setToken: ({ commit }, token) => {
        commit('SET_TOKEN', token)
    },
    setMenu: ({ commit }, ids) => {
        commit('SET_MENU', ids)
    },
    setMenu: ({ commit }, ids) => {
        commit('SET_MENU', ids)
    },
    clearUser: ({ commit }) => {
        commit('CLEAR_USER')
        removeToken()
    },
    getAuthUser: async ({ commit }, token) => {
        console.log('agaga' + token)
        const data = await AuthApi.getAuthUser({}, token)
        commit('SET_USER', data)
    }
}

const getters = {
    username: (state) => state.user.name,
    usertype: (state) => state.user.userType,
    email: (state) => state.user.email,
    iduser: (state) => state.user.id,
    menus: (state) => state.menus
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
