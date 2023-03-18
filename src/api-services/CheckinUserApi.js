import BaseApi from './BaseApi'

class CheckinUserApi extends BaseApi {
    getUser(params = {}) {
        return this.post('employee-checkin/list', params)
    }
    createUser(params = {}) {
        return this.post('employee-checkin/create', params)
    }
    getUserCheckin(param = {}) {
        return this.post('employee-checkin/checkin-today', param)
    }
    getUserNotCheckin(param = {}) {
        return this.post('employee-checkin/not-checkin-today', param)
    }
}

export default new CheckinUserApi()
