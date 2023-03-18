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
        <h2 class="intro-y text-lg font-medium mt-4">Thêm danh sách khen thưởng</h2>
        <div>
            <ModalBody class="intro-y">
                <Form  @submit.prevent :validation-schema="schema" v-slot="{ errors }">
                    <div class="mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Loại khen thưởng:</label>
                                <select class="form-select" v-model="data_create.type">
                                    <option value="2">Cá nhân</option>
                                    <option value="1">Tổ chức</option>
                                </select>
                            </div>
                            <div class="w-1/2 create-layout" v-show="data_create.type == 2">
                                <label for="regular-form-1" class="form-label text-base">Khen thưởng cá nhân:</label>
                                <Field as="select" class="form-select" name="rewardedPO" v-model="data_create.rewardedPersonId"  :class="{ 'is-invalid': errors.rewardedPerson }">
                                    <option v-for="(item, index) in result_user" :key="index" :value="item.id">{{ item.name }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.rewardedPO }}</div>
                            </div>
                            <div class="w-1/2 create-layout" v-show="data_create.type == 1">
                                <label for="regular-form-1" class="form-label text-base">Khen thưởng tổ chức:</label>
                                <Field as="select" class="form-select" name="rewardedPO" v-model="data_create.organizationId" :class="{ 'is-invalid': errors.organization }">
                                    <option v-for="(item, index) in result_organization" :key="index" :value="item.id">{{ item.organizationName }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.rewardedPO }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label mt-4 text-base">Nhóm xét duyệt:</label>
                                <Field as="select" class="form-select" name="reviewGroup" v-model="data_create.reviewGroupId" :class="{ 'is-invalid': errors.reviewGroup }"> 
                                    <option v-for="(item, index) in result_group" :key="index" :value="item.id">{{ item.name }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.reviewGroup }}</div>
                            </div>
                        </div>
                            <div class="mt-4 pl-5 pr-5">
                            <label for="regular-form-1" class="form-label text-base">Nội dung khen thưởng:</label>
                            <Field as="textarea" class="form-control" name="content" rows="7" :class="{ 'is-invalid': errors.content }" 
                                placeholder="Vui lòng nhập nội dung" v-model="data_create.description">
                            </Field>
                            <div class="invalid-feedback">{{ errors.content }}</div>
                            </div>
                        <div class="mt-4 pl-5 pr-5">
                            <label for="regular-form-1" class="form-label text-base">Mô tả chi tiết:</label>
                            <Field as="textarea" class="form-control" name="description" rows="7" :class="{ 'is-invalid': errors.description }"
                                placeholder="Vui lòng nhập mô tả" v-model="data_create.rewardContent">
                            </Field>
                            <div class="invalid-feedback">{{ errors.description }}</div>
                        </div>
                        <div class="mt-4 pl-5 pr-5">
                            <Dropzone ref-key="dropzoneMultipleRef" :options="{
                                url: api+'/remunerative/uploadFile',
                                paramName: 'files',
                                thumbnailWidth: 150,
                                maxFilesize: 10,
                                addRemoveLinks: true,
                                dictCancelUpload: 'Hủy tải lên',
                                dictRemoveFile: 'Xóa file',
                                }" class="dropzone" v-model="data_create.files">
                            <div class="text-lg font-medium">
                                <UploadIcon class="block mx-auto" />
                                <div class="text-center text-xl mt-2">Kéo thả file vào đây hoặc click vào để chọn file</div>
                            </div>
                            </Dropzone>
                        </div>
                        <div class="mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="goHome()">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2 mr-4" type="submit" @click="createReward(2)">Thêm</button>
                            <button class="btn btn-success w-24 mb-2" type="submit" @click="createReward(1)">Lưu nháp</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>
    </div>
