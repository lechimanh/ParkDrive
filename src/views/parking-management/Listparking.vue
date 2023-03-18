<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Danh sách bãi đỗ xe</h2>
        <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                <button class="btn btn-primary shadow-md mr-2">Thêm</button>
            </div>
            <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
                <table class="table table-report -mt-2">
                    <thead>
                        <tr>
                            <th class="whitespace-nowrap">Tên</th>
                            <th class="whitespace-nowrap">Địa chỉ</th>
                            <th class="whitespace-nowrap">Số điện thoại</th>
                            <th class="whitespace-nowrap">Email</th>
                            <th class="whitespace-nowrap">Giờ bất đầu</th>
                            <th class="whitespace-nowrap">Giờ kết thúc</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="intro-x" v-for="item in listParking" :key="item">
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.openingHours }}</td>
                            <td>{{ item.closingHours }}</td>

                            <td class="table-report__action w-30">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3 text-primary" href="javascript:;">
                                        <EditIcon class="w-4 h-4 mr-1" />
                                    </a>
                                    <a class="flex items-center text-danger" href="javascript:;" @click="deleteParking(item.id)">
                                        <Trash2Icon class="w-4 h-4 mr-1" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Xóa thành công</div>
            </div>
        </div>
    </div>
</template>

<script>
import { db, useLoadParking, deleteParking } from '@/firebase'
import Toastify from 'toastify-js'

export default {
    data() {
        return {
            listParking: []
        }
    },
    created() {
        this.getParking()
    },
    // setup() {
    //     const park = useLoadParking()
    //     return { park, deleteParking }
    // },
    methods: {
        async getParking() {
            const parkingLotsRef = db.collection('parkingLots')
            const parkingLotsSnapshot = await parkingLotsRef.get()

            parkingLotsSnapshot.forEach((doc) => {
                console.log(doc.id)
                const data = doc.data()
                Object.assign(data, { id: doc.id })
                this.listParking.push(data)
            })
        },
        deleteParking(id) {
            const docId = id
            const parkingLotsRef = db.collection('parkingLots')
            parkingLotsRef
                .doc(docId)
                .delete()
                .then(() => {
                    console.log('Document successfully deleted!')
                    this.listParking = this.listParking.filter((car) => car.id !== id)
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
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
