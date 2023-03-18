import BaseApi from './BaseApi';

class RoleApi extends BaseApi {

  getListDecentralization(params = {}) {
    return this.post('role/getRole', params);
  }
  createDecentralization(params = {}) {
    return this.post('role/insertRole', params);
  }
  getListUser(params = {}) {
    return this.post('user/list', params);
  }
  createUser(params = {}) {
    return this.post('registerNew/saveRegisteredUserInfoNew', params);
  }
}
export default new RoleApi();
