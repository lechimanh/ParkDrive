import BaseApi from './BaseApi';

class RemunerativeApi extends BaseApi {

  getRemuneratives(params = {}) {
    return this.post('remunerative/getRemunerativeList', params);
  }
  createRemuneratives(params = {}) {
    return this.post('remunerative/insertRemunerative', params);
  }
  getUser(params = {}) {
    return this.post('user/remunerative', params);
  }
  getOrganizationList(params = {}) {
    return this.post('organization/remunerative', params);
  }
  getRemunerativesDetail(params = {}) {
    return this.get('remunerative/getRemunerativeInfo', params);
  }
  getOrganizationByUser(params = {}) {
    return this.get('organization/getOrganizationByUserId', params);
  }
  getOrganization(params = {}) {
    return this.get('organization/getOrganizationById', params);
  }
  updateStatus(idRemunerative,params = {}) {
    return this.put('remunerative/updateStatus/?idRemunerative='+idRemunerative, params);
  }
  getRemunerativeListOfUser(params = {}) {
    return this.post('remunerative/getRemunerativeListOfUser', params);
  }
  getNominated(params = {}) {
    return this.post('remunerative/getListNominated', params);
  }
}

export default new RemunerativeApi();
