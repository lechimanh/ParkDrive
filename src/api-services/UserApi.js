import BaseApi from './BaseApi';

class UserApi extends BaseApi {

  getListUser(params = {}) {
    return this.post('user/list', params);
  }
  createUser(params = {}) {
    return this.postDataForm('user/create', params);
  }
}
export default new UserApi();
