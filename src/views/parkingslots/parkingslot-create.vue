<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Tạo chổ đỗ xe</h2>
        <div class="intro-y ml-20 w-80 p-3 box">
            <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                <div class="w-full create-layout">
                    <label for="regular-form-1" class="form-label text-base">Bãi đổ xe:</label>
                    <select class="form-select" name="parkingLotRef" v-model="parkingSlots.parkingLotRef">
                        <option v-for="item in listParkingSlot" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="parkingSlots.parkingLotRef !== ''">
            <div class="grid grid grid-cols-4 grap-10 justify-items-center">
                <div>
                    <div class="text-center mb-5">A</div>
                    <div v-for="item in slotA" :key="item.id" class="mb-4" @click="onToggle(item.id, item.location)">
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                            >
                                A{{ item.id }}
                            </div>
                            <div class="block mt-3 font-medium text-center truncate">Crispy Mushroom</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center mb-5">B</div>
                    <div v-for="item in slotB" :key="item.id" class="mb-4" @click="onToggle">
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                            >
                                B{{ item.id }}
                            </div>
                            <div class="block mt-3 font-medium text-center truncate">Crispy Mushroom</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center mb-5">C</div>
                    <div v-for="item in slotC" :key="item.id" class="mb-4" @click="onToggle">
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                            >
                                C{{ item.id }}
                            </div>
                            <div class="block mt-3 font-medium text-center truncate">Crispy Mushroom</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center mb-5">D</div>
                    <div v-for="item in slotD" :key="item.id" class="mb-4" @click="onToggle">
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                            >
                                D{{ item.id }}
                            </div>
                            <div class="block mt-3 font-medium text-center truncate">Crispy Mushroom</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="isModalVisible">
                <div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
                <div class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white top-500">
                    <div>
                        <ModalBody>
                            <Form
                                class="formNews"
                                @submit="createParkingSlot"
                                :validation-schema="schema"
                                v-slot="{ errors }"
                                enctype="multipart/form-data"
                            >
                                <div class="intro-y mx-auto w-11/12 p-3 box">
                                    <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                                        <div class="w-1/2 create-layout">
                                            <label for="regular-form-1" class="form-label text-base">Bãi đổ xe:</label>
                                            <Field
                                                as="select"
                                                class="form-select"
                                                name="parkingLotRef"
                                                :class="{ 'is-invalid': errors.parkingLotRef }"
                                                v-model="parkingSlots.parkingLotRef"
                                            >
                                                <option v-for="item in listParkingSlot" :key="item.id" :value="item.id">{{ item.name }}</option>
                                            </Field>
                                            <div class="invalid-feedback">{{ errors.parkingLotRef }}</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                                        <div class="w-1/2 create-layout">
                                            <label for="regular-form-1" class="form-label text-base">Vị trí:</label>
                                            <Field
                                                type="text"
                                                name="location"
                                                class="form-control pr-10 w-full"
                                                :class="{ 'is-invalid': errors.location }"
                                                placeholder="Nhập vị trí"
                                                v-model="parkingSlots.location"
                                            />
                                            <div class="invalid-feedback">{{ errors.location }}</div>
                                        </div>
                                        <div class="w-1/2 create-layout">
                                            <label for="regular-form-1" class="form-label text-base">Loại xe:</label>
                                            <Field
                                                as="select"
                                                name="type"
                                                class="form-select"
                                                :class="{ 'is-invalid': errors.type }"
                                                v-model="parkingSlots.type"
                                            >
                                                <option value="Xe máy">Xe máy</option>
                                                <option value="Xe ô tô">Xe ô tô</option>
                                            </Field>
                                            <div class="invalid-feedback">{{ errors.type }}</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                                        <div class="w-1/2 create-layout">
                                            <label for="regular-form-1" class="form-label text-base">Giá tiền:</label>
                                            <Field
                                                type="number"
                                                name="price"
                                                class="form-control pr-10 w-full"
                                                :class="{ 'is-invalid': errors.price }"
                                                placeholder="Nhập giá tiền"
                                                v-model="parkingSlots.price"
                                            />
                                            <div class="invalid-feedback">{{ errors.price }}</div>
                                        </div>
                                    </div>

                                    <div class="intro-x mt-4 mx-auto text-center">
                                        <button class="btn btn-secondary w-24 mr-4 mb-2" @click="onToggle">Hủy</button>
                                        <button class="btn btn-primary w-24 mb-2" type="submit" @click="hehe">Thêm</button>
                                    </div>
                                </div>
                            </Form>
                        </ModalBody>
                    </div>
                </div>
            </div>
        </transition>
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

import { db, createParkingSlot } from '@/firebase'

import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'

export default {
    components: { Field, Form },
    data() {
        const schema = Yup.object().shape({
            location: Yup.string().required('Vui lòng nhập vị trí.'),
            type: Yup.string().required('Vui lòng nhập loại xe.'),
            price: Yup.number().typeError('Vui lòng nhập giá tiền').required('Vui lòng nhập giá tiền.')
        })
        return {
            schema,
            parkingSlots: {
                location: '',
                type: '',
                status: true,
                price: '',
                parkingLotRef: ''
            },
            isOpen: false,
            slotA: [
                {
                    id: 1,
                    location: 'A1'
                },
                {
                    id: 2,
                    location: 'A2'
                },
                {
                    id: 3,
                    location: 'A3'
                },
                {
                    id: 4,
                    location: 'A4'
                },
                {
                    id: 5,
                    location: 'A5'
                }
            ],
            slotB: [
                {
                    id: 1,
                    location: 'A1'
                },
                {
                    id: 2,
                    location: 'A2'
                },
                {
                    id: 3,
                    location: 'A3'
                },
                {
                    id: 4
                },
                {
                    id: 5
                }
            ],
            slotC: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                }
            ],
            slotD: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                }
            ],
            listParkingSlot: []
        }
    },
    created() {
        this.getParkingLot()
    },
    methods: {
        onToggle(id, location) {
            this.isOpen = !this.isOpen
            this.parkingSlots.location = location
        },
        hehe() {
            console.log(this.parkingSlots)
        },

        async getParkingLot() {
            const parkingLotsRef = db.collection('parkingLots')
            const parkingLotsSnapshot = await parkingLotsRef.get()
            parkingLotsSnapshot.forEach((doc) => {
                const data = doc.data()
                Object.assign(data, { id: doc.id })
                this.listParkingSlot.push(data)
            })
        },
        async createParkingSlot() {
            await createParkingSlot({ ...this.parkingSlots })
            Toastify({
                node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
            }).showToast()
            this.parkingSlots = {}
            this.isOpen = !this.isOpen
        }
    },
    computed: {
        isModalVisible() {
            return this.isOpen
        }
    }
}
</script>

<style scoped>
.top-500 {
    top: -500px;
}
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
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 500ms ease-out;
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
