<template>
    <div ref="outSideClickNews">
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Tạo chổ đỗ xe</h2>
        <div class="intro-y ml-20 w-80 p-3 box z-index mb-5">
            <div class="flex flex-row justify-left gap-5 pl-5 pr-5 form-create">
                <div class="w-full create-layout">
                    <label for="regular-form-1" class="form-label text-base">Bãi đổ xe:</label>
                    <select class="form-select" name="parkingLotRef" v-model="parkingSlots.parkingLotRef" @click="onParking">
                        <option v-for="item in listParkingSlot" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="parkingSlots.parkingLotRef !== ''">
            <div class="grid grid grid-cols-4 grap-10 justify-items-center">
                <div>
                    <div class="text-center mb-5">A</div>
                    <div
                        v-for="item in slotA"
                        :key="item.id"
                        class="mb-4"
                        v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto' }"
                        @click="onToggle(item.id, item.location)"
                    >
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                A{{ item.id }}
                            </div>
                            <div
                                class="block mt-3 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Loại xe: {{ item.type }}
                            </div>
                            <div
                                class="block mt-2 mb-2 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Giá: {{ item.price }}
                            </div>
                            <div
                                class="flex items-center justify-center"
                                v-bind:style="{ opacity: item.type == '' ? '0.6' : '1' }"
                                style="pointer-events: auto"
                            >
                                <a
                                    class="flex items-center mr-3"
                                    href=""
                                    @click.prevent.stop="updateSlot(item.idSlot, item.location, item.type, item.price)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    Edit </a
                                ><a class="flex items-center text-danger" href="#" @click.prevent.stop="deleteSlot(item.idSlot, item.type)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center mb-5">B</div>
                    <div
                        v-for="item in slotB"
                        :key="item.id"
                        class="mb-4"
                        @click="onToggle(item.id, item.location)"
                        v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto' }"
                    >
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                B{{ item.id }}
                            </div>
                            <div
                                class="block mt-3 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Loại xe: {{ item.type }}
                            </div>
                            <div
                                class="block mt-2 mb-2 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Giá: {{ item.price }}
                            </div>
                            <div
                                class="flex items-center justify-center"
                                v-bind:style="{ opacity: item.type == '' ? '0.6' : '1' }"
                                style="pointer-events: auto"
                            >
                                <a
                                    class="flex items-center mr-3"
                                    href=""
                                    @click.prevent.stop="updateSlot(item.idSlot, item.location, item.type, item.price)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    Edit </a
                                ><a class="flex items-center text-danger" href="#" @click.prevent.stop="deleteSlot(item.idSlot, item.type)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center mb-5">C</div>
                    <div
                        v-for="item in slotC"
                        :key="item.id"
                        class="mb-4"
                        @click="onToggle(item.id, item.location)"
                        v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto' }"
                    >
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                C{{ item.id }}
                            </div>
                            <div
                                class="block mt-3 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Loại xe: {{ item.type }}
                            </div>
                            <div
                                class="block mt-2 mb-2 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Giá: {{ item.price }}
                            </div>
                            <div
                                class="flex items-center justify-center"
                                v-bind:style="{ opacity: item.type == '' ? '0.6' : '1' }"
                                style="pointer-events: auto"
                            >
                                <a
                                    class="flex items-center mr-3"
                                    href=""
                                    @click.prevent.stop="updateSlot(item.idSlot, item.location, item.type, item.price)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    Edit </a
                                ><a class="flex items-center text-danger" href="#" @click.prevent.stop="deleteSlot(item.idSlot, item.type)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center mb-5">D</div>
                    <div
                        v-for="item in slotD"
                        :key="item.id"
                        class="mb-4"
                        @click="onToggle(item.id, item.location)"
                        v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto' }"
                    >
                        <div class="relative p-3 rounded-md box zoom-in">
                            <div
                                class="text-center cursor-pointer block appearance-none px-5 border-transparent dark:text-white rounded-md border-0 bg-primary text-white font-medium w-full py-2"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                D{{ item.id }}
                            </div>
                            <div
                                class="block mt-3 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Loại xe: {{ item.type }}
                            </div>
                            <div
                                class="block mt-2 mb-2 font-medium text-left truncate"
                                v-bind:style="{ 'pointer-events': item.type != '' ? 'none' : 'auto', opacity: item.type != '' ? '0.6' : '1' }"
                            >
                                Giá: {{ item.price }}
                            </div>
                            <div
                                class="flex items-center justify-center"
                                v-bind:style="{ opacity: item.type == '' ? '0.6' : '1' }"
                                style="pointer-events: auto"
                            >
                                <a
                                    class="flex items-center mr-3"
                                    href=""
                                    @click.prevent.stop="updateSlot(item.idSlot, item.location, item.type, item.price)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    Edit </a
                                ><a class="flex items-center text-danger" href="#" @click.prevent.stop="deleteSlot(item.idSlot, item.type)"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-4 h-4 mr-1"
                                    >
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-if="isModalVisible" class="h-0">
                <div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0 modalslot"></div>
                <div class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white top-500">
                    <div>
                        <ModalBody v-if="isSubmit == 0">
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
                                                disabled
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
                                                disabled
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
                                        <button class="btn btn-primary w-24 mb-2" type="submit" @click="createSlots">Thêm</button>
                                    </div>
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalBody v-if="isSubmit == 1">
                            <Form
                                class="formNews"
                                @submit="updateSlots"
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
                                                disabled
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
                                                disabled
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
                                        <button class="btn btn-primary w-24 mb-2" type="submit" @click="createSlots">Cập nhật</button>
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
                <div class="text-slate-500">{{ isSubmit == 0 ? 'Thêm thành công' : 'Cập nhật thành công' }}</div>
            </div>
        </div>
        <div id="delete-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success ml-2" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">xóa thành công</div>
            </div>
        </div>
    </div>
