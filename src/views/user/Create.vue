<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4">Tạo Nhân Viên</h2>
        <div>
            <ModalBody>
                <Form @submit="createUser" :validation-schema="schema" v-slot="{ errors }" enctype="multipart/form-data">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex justify-center items-center loading" v-if="loadingIconAction">
                            <LoadingIcon icon="three-dots" class="w-20 h-20" />
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="name"
                                    class="form-control pr-10"
                                    :class="{ 'is-invalid': errors.name }"
                                    v-model="dataCreate.name"
                                    placeholder="Nhập tên"
                                />
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Email:</label>
                                <Field
                                    type="email"
                                    name="email"
                                    class="form-control pr-10"
                                    :class="{ 'is-invalid': errors.email }"
                                    v-model="dataCreate.email"
                                    placeholder="Nhập email"
                                />
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                        </div>

                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 mt-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Mật khẩu:</label>
                                <Field
                                    type="password"
                                    name="password"
                                    class="form-control pr-10"
                                    :class="{ 'is-invalid': errors.password }"
                                    v-model="dataCreate.password"
                                    placeholder="Nhập mật khẩu"
                                />
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Bộ phận:</label>
                                <Field
                                    as="select"
                                    name="organization"
                                    class="form-select"
                                    :class="{ 'is-invalid': errors.organization }"
                                    v-model="dataCreate.organization"
                                >
                                    <option v-for="(item, index) in result_organization" :key="index" :value="item.id">
                                        {{ item.organizationName }}
                                    </option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.organization }}</div>
                            </div>
                        </div>

                        <div class="flex justify-start gap-5 pl-5 pr-5 mt-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Phân quyền:</label>
                                <Field as="select" name="role" class="form-select" :class="{ 'is-invalid': errors.role }" v-model="dataCreate.roleId">
                                    <option v-for="(item, index) in result_decentralization" :key="index" :value="item.id">{{ item.name }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.role }}</div>
                            </div>
                        </div>

                        <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                            <label for="regular-form-1" class="form-label text-base">Hình đại diện:</label>
                            <div class="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                    <img class="rounded-md" alt="Midone Tailwind HTML Admin Template" v-if="url" :src="url" />
                                    <Tippy
                                        tag="div"
                                        content="Remove this profile photo?"
                                        class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                        v-if="url != avatarDefault"
                                        @click="delImage"
                                    >
                                        <xIcon class="w-4 h-4" />
                                    </Tippy>
                                </div>
                                <div class="mx-auto cursor-pointer relative mt-5">
                                    <button type="button" class="btn btn-primary w-full">Chọn ảnh</button>
                                    <input
                                        type="file"
                                        name="file"
                                        @change="onImageChange"
                                        ref="uploadImage"
                                        :class="{ 'is-invalid': errors.file }"
                                        class="w-full h-full top-0 left-0 absolute opacity-0"
                                    />
                                    <div class="invalid-feedback" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoListUser">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit">Thêm</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
            <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
                <CheckCircleIcon class="text-success" />
                <div class="ml-1 mr-2 message-toast">
                    <div class="text-slate-500">Thêm thành công!</div>
                </div>
            </div>
            <div id="false-create" class="toastify-content toastify-content-update hidden flex">
                <CheckCircleIcon class="text-danger" />
                <div class="ml-1 mr-2 message-toast">
                    <div class="text-slate-500">Có lỗi trong quá trình tạo nhân viên!</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RoleApi from '../../api-services/RoleApi'
import OrganizationApi from '../../api-services/OrganizationApi'
import UserApi from '../../api-services/UserApi'
import Toastify from 'toastify-js'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import avatarDefault from '@/assets/images/avatar-default.png'
export default {
    name: 'CreateUser',
    components: { Field, Form },
    data() {
        const schema = Yup.object().shape({
            name: Yup.string().required('Vui lòng nhập tên.'),
            email: Yup.string().required('Vui lòng nhập email.').email('Email không đúng định dạng.'),
            password: Yup.string().required('Mật khẩu không được để trống.'),
            organization: Yup.string().required('Vui lòng chọn bộ phận.')
        })
        return {
            schema,
            loadingIconAction: false,
            result_organization: {},
            result_decentralization: {},
            isCamera: 1,
            filename: null,
            checkFile: 0,
            errorImages: [],
            dataCreate: {
                loginName: '',
                password: '',
                name: '',
                email: '',
                userType: 1,
                roleId: '',
                organization: '',
                image: ''
            },
            url: avatarDefault
        }
    },
    created() {
        this.organization()
        this.decentralization()
        if (this.$route?.query?.employeeId != undefined) {
            this.isCamera = 0
        }
    },
    watch: {},
    methods: {
        async organization() {
            const res = await OrganizationApi.getListOrganization()
            this.result_organization = res.data
        },

        async decentralization() {
            const res = await RoleApi.getListDecentralization(JSON.stringify({}))
            this.result_decentralization = res.data
        },

        async createUser() {
            let isCamera = 1
            let formData = new FormData()

            if (this.$route?.query?.employeeId != undefined) {
                let idUser = this.$route?.query?.employeeId
                isCamera = 0
                formData.append('idUser', idUser)
            }
            if (this.checkFile || this.isCamera) {
                this.validateImage()
                formData.append('fileCamera', this.$refs.uploadImage.files[0])
            }

            formData.append('isCamera', isCamera)
            formData.append('loginName', this.dataCreate.loginName)
            formData.append('password', this.dataCreate.password)
            formData.append('name', this.dataCreate.name)
            formData.append('email', this.dataCreate.email)
            formData.append('userType', this.dataCreate.userType)
            formData.append('roleId', this.dataCreate.roleId)
            formData.append('organization', this.dataCreate.organization)
            this.loadingIconAction = true
            const res = await UserApi.createUser(formData)
            if (res.data.statusCodeValue == 201) {
                this.gotoListUser()
                Toastify({
                    node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
                this.loadingIconAction = false
            } else {
                Toastify({
                    node: dom('#false-create').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
                this.loadingIconAction = false
            }
        },
        validateImage() {
            let file = this.$refs.uploadImage.files[0]
            let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
            this.errorImages = []

            if (!file) {
                this.errorImages.push('Vui lòng chọn hình ảnh')
                return
            }

            if (!allowedTypes.includes(file.type)) {
                this.errorImages.push('Loại tệp không hợp lệ. Chỉ cho phép jpeg, png và jpg.')
                return
            }

            if (file.size > 500000) {
                this.errorImages.push('Kích thước tệp quá lớn. Kích thước tối đa là 500KB.')
                return
            }
        },

        onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.checkFile = 1
            this.url = URL.createObjectURL(files[0])
        },
        delImage() {
            this.checkFile = 0
            this.url = avatarDefault
            this.$refs.uploadImage.value = ''
            this.filename = null
        },
        gotoListUser() {
            this.$router.push('/user/list-user')
        },
        onChange() {
            console.log('Picture changed!')
        }
    }
}
</script>
<script setup>
import { ref } from 'vue'
const userMultiple = ref([])
</script>
<style scoped>
.invalid-feedback {
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

.loading {
    height: 100%;
    width: 100%;
    background-color: rgb(0 0 0 / 5%);
    z-index: 2000;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
