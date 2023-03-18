import BaseApi from "./BaseApi";

class CategoryNewsApi extends BaseApi{

    getList(params = {},page = 1){
        return this.post('news-category/index?page='+page, params);
    }
    create(params = {}){
        return this.post('news-category/create', params);
    }
    delete(id){
        return this.del('news-category/delete/'+id);
    }
    detail(id){
        return this.get('news-category/detail/'+id);
    }
    edit(id,params={}){
        return this.update('news-category/update/'+id,params);
    }
    
}
export default new CategoryNewsApi();