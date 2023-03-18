import BaseApi from './BaseApi';

class ReviewGroupApi extends BaseApi {

  getReviewGroups(params = {}) {
    return this.post('review-group/getReviewGroupList', params);
  }
  setReviewGroups(params = {}) {
    return this.post('review-group/insertReviewGroup', params);
  }
  deleteReviewGroups(idReviewGroup) {
    return this.delete('review-group/delReviewGroupById?id='+idReviewGroup);
  }
  getUserReviewGroup(idReviewGroup) {
    return this.get('review-group/getUserReviewList?id='+idReviewGroup);
  }
}
export default new ReviewGroupApi();
