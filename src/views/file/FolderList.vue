<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4">Danh sách danh mục :</h2>
        <div class="mt-2 mb-5 flex-row items-end search">
            <div class="form-btn intro-y gap-3">
                <button class="btn btn-primary shadow-md mr-2 h-10" @click="redirectPageCreate">
                    Thêm
                    <PlusIcon class="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
                <LoadingIcon icon="three-dots" class="w-20 h-20" />
            </div>
            <table class="table table-report -mt-2" v-if="!loadingIconAction">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">ID</th>
                        <th class="whitespace-nowrap">TÊN DANH MỤC</th>
                        <!-- <th class="text-left whitespace-nowrap">THAO TÁC</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr class="intro-x" v-for="(item, index) in dataPage" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td class="table-report__action w-30">
                            <div class="flex justify-center items-center">
                                <a class="flex items-center mr-3 text-primary" href="javascript:;" @click="directUpdate(item.id)">
                                    <EditIcon class="w-4 h-4 mr-1" />
                                </a>
                                <a
                                    class="flex items-center text-danger"
                                    href="javascript:;"
                                    @click="deleteCategory(item.id), (loadingIconAction = true)"
                                >
                                    <Trash2Icon class="w-4 h-4 mr-1" />
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->
        <div id="success-notification-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Xóa thành công!</div>
            </div>
        </div>
        <div id="false-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Có lỗi trong quá trình xóa!</div>
            </div>
        </div>
        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3" v-if="totalPages > 1">
            <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
            <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
                Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalReviewGroup }} phần tử
            </div>
            <select v-model="perPage" class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="35">35</option>
                <option value="50">50</option>
            </select>
        </div>
        <!-- END: Pagination -->
    </div>
</template>
<script>
import FileCategoryApi from '../../api-services/FileCategoryApi'
import Toastify from 'toastify-js'
import Pagination from '../../components/pagination/pagination.vue'
export default {
    name: 'FileCategoryList',
    components: {
        Pagination
    },
    data() {
        return {
            loadingIconAction: false,
            rewardTime: '',
            time: '',
            perPage: 10,
            currentPage: 1,
            totalPages: 0,
            result: {},
            result_organization: {},
            dataPage: {},
            dataDetail: {},
            totalCategory: 0,
            dataSearch: {
                name: ''
            }
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

        async init() {
            const res = await FileCategoryApi.getCategory(JSON.stringify({}))
            this.result = res.data
            this.totalCategory = this.result.length

            this.totalPages = (this.result.length / this.perPage).toFixed()
            this.dataPage = this.paginate(this.result, this.perPage, 1)
        },

        async deleteCategory(idCategory) {
            const res = await FileCategoryApi.deleteCategory(idCategory)
            console.log(res)
            const params = await FileCategoryApi.getCategory(JSON.stringify({ res }))
            this.result = params.data
            this.loadingIconAction = false
            this.totalCategory = this.result.length
            this.totalPages = (this.result.length / this.perPage).toFixed()
            this.dataPage = this.paginate(this.result, this.perPage, 1)
            if (res.data) {
                Toastify({
                    node: dom('#success-notification-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
            } else {
                Toastify({
                    node: dom('#false-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
            }
        },

        redirectPageCreate() {
            this.$router.push(`/file/create-folder`)
        },

        directUpdate(categoryId) {
            this.$router.push({ path: '/file/update-folder', query: { id: categoryId } })
        }
    }
}
</script>
