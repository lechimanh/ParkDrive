<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4">Danh sách phân quyền</h2>
        <div class="mt-2 mb-5 flex-row items-end search">
            <div class="intro-y mt-2 items-end gap-10 form-search">
                <div class="flex items-center gap-5 search-input">
                    <label>Tên:</label>
                    <input type="text" v-model.trim="dataSearch.name" class="form-control" placeholder="Tên" />
                </div>
                <div class=" flex items-center gap-5 search-input">
                    <label>Bộ phận:</label>
                    <TomSelect class="w-40" placeholder="Bộ phận" v-model="dataSearch.organization">
                        <option value="0">Tất cả</option>
                        <option v-for="(item, index) in result_organization" :key="index" :value="item.id">{{ item.organizationName }}</option>
                    </TomSelect>
                </div>
            </div>
            <div class="form-btn intro-y gap-3">
                <button class="btn btn-primary shadow-md mr-2 h-10" @click="search(), loadingIconAction = true"> Tìm kiếm
                    <SearchIcon class="w-5 h-5 ml-2" />
                </button>
                <button class="btn btn-primary shadow-md mr-2 h-10" @click="redirectPageCreate">Thêm
                    <PlusIcon class="w-5 h-5 ml-2" />
                </button>
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
                        <th class="whitespace-nowrap">TÊN</th>
                        <th class="whitespace-nowrap text-left">BỘ PHẬN</th>
                        <!-- <th class="text-left whitespace-nowrap">THAO TÁC</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr class="intro-x" v-for="(item, index) in dataPage" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.organization.organizationName }}</td>
                        <!-- <td class="table-report__action w-30">
                            <div class="flex justify-center items-center">
                                <a class="flex items-center mr-3 text-primary" href="javascript:;">
                                    <EyeIcon class="w-4 h-4 mr-1" />
                                </a>
                                <a class="flex items-center text-danger" href="javascript:;">
                                    <Trash2Icon class="w-4 h-4 mr-1" />
                                </a>
                            </div>
                        </td> -->
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
    </div>
</template>
<script>
import Pagination from '../../../components/pagination/pagination.vue'
import RoleApi from '../../../api-services/RoleApi'
import OrganizationApi from '../../../api-services/OrganizationApi'
export default {
    name: 'ListHistory',
    components: {
        Pagination
    },
    data() {
        return {
            loadingIconAction: false,
            rewardTime: "",
            time: "",
            perPage: 10,
            currentPage: 1,
            totalPages: 0,
            result: {},
            result_organization: {},
            dataPage: {},
            dataDetail: {},
            totalReviewGroup: 0,
            dataSearch: {
                name: "",
                organization: "",
            },
        };
    },
    created() { 
        this.init();
        this.organization();
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

        async organization() {
            const res = await OrganizationApi.getListOrganization();
            this.result_organization = res.data;
        },

        async init() {
            const res = await RoleApi.getListDecentralization(JSON.stringify({}));
            this.result = res.data;
            this.totalReviewGroup = this.result.length;
            this.totalPages = (this.result.length / this.perPage).toFixed();
            this.dataPage = this.paginate(this.result, this.perPage, 1);
        },

        async search() {
            this.LoadingIcon = true;
            let params = {
                name : this.dataSearch.name,
                organization : this.dataSearch.organization,
            }
            const res = await RoleApi.getListDecentralization(JSON.stringify(params));
            this.result = res.data
            this.loadingIconAction = false;
            this.totalReviewGroup = this.result.length;
            this.totalPages = (this.result.length / this.perPage).toFixed();
            this.dataPage = this.paginate(this.result, this.perPage, 1);
        }, 

        redirectPageCreate() {
            this.$router.push(`/user/create-decentralization`);
        },
    },
}
</script>
<script setup>
import { ref } from "vue";
</script>
    