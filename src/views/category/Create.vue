<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">{{ $route?.query?.id == undefined ? "Tạo danh mục" : "Cập nhập danh mục" }}</h2>
        <div>
            <ModalBody>
                <Form @submit="createCategory" :validation-schema="schema" v-slot="{ errors }"
                    enctype="multipart/form-data">
                    <div class="mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field type="text" name="name" class="form-control pr-10"
                                    :class="{ 'is-invalid': errors.name }" v-model="dataCreate.name"
                                    placeholder="Nhập tên danh mục" />
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                        </div>
                        <div class="mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="goToFolderList">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit">{{ $route?.query?.id == undefined ?
                                "Thêm" : "Cập nhập" }}</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>

        <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    {{ $route?.query?.id == undefined ? "Thêm thành công !" : "Cập nhập thành công !" }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Toastify from "toastify-js"
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate'
import CategoryNewsApi from '../../api-services/CategoryNewsApi'
export default {
    name: 'CreateCategory',
    components: { Field, Form },
    data() {
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Vui lòng nhập tên.'),
        });
        return {
            schema,
            dataCreate: {
                name: "",
            },
        }
    },
    created() {
        this.getCategory();
    },
    watch: {},
    methods: {
        async createCategory() {
            this.dataCreate;
            let params = {
                name: this.dataCreate.name,
            }
            if (this.$route?.query?.id != undefined) {

                const res = await CategoryNewsApi.edit(this.id, JSON.stringify(params));
            } else {
                const res = await CategoryNewsApi.create(JSON.stringify(params));
            }
            this.goToFolderList();
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
        async getCategory() {
            console.log(this.$route?.query?.id != undefined);
            if (this.$route?.query?.id != undefined) {
                const dataDetail = await CategoryNewsApi.detail(this.$route?.query?.id);
                console.log(1111)
                this.id = this.$route?.query?.id;
                this.dataCreate.name = dataDetail.data.name;
            }
        },
        goToFolderList() {
            this.$router.push({ path: '/category-news/list' })
        }
    },
}

</script>

<style scoped>
.toastify .toastify-content-update {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 2.5rem;
    padding-left: 0px;
}

#success-notification-content .text-success {
    margin-right: -10px;
    width: 65px;
}

.message-toast {
    display: flex;
    align-items: center;
}

.form_checkbox {
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 20px 20px;
}

.invalid-feedback {
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
