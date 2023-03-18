<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Tạo bãi đỗ xe</h2>
        <div>
            <ModalBody>
                <Form class="formNews" @submit="createParking" :validation-schema="schema" v-slot="{ errors }" enctype="multipart/form-data">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="name"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.name }"
                                    placeholder="Nhập tên"
                                    v-model="parkingLots.name"
                                />
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="email"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.email }"
                                    placeholder="Nhập email"
                                    v-model="parkingLots.email"
                                />
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.phone }"
                                    placeholder="Nhập só điện thoại"
                                    v-model="parkingLots.phone"
                                />
                                <div class="invalid-feedback">{{ errors.phone }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="address"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.address }"
                                    placeholder="Nhập tên"
                                    v-model="parkingLots.address"
                                />
                                <div class="invalid-feedback">{{ errors.address }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="openingHours"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.openingHours }"
                                    placeholder="Nhập tên"
                                    v-model="parkingLots.openingHours"
                                />
                                <div class="invalid-feedback">{{ errors.openingHours }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    type="text"
                                    name="closingHours"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.closingHours }"
                                    placeholder="Nhập tên"
                                    v-model="parkingLots.closingHours"
                                />
                                <div class="invalid-feedback">{{ errors.closingHours }}</div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-full create-layout">
                                <label for="regular-form-1" class="form-label text-base">Tên:</label>
                                <Field
                                    as="textarea"
                                    type="text"
                                    rows="6"
                                    name="desc"
                                    class="form-control pr-10 w-full"
                                    :class="{ 'is-invalid': errors.desc }"
                                    placeholder="Nhập tên"
                                    v-model="parkingLots.desc"
                                />
                                <div class="invalid-feedback">{{ errors.desc }}</div>
                            </div>
                        </div>
                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2">Hủy</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit">Thêm</button>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </div>
        <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Thêm thành công</div>
            </div>
        </div>
    </div>
</template>

<script>
import Toastify from 'toastify-js'

import { createParking } from '@/firebase'
import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'

export default {
    components: { Field, Form },
    data() {
        const schema = Yup.object().shape({
            name: Yup.string().required('Vui lòng nhập tên.'),
            address: Yup.string().required('Vui lòng nhập địa chỉ.'),
            email: Yup.string().required('Vui lòng nhập email.'),
            phone: Yup.string().required('Vui lòng nhập số điện thoại.'),
            openingHours: Yup.string().required('Vui lòng nhập giờ bất đầu.'),
            closingHours: Yup.string().required('Vui lòng nhập giờ kết thúc.'),
            desc: Yup.string().required('Vui lòng nhập chi tiết.')
        })
        return {
            schema,
            parkingLots: {
                name: '',
                address: '',
                email: '',
                phone: '',
                openingHours: '',
                closingHours: '',
                desc: ''
            }
        }
    },
    methods: {
        async createParking() {
            await createParking({ ...this.parkingLots })
            Toastify({
                node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
            }).showToast()
        }
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
