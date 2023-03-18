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
        <h2 class="intro-y text-lg font-medium mt-4">Tạo User</h2>
        <div>
            <ModalBody>
                <Form @submit="create_user" :validation-schema="schema" v-slot="{ errors }">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field type="text" name="name" class="form-control pr-10"  :class="{ 'is-invalid': errors.name }" v-model="dataCreate.name" placeholder="Nhập tên"/>
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Email:</label>
                                <Field type="email" name="email" class="form-control pr-10"  :class="{ 'is-invalid': errors.email }" v-model="dataCreate.email" placeholder="Nhập email"/>
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                        </div>

                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 mt-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Mật khẩu:</label>
                                <Field type="password" name="password" class="form-control pr-10"  :class="{ 'is-invalid': errors.password }" v-model="dataCreate.password" placeholder="Nhập mật khẩu"/>
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Bộ phận:</label>
                                <Field as="select" name="organization" class="form-select"  :class="{ 'is-invalid': errors.organization }" v-model="dataCreate.organization">
                                    <option v-for="(item, index) in result_organization" :key="index" :value="item.id">{{ item.organizationName }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.organization }}</div>
                            </div>
                        </div>

                        <div class="flex justify-start gap-5 pl-5 pr-5 mt-5 form-create">
                 
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Phân quyền:</label>
                                <Field as="select" name="role" class="form-select"  :class="{ 'is-invalid': errors.role }" v-model="dataCreate.roleId">
                                    <option v-for="(item, index) in result_decentralization" :key="index" :value="item.id">{{ item.name }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.role }}</div>
                            </div>
                        </div>

                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoListUser">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" >Thêm</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>
    </div>
</template>
<script>
import RoleApi from '../../../api-services/RoleApi'
import OrganizationApi from '../../../api-services/OrganizationApi'
import UserApi from '../../../api-services/UserApi'
import Toastify from "toastify-js"
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
export default {
    name: 'CreateUser',
    components: { Field, Form },
    data() { 
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Vui lòng nhập tên.'),
            email: Yup.string()
                .required('Vui lòng nhập email.')
                .email('Email không đúng định dạng.'),
            password: Yup.string()
                .required('Mật khẩu không được để trống.'),
            organization: Yup.string()
                .required('Vui lòng chọn bộ phận.'),
            role: Yup.string()
                .required('Vui lòng chọn phân quyền.'),
        });
        return {
            schema,
            result_organization: {},
            result_decentralization: {},
            dataCreate: {
                loginName: "",
                password: "",
                name: "",
                email: "",
                userType: 1,
                roleId: "",
                organization: "",
            },
        }
    },
    created() {
        this.organization();
        this.decentralization();
    },
    watch: {},
    methods: {
        async organization() {
            const res = await OrganizationApi.getListOrganization();
            this.result_organization = res.data;
        },

        async decentralization() {
            const res = await RoleApi.getListDecentralization(JSON.stringify({}));
            this.result_decentralization = res.data;
        },

        async create_user() {
            let params = {
                loginName : this.dataCreate.loginName,
                password : this.dataCreate.password,
                name : this.dataCreate.name,
                email : this.dataCreate.email,
                userType : this.dataCreate.userType,
                roleId : this.dataCreate.roleId,
                organization : this.dataCreate.organization,
            }
            const res = await UserApi.createUser(JSON.stringify(params));
            if (res) {
                this.gotoListUser();
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
        },

        gotoListUser() {
            this.$router.push('/user/list-user');
        }
    },
}

</script>
<script setup>
    import { ref } from "vue";
    const userMultiple = ref([]);
</script>
<style scoped>
.invalid-feedback{
    color: red;
    margin-top: 8px;
}
.toastify .toastify-content-update {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 2.5rem;
  padding-left: 0px;
}

.form_checkbox {
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 20px 20px;
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
