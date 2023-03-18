<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4">Danh sách User</h2>
        <div class="mt-2 mb-5 flex-row items-end search"></div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
                <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
            </div>
            <table class="table table-report -mt-2" v-if="!loadingIconAction">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">Hình ảnh</th>
                        <th class="whitespace-nowrap text-left">ID</th>
                        <th class="whitespace-nowrap text-left">Tên</th>
                        <th class="whitespace-nowrap">Ngày</th>
                        <th class="whitespace-nowrap text-left">Giờ</th>
                        <th class="whitespace-nowrap text-left">Thao tác</th>
                        <!-- <th class="text-left whitespace-nowrap">THAO TÁC</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr class="intro-x" v-for="(item, index) in dataPage" :key="index">
                        <td><img class="image-avatar" :src="item.detectedImageUrl" /></td>
                        <td>{{ item.employeeId }}</td>
                        <td>{{ item.user?.name }}</td>
                        <td>{{ dateTime(item.checkinDate) }}</td>
                        <td>{{ item.checkinTime }}</td>
                        <td>
                            <a class="flex items-center mr-3" @click="createUser(item.employeeId)" href="javascript:;" v-if="item.user == NULL">
                                <PlusSquareIcon class="w-4 h-4 mr-1" /> Tạo nhân viên
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->

        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3" v-if="totalPages > 1">
            <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
            <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
                Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalPages }} phần tử
            </div>
        </div>
        <!-- END: Pagination -->
    </div>
</template>
<script>
import Pagination from '../../components/pagination/pagination.vue'
import CheckinUserApi from '../../api-services/CheckinUserApi'
import { collection, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../api-services/Firebase'
import moment from 'moment'
export default {
    name: 'ListCheckin',
    components: {
        Pagination
    },
    data() {
        return {
            loadingIconAction: false,
            perPage: 10,
            currentPage: 1,
            totalPages: 0,
            result: {},
            dataPage: {}
        }
    },
    created() {
        this.init()
    },
    watch: {
        perPage: function () {
            this.dataPage = this.paginate(this.result, this.perPage, this.currentPage)
        }
    },
    methods: {
        onPageChange(page) {
            this.dataPage = this.paginate(this.result, this.perPage, page)
            this.currentPage = page
        },
        paginate(array, page_size, page_number) {
            return array.slice((page_number - 1) * page_size, page_number * page_size)
        },
        dateTime(value) {
            return moment(value).format('DD-MM-YYYY')
        },
        createUser(employeeId) {
            this.$router.push(`/user/create-employee?employeeId=${employeeId}`)
        },
        async init() {
            const data = await CheckinUserApi.getUser(JSON.stringify({}))
            this.result = data
            this.totalReviewGroup = this.result.length

            this.totalPages = Math.ceil(this.result.length / this.perPage)
            this.dataPage = this.paginate(this.result, this.perPage, 1)
        }
    },
    async mounted() {
        const querySnapshot = await getDocs(collection(db, 'user'))
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
        })
        const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                this.init()
            })
        })
    }
}
</script>

<style scoped>
.image-avatar {
    width: 100px;
    height: 100px;
}

.intro-y:nth-child(3) {
    height: 100%;
}
</style>
