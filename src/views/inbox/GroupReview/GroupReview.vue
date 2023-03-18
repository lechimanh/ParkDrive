<template>
    <div>

        <h2 class="intro-y text-lg font-medium mt-4">Danh sách nhóm xét duyệt</h2>
        <div class="mt-2 mb-5 search">
            <div class="intro-y mt-2 form-search">
                <div class="form-btn">
                    <div class="search-input mr-2">
                        <label class="w-24 mr-2">Tên nhóm:</label>
                        <input type="text" v-model="dataSearch.name" class="form-control w-40" placeholder="Tên nhóm" />
                    </div>
                    <button class="btn btn-primary shadow-md mr-2 h-10" @click="search(), loadingIconAction = true"> Tìm kiếm
                        <SearchIcon class="w-5 h-5 ml-2" />
                    </button>
                    <button class="btn btn-primary shadow-md mr-2 h-10" @click="resetDataSearch()">Xóa điều kiện tìm kiếm
                        <Trash2Icon class="w-4 h-4 ml-2" />
                    </button>
                    <button class="btn btn-primary shadow-md mr-2 h-10" @click="redirectPageCreate">Thêm
                        <PlusIcon class="w-5 h-5 ml-2" />
                    </button>
                
                </div>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
            <LoadingIcon icon="three-dots" class="w-20 h-20"/>
        </div>
            <table class="table table-report -mt-2" v-if="!loadingIconAction">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">ID</th>
                        <th class="whitespace-nowrap">TÊN NHÓM</th>
                        <th class="whitespace-nowrap text-left">MÔ TẢ</th>
                        <th class="text-left whitespace-nowrap">THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dataPage" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td class="table-report__action w-30">
                            <div class="flex justify-center items-center">
                                <a class="flex items-center text-danger" @click="deleteGroup(item.id), loadingIconAction = true" href="javascript:;">
                                    <Trash2Icon class="w-4 h-4 mr-1" />
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->

        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3"
            v-if="totalPages > 1">
            <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage"
                @pagechanged="onPageChange" />
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
        <div id="false-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    Xóa thất bại!
                </div>
            </div>
        </div>
        <div id="success-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    Xóa thành công!
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Pagination from '../../../components/pagination/pagination.vue'
import ReviewGroupApi from '../../../api-services/ReviewGroupApi'
import Toastify from "toastify-js"
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    name: 'ListHistory',
    components: {
        Pagination
    },
    data() {
        return {
            loadingIconAction: false,
            totalHistory: 0,
            rewardTime: "",
            time: "",
            perPage: 10,
            currentPage: 1,
            totalPages: 0,
            result: {},
            dataPage: {},
            dataDetail: {},
            totalReviewGroup: 0,
            dataSearch: {
                name: ""
            },
        };
    },
    created() { 
        this.init();
    },
    watch: {
        "perPage": function () {
            this.dataPage = this.paginate(this.result, this.perPage, this.currentPage);
        },
    },
    methods: {
        onPageChange(page) {
            this.dataPage = this.paginate(this.result, this.perPage, page);
            this.currentPage = page;
        },
        paginate(array, page_size, page_number) {
            // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
            return array.slice((page_number - 1) * page_size, page_number * page_size);
        },
        redirectPageCreate() {
            this.$router.push(`/remunerative/group-review/create-group-review`);
        },
        async init() {
            const res = await ReviewGroupApi.getReviewGroups(JSON.stringify({}));
            this.result = res.data;
            this.totalReviewGroup = this.result.length;
          
            this.totalPages = (this.result.length / this.perPage).toFixed();
            this.dataPage = this.paginate(this.result, this.perPage, 1);
        },

        async search() {
            this.dataSearch;
            this.LoadingIcon = true;
            let params = {
                name : this.dataSearch.name,
            }
            const res = await ReviewGroupApi.getReviewGroups(JSON.stringify(params));
            this.result = res.data
            this.loadingIconAction = false;
            this.totalReviewGroup = this.result.length;
            this.totalPages = (this.result.length / this.perPage).toFixed();
            this.dataPage = this.paginate(this.result, this.perPage, 1);
        },

        async deleteGroup(idReviewGroup) {
            const res = await ReviewGroupApi.deleteReviewGroups(idReviewGroup);
            const params = await ReviewGroupApi.getReviewGroups(JSON.stringify({}));
            this.result = params.data; 
            console.log(res);
            this.loadingIconAction = false;
            this.totalReviewGroup = this.result.length;
            this.totalPages = (this.result.length / this.perPage).toFixed();
            this.dataPage = this.paginate(this.result, this.perPage, 1);
            if(res.data){
                Toastify({
                    node: dom("#success-delete")
                    .clone()
                    .removeClass("hidden")[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    }).showToast(); 
            }else{
                Toastify({
                    node: dom("#false-delete")
                    .clone()
                    .removeClass("hidden")[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    }).showToast(); 
            }

        },

        resetDataSearch() {
            this.dataSearch.name = "";
        }
    }
}
</script>
<script setup>
import { ref } from "vue";

</script>
<style scoped>

.toastify .toastify-content-update {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 2.5rem;
  padding-left: 0px;
}

.search .form-search {
    margin-left: 0%;
    justify-content: flex-start;
}
</style>
    