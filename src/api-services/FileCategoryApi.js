import BaseApi from "./BaseApi";

class FileCategoryApi extends BaseApi{

    getCategory(params = {}){
        return this.post('file/category/list', params);
    }
    insertCategory(params = {}){
        return this.post('file/category/insert', params);
    }
    deleteCategory(idCategory){
        return this.delete('file/category/deleteById?id=' + idCategory);
    }
    updateCategory(params = {}){
        return this.post('file/category/update', params);
    }
    getCategoryDetail(params = {},id){
        return this.get(`file/category/detail/${id}`, params);
    }
}
export default new FileCategoryApi();