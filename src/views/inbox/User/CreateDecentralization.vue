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
        <h2 class="intro-y text-lg font-medium mt-4">Tạo Phân quyền</h2>
        <div>
            <ModalBody>
            <Form @submit="create_decentralization" :validation-schema="schema" v-slot="{ errors }">
                <div class="mx-auto w-11/12 p-3 box">
                    <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                        <div class="w-1/2 create-layout">
                            <label for="regular-form-1" class="form-label text-base">Tên:</label>
                            <Field type="text" name="name" class="form-control pr-10"  :class="{ 'is-invalid': errors.name }" v-model="dataCreate.name" placeholder="Nhập tên"/>
                            <div class="invalid-feedback">{{ errors.name }}</div>
                        </div>
                        <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Bộ phận:</label>
                                <Field as="select" name="organization_id" class="form-select"  :class="{ 'is-invalid': errors.organization }" v-model="dataCreate.organization_id">
                                    <option v-for="(item, index) in result_organization" :key="index" :value="item.id">{{ item.organizationName }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.organization_id }}</div>
                            </div>
                    </div>
                    <div class="form_checkbox flex flex-row box">
                        <div class="checkbox1 p-4 mx-auto">
                            <div class="layout mt-2">
                                <div class="layout-custom">
                                    <input class="form-check-input" type="checkbox" v-model="check"/>
                                <label class="ml-2 text-base">Danh sách đề cử</label> 
                                </div>
                
                                <div class="check flex flex-col ml-5 mt-2 mb-3">
                                    <div class="check1">
                                        <input class="form-check-input" type="checkbox" value="3" v-model="dataCreate.menu" :disabled="!check"/>
                                        <label class="ml-2">Khen thưởng cá nhân</label>
                                    </div>
                                    <div class="check1">
                                        <input class="form-check-input" type="checkbox" value="4" v-model="dataCreate.menu" :disabled="!check"/>
                                        <label class="ml-2">Khen thưởng bộ phận</label>
                                    </div>
                                </div>
                            </div>
                            <div class="layout layout-custom mt-2">
                                <input class="form-check-input" type="checkbox" value="7" v-model="dataCreate.menu"/>
                                <label class="ml-2 text-base">Danh sách nhóm xét duyệt</label> 
                            </div>
                        </div>
                        <div class="checkbox1 p-4 mx-auto">
                            <div class="layout layout-custom mt-2">
                                <input class="form-check-input" type="checkbox" value="5" v-model="dataCreate.menu"/>
                                <label class="ml-2 text-base">Danh sách lịch sử khen thưởng</label> 
                            </div>
                            <div class="layout layout-custom mt-2">
                                <input class="form-check-input" type="checkbox" value="8" v-model="dataCreate.menu"/>
                                <label class="ml-2 text-base">Danh sách tiến cử</label> 
                            </div>
                        </div>
                        <div class="checkbox1 p-4 mx-auto">
                            <div class="layout layout-custom mt-2">
                                <input class="form-check-input" type="checkbox" value="6" v-model="dataCreate.menu"/>
                                <label class="ml-2 text-base">Tạo khen thưởng</label> 
                            </div>
                            <div class="layout layout-custom mt-2">
                                <input class="form-check-input" type="checkbox" value="9" v-model="dataCreate.menu"/>
                                <label class="ml-2 text-base">Danh sách quản lý tập tin</label> 
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 mx-auto text-center">
                        <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoListDecentralization">Hủy</button>
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
import Toastify from "toastify-js"
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
export default {
    name: 'CreateDecentralization',
    components: { Field, Form },
    data() { 
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Vui lòng nhập tên.'),
            organization_id: Yup.string()
                .required('Vui lòng chọn bộ phận.')
        });
        return {
            schema,
            check: false,
            result: {},
            result_organization: {},
            dataCreate: {
                name: "",
                organization_id: "",
                menu: [],
            },
        }
    },
    created() {
        this.organization();
    },
    watch: {},
    methods: {
        async organization() {
            const res = await OrganizationApi.getListOrganization();
            this.result_organization = res.data;
        },

        async create_decentralization() {
            this.dataCreate;
            let params = {
                name : this.dataCreate.name,
                organization : this.dataCreate.organization_id,
                menus : Object.values(this.dataCreate.menu)
            }
            const res = await RoleApi.createDecentralization(JSON.stringify(params));
            this.result = res.data;
            this.gotoListDecentralization();
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
        },

        gotoListDecentralization() {
            this.$router.push('/user/list-decentralization');
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

.check1{
    margin-top: 10px;
}

.invalid-feedback{
    color: red;
    margin-top: 8px;
}
</style>
