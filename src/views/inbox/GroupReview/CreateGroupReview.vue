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
        <h2 class="intro-y text-lg font-medium mt-4">Tạo nhóm xét duyệt</h2>
        <div>
            <ModalBody>
                <Form @submit="create_group" :validation-schema="schema" v-slot="{ errors }">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên nhóm:</label>
                                <Field type="text" name="name" class="form-control pr-10" :class="{ 'is-invalid': errors.name }" placeholder="Nhập tên" v-model="dataCreate.name" />
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Người phụ trách:</label>
                                <TomSelect class="w-full" placeholder="Chọn người phụ trách" multiple v-model="dataCreate.users">
                                    <option v-for="(item, index) in userList" :key="index" :value="item.id">{{item.name  }}</option>
                        
                                </TomSelect>
                                <div class="validate-select" v-show="show  && dataCreate.users.length == 0">Vui lòng Chọn người phụ trách</div>
                            </div>
                        </div>
                        <div class="mt-4 pl-5 pr-5">
                            <label for="regular-form-1" class="form-label text-base">Mô tả:</label>
                            <Field as="textarea" class="form-control" name="comment" :class="{ 'is-invalid': errors.comment }" rows="10"
                                placeholder="Vui lòng nhập nội dung" v-model="dataCreate.description"></Field>
                            <div class="invalid-feedback">{{ errors.comment }}</div>   
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoPageGroupReview">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" @click="checkValidate()">Thêm</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>
    </div>
</template>
<script>
import ReviewGroupApi from '../../../api-services/ReviewGroupApi'
import RoleApi from '../../../api-services/RoleApi'
import Toastify from "toastify-js"
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
export default {
    name: 'CreateGroupReview',
    components: { Field, Form },
    data() { 
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Vui lòng nhập tên nhóm.'),
            comment: Yup.string()
                .required('Vui lòng nhập mô tả.')
        });
        return {
            schema,
            show: false,
            userList : [],
            dataCreate: {
                name: "",
                description: "",
                users: [],
            },
        }
    },
    created() { 
        this.getListUser();
    },
    watch: {},
    methods: {
       async getListUser(){
            const res = await RoleApi.getListUser(JSON.stringify({}));
            this.userList = res.data
        },
        checkValidate() {
            if (this.dataCreate.users == null || this.dataCreate.users.length == 0) {
                this.show = true
            }
        },
        async create_group() {
            this.isClicked = true;
            let params = {
                name : this.dataCreate.name,
                description : this.dataCreate.description,
                users : this.dataCreate.users,
            }
            if (this.dataCreate.users.length > 0) {
                const res = await ReviewGroupApi.setReviewGroups(JSON.stringify(params));
                if (res) {
                    this.gotoPageGroupReview();
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
            };
        },
        gotoPageGroupReview() {
            this.$router.push('/remunerative/group-review');
        }
    },
}

</script>
<script setup>
    import { ref } from "vue";
    const userMultiple = ref([]);
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

.validate-select {
    color: red;
    margin-top: 8px;
}

@media screen and (max-width: 576px) {

    .modal-body .form-create {
        flex-direction: column;
    }

    .form-create .create-layout {
        width: 100%;
    }
}
</style>
