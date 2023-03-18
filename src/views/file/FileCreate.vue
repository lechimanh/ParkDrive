<template>
    <div>
        <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    Thêm thành công!
                </div>
            </div>
        </div>
        <h2 class="intro-y text-lg font-medium mt-4">Thêm File</h2>
        <div>
            <ModalBody class="intro-y">
                <Form @submit.prevent :validation-schema="schema" v-slot="{ errors }">
                    <div class="mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">

                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label  text-base">Danh mục :</label>
                                <Field as="select" class="form-select" name="fileCategoryId"
                                    v-model="dataCreate.fileCategoryId"
                                    :class="{ 'is-invalid': errors.fileCategoryId }">
                                    <option value="">Tất cả</option>
                                    <option v-for="(item, index) in listCategory" :key="index" :value="item.id">{{
                                        item.name
                                    }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.fileCategoryId }}</div>
                            </div>

                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Loại File : </label>
                                <Field as="select" class="form-select" v-model="dataCreate.type" name="type"
                                    :class="{ 'is-invalid': errors.type }">
                                    <option value="">Tất cả</option>
                                    <option value="1">Ảnh</option>
                                    <option value="2">Video</option>
                                    <option value="3">Tài liệu</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.type }}</div>
                            </div>
                        </div>
                        <div class="mt-4 pl-5 pr-5">
                            <Dropzone ref-key="dropzoneMultipleRef" :options="{
                                url: api + '/fileManagement/uploadFileAmazon',
                                paramName: 'file',
                                thumbnailWidth: 150,
                                maxFilesize: 10,
                                addRemoveLinks: true,
                                dictCancelUpload: 'Hủy tải lên',
                                dictRemoveFile: 'Xóa file',
                            }" class="dropzone" v-model="dataCreate.file">
                                <div class="text-lg font-medium">
                                    <UploadIcon class="block mx-auto" />
                                    <div class="text-center text-xl mt-2">Kéo thả file vào đây hoặc click vào để chọn
                                        file</div>
                                </div>
                            </Dropzone>
                            <div class="invalid-feedback" v-for="(item, index) in errorImages"
                                        v-bind:key="index">{{ item }}</div>
                        </div>
                        <div class="mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="goHome()">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2 mr-4" type="submit"
                                @click="createFile()">Thêm</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>
    </div>
</template>
<script>

import FileCategoryApi from '../../api-services/FileCategoryApi'
import FileManagementApi from '../../api-services/FileManagementApi'
import Toastify from "toastify-js"
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
const API_ROOT = import.meta.env.VITE_API_ROOT;
import { ref, provide, onMounted } from "vue";
import { mapGetters } from 'vuex';
export default {
    name: 'FileCreate',
    components: {
        Form,
        Field,
    },
    props: ['dataImage'],
    computed: mapGetters('auth', ['iduser']),
    data() {
        const schema = Yup.object().shape({
            fileCategoryId: Yup.string()
                .required('Vui lòng chọn danh mục.'),
            type: Yup.string()
                .required('Vui lòng chọn loại.'),
        });
        return {
            schema,
            api: API_ROOT,
            listCategory: [],
            resultFile: [],
            errorImages: [],
            dataCreate: {
                type: "",
                listAmazonEntity: [],
                fileCategoryId: ""
            },
        }
    },
    created() {
        this.getCategory();
    },
    watch: {},
    methods: {
        async getCategory() {
            const res = await FileCategoryApi.getCategory(JSON.stringify({}));
            this.listCategory = res.data;
        },
        async createFile() {
            if (JSON.parse(JSON.stringify(this.resultFile)).length  == 0) {
                if(this.errorImages  ==  0){
                    this.errorImages.push('Vui lòng chọn file');
                    return;
                } 
            }else{
                this.errorImages = [];
            }
            let params = {
                listAmazonEntity: JSON.parse(JSON.stringify(this.resultFile)),
                fileCategoryId: this.dataCreate.fileCategoryId,
                type:  parseInt(this.dataCreate.type) 
            }
            const res = await FileManagementApi.insertFile(JSON.stringify(params));
            this.goHome();
  
        },

        goHome() {
            this.$router.push('/file/list-file');
        },
    },
    setup() {
        var resultFile = ref([]);
        var arrCheckFile = [];
        const dropzoneMultipleRef = ref();
        provide("bind[dropzoneMultipleRef]", (el) => {
            dropzoneMultipleRef.value = el;
        });
        onMounted(() => {
            const elDropzoneMultipleRef = dropzoneMultipleRef.value;
            elDropzoneMultipleRef.dropzone.on("success", (file) => {
                var responseFile = JSON.parse(file.xhr.responseText);
                var array = JSON.parse(JSON.stringify(resultFile.value));
                let fileItemName = responseFile.data.name.split("-");
                fileItemName.shift();
                fileItemName = fileItemName.join("-");
                if (array.length > 0) {
                    let fileExists = array.some(array => {
                        let fileCheck = array.name.split("-");
                        fileCheck.shift();
                        fileCheck = fileCheck.join("-");
                        fileCheck === fileItemName
                    }
                    );
                    if (!fileExists) {
                        array.push(responseFile.data)
                    } else {
                        elDropzoneMultipleRef.dropzone.removedfile(file);
                    }
                } else {
                    array.push(responseFile.data)
                }
                resultFile.value = array;
            });
            elDropzoneMultipleRef.dropzone.on("addedfiles", (files) => {

                for (var file of files) {
                    var checkFileDupicate = arrCheckFile.find(x => x == file.name);
                    if (checkFileDupicate === undefined) {
                        arrCheckFile.push(file.name)
                    } else {
                        elDropzoneMultipleRef.dropzone.cancelUpload(file);
                    }
                }
            });
            elDropzoneMultipleRef.dropzone.on("removedfile", (file) => {
                var array = JSON.parse(JSON.stringify(resultFile.value));
                var responseFile = JSON.parse(file.xhr.responseText);

                let fileItemName = responseFile.data.name.split("-");
                fileItemName.shift();
                fileItemName = fileItemName.join("-");

                var array = array.filter(function (list_item) {
                    let listItemName = list_item.name.split("-");
                    listItemName.shift();
                    listItemName = listItemName.join("-");
                    return listItemName != fileItemName;
                })
                arrCheckFile = arrCheckFile.filter(function (fileName) {
                    return fileName != file.name;
                })
                resultFile.value = array;
            });
        });

        return { resultFile }
    }
}
</script>
<style scoped>
.toastify .toastify-content-update {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 2.5rem;
    padding-left: 0px;
}

.invalid-feedback {
    color: red;
    margin-top: 8px;
}

/* ::v-deep .dropzone .dz-preview .dz-remove {
    color: red;
} */

@media screen and (max-width: 576px) {

    .modal-body .form-create {
        flex-direction: column;
    }

    .form-create .create-layout {
        width: 100%;
    }

    .group {
        padding-right: 1.25rem;
    }

    .calendar {
        margin-top: unset;
    }
}
</style>