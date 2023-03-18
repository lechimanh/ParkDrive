import BaseApi from './BaseApi';

class OrganizationApi extends BaseApi {

  getListOrganization(params = {}) {
    return this.get('organization/list', params);
  }
}
export default new OrganizationApi();
