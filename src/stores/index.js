/* eslint global-require: 0 */
import Vuex from 'vuex';
import auth from './modules/auth';
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()]
});

export default store;