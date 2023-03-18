import BaseApi from "./BaseApi";

class FileManagementApi extends BaseApi{


    insertFile(params = {}){
        return this.post('fileManagement/multipleCreateFile', params);
    }
    getFileAll(params={}){
        return this.post('fileManagement/listFiles', params);
    }
    deleteFile(id){
        return this.delete(`fileManagement/delete/${id}`);
    }
}
export default new FileManagementApi();