</template>
<script>
import UserApi from '../../api-services/UserApi'
import OrganizationApi from '../../api-services/OrganizationApi'
import RemunerativeApi from '../../api-services/RemunerativeApi'
import ReviewGroupApi from '../../api-services/ReviewGroupApi'
import Toastify from "toastify-js"
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
const API_ROOT = import.meta.env.VITE_API_ROOT;
import { ref, provide, onMounted } from "vue";
import { mapGetters } from 'vuex';
export default {
    name: 'CreateRemunerative',
    components: {  
        Form,
        Field,
    },
    props: ['dataImage'],
    computed: mapGetters('auth', ['iduser']),
    data() {
        const schema = Yup.object().shape({
            rewardedPO: Yup.string()
                .required('Vui lòng chọn khen thưởng.'),
            reviewGroup: Yup.string()
                .required('Vui lòng chọn nhóm xét duyệt.'),
            content: Yup.string()
                .required('Vui lòng nhập nội dung khen thưởng.'),
            description: Yup.string()
                .required('Vui lòng nhập mô tả chi tiết.'),
        });
        return {
            schema,
            api: API_ROOT,
            resultFile: [],
            result_group: {},
            result_user: {},
            result_organization: {},
            data_create: {
                status: "",
                type: 2,
                description: "",
                rewardContent: "",
                rewardedPersonId: "",
                organizationId: "",
                files: [],
                reviewGroupId: "",
                proposer: ""                                                                                                                                                                                                                                                                                                                                                   
            },
        }
    },
    created() {
        this.group();
        this.user();
        this.organization();
        this.data_create.proposer = this.iduser;
    }, 
    watch: {},
    computed: mapGetters('auth', ['iduser']),
    methods: {
        async group() {
            const res = await ReviewGroupApi.getReviewGroups(JSON.stringify({}));
            this.result_group = res.data;
        },
        async user() {
            const res = await UserApi.getListUser(JSON.stringify({}));
            this.result_user = res.data;
        },
        async organization() {
            const res = await OrganizationApi.getListOrganization();
            this.result_organization = res.data;
        },
        async createReward(status) {
            let inputParams  = {
            rewardedPO : this.data_create.type == 2 ? this.data_create.rewardedPersonId : this.data_create.organizationId ,
            reviewGroup: this.data_create.reviewGroupId,
            content: this.data_create.rewardContent,
            description: this.data_create.description,
            }
            this.schema
            .validate(inputParams)
            .then(async () => {
                var params;
                if(this.data_create.type == 2) {
                    params = {
                        status : status,
                        type: this.data_create.type,
                        description : this.data_create.description,
                        rewardContent : this.data_create.rewardContent,
                        rewardedPerson : this.data_create.rewardedPersonId,
                        files : JSON.parse(JSON.stringify(this.resultFile)),
                        reviewGroupId : this.data_create.reviewGroupId,
                        proposer : this.data_create.proposer
                    }
                }else{
                    params = {
                        status : status,
                        type: this.data_create.type,
                        description : this.data_create.description,
                        rewardContent : this.data_create.rewardContent,
                        organization : this.data_create.organizationId,
                        files : JSON.parse(JSON.stringify(this.resultFile)),
                        reviewGroupId : this.data_create.reviewGroupId,
                        proposer : this.data_create.proposer
                    }
                }
            const res = await RemunerativeApi.createRemuneratives(JSON.stringify(params));
            if (res) {
                this.goHome();
                Toastify({
                    node: dom("#success-notification-content")
                    .clone()
                    .removeClass("hidden")[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                }).showToast();  
            };
            })
        },

        goHome() {
            this.$router.push('/remunerative/nominated/list-nominated');
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
                var checkFileExist = array.find(x =>{
                    x == responseFile.data
                } );
                if (checkFileExist === undefined) {
                    array = [...array, ...responseFile.data];
                } else {
                    elDropzoneMultipleRef.dropzone.removedfile(file);
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
                var array = array.filter(function (list_item) {
                    return list_item != responseFile.data;
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

.invalid-feedback{
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

    .group{
        padding-right: 1.25rem;
    }

    .calendar {
        margin-top: unset;
    }
}
</style>