</template>

<script>
import Toastify from 'toastify-js'

import { db, createParkingSlot, updateParkingSlot } from '@/firebase'

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
            idUpdate: 0,
            getParkingSlots: [],
            isSubmit: 0,
            isOpen: false,
            slotA: [
                {
                    id: 1,
                    location: 'A1',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 2,
                    location: 'A2',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 3,
                    location: 'A3',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 4,
                    location: 'A4',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 5,
                    location: 'A5',
                    price: '',
                    type: '',
                    status: true
                }
            ],
            slotB: [
                {
                    id: 1,
                    location: 'B1',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 2,
                    location: 'B2',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 3,
                    location: 'B3',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 4,
                    location: 'B4',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 5,
                    location: 'B5',
                    price: '',
                    type: '',
                    status: true
                }
            ],
            slotC: [
                {
                    id: 1,
                    location: 'C1',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 2,
                    location: 'C2',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 3,
                    location: 'C3',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 4,
                    location: 'C4',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 5,
                    location: 'C5',
                    price: '',
                    type: '',
                    status: true
                }
            ],
            slotD: [
                {
                    id: 1,
                    location: 'D1',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 2,
                    location: 'D2',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 3,
                    location: 'D3',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 4,
                    location: 'D4',
                    price: '',
                    type: '',
                    status: true
                },
                {
                    id: 5,
                    location: 'D5',
                    price: '',
                    type: '',
                    status: true
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
            this.isSubmit = 0
            this.isOpen = !this.isOpen
            this.parkingSlots.location = location
            this.parkingSlots.type = ''
            this.parkingSlots.price = ''
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
            this.parkingSlots.type = ''
            this.parkingSlots.price = ''
            this.onParking()
            this.isOpen = !this.isOpen
        },
        onParking() {
            this.fillParkingSlot()
            if (this.parkingSlots != '') {
                this.slotA.map((item) => {
                    item.type = ''
                    item.price = ''
                })
                this.slotB.map((item) => {
                    item.type = ''
                    item.price = ''
                })
                this.slotC.map((item) => {
                    item.type = ''
                    item.price = ''
                })
                this.slotD.map((item) => {
                    item.type = ''
                    item.price = ''
                })
                this.getParkingSlot()
                this.fillParkingSlot()
            }
        },
        async getParkingSlot() {
            const parkingSlotsRef = db.collection('parkingSlots')

            const res = await parkingSlotsRef.get()
            res.forEach((doc) => {
                const data = doc.data()
                Object.assign(data, { id: doc.id })
                this.getParkingSlots.push(data)
            })
            this.fillParkingSlot()
        },
        fillParkingSlot() {
            this.getParkingSlots.map((item) => {
                if (this.getParkingSlots != null && this.parkingSlots.parkingLotRef == item.parkingLotRef) {
                    if (item.location.charAt(0) == 'A') {
                        this.slotA.map((item2, index) => {
                            if (item.location == item2.location) {
                                Object.assign(item2, { price: item.price, type: item.type, idSlot: item.id })
                            }
                        })
                    } else if (item.location.charAt(0) == 'B') {
                        this.slotB.map((item3, index) => {
                            if (item.location == item3.location) {
                                Object.assign(item3, { price: item.price, type: item.type, idSlot: item.id })
                            }
                        })
                    } else if (item.location.charAt(0) == 'C') {
                        this.slotC.map((item4, index) => {
                            if (item.location == item4.location) {
                                Object.assign(item4, { price: item.price, type: item.type, idSlot: item.id })
                            }
                        })
                    } else if (item.location.charAt(0) == 'D') {
                        this.slotD.map((item5, index) => {
                            if (item.location == item5.location) {
                                Object.assign(item5, { price: item.price, type: item.type, idSlot: item.id })
                            }
                        })
                    }
                }
            })
        },
        async createSlots() {
            const parkingSlotsRef = db.collection('parkingSlots')
            const res = await parkingSlotsRef.get()
            res.forEach((doc) => {
                const data = doc.data()
                if (data.location.charAt(0) == 'A') {
                    this.slotA.map((item2, index) => {
                        if (data.location == item2.location) {
                            Object.assign(item2, { price: data.price, type: data.type, idSlot: doc.id })
                        }
                    })
                } else if (data.location.charAt(0) == 'B') {
                    this.slotB.map((item2, index) => {
                        if (data.location == item2.location) {
                            Object.assign(item2, { price: data.price, type: data.type, idSlot: doc.id })
                        }
                    })
                } else if (data.location.charAt(0) == 'C') {
                    this.slotC.map((item2, index) => {
                        if (data.location == item2.location) {
                            Object.assign(item2, { price: data.price, type: data.type, idSlot: doc.id })
                        }
                    })
                } else if (data.location.charAt(0) == 'D') {
                    this.slotD.map((item2, index) => {
                        if (data.location == item2.location) {
                            Object.assign(item2, { price: data.price, type: data.type, idSlot: doc.id })
                        }
                    })
                }
            })
        },
        updateSlot(id, location, type, price) {
            console.log('object')
            console.log(type)
            if (type != '') {
                this.isOpen = !this.isOpen
                this.isSubmit = 1
            } else {
                this.isSubmit = 0
            }
            console.log(this.isSubmit)
            this.parkingSlots.location = location
            this.parkingSlots.type = type
            this.parkingSlots.price = price
            this.idUpdate = id
        },
        async updateSlots() {
            console.log('object')
            await updateParkingSlot(this.idUpdate, { ...this.parkingSlots })
            Toastify({
                node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
            }).showToast()
            this.isSubmit = 0
            this.isOpen = !this.isOpen
        },
        deleteSlot(id, type) {
            if (type != '') {
                if (confirm('Bạn muốn xóa bãi đỗ xe này?')) {
                    const docId = id
                    const parkingLotsRef = db.collection('parkingSlots')
                    parkingLotsRef
                        .doc(docId)
                        .delete()
                        .then(() => {
                            console.log('Document successfully deleted!')
                            this.slotA.map((car) => {
                                console.log(id)
                                if (car.idSlot == id) {
                                    car.type = ''
                                    car.price = ''
                                }
                            })
                            this.slotB.map((car) => {
                                console.log(id)
                                if (car.idSlot == id) {
                                    car.type = ''
                                    car.price = ''
                                }
                            })
                            this.slotC.map((car) => {
                                console.log(id)
                                if (car.idSlot == id) {
                                    car.type = ''
                                    car.price = ''
                                }
                            })
                            this.slotD.map((car) => {
                                console.log(id)
                                if (car.idSlot == id) {
                                    car.type = ''
                                    car.price = ''
                                }
                            })

                            Toastify({
                                node: dom('#delete-notification-content').clone().removeClass('hidden')[0],
                                duration: 3000,
                                newWindow: true,
                                close: true,
                                gravity: 'top',
                                position: 'right',
                                stopOnFocus: true
                            }).showToast()
                            // this.listParking = []
                            // this.getParking()
                        })
                        .catch((error) => {
                            console.error('Error removing document: ', error)
                        })
                }
            }
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
    top: -800px;
    z-index: 9999;
}
.modalslot {
    top: -200px;
    left: -40px;
    right: -40px;
    bottom: -40px;
    z-index: 999;
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
.z-index {
    z-index: 0 !important;
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
