<template>
    <h2 class="intro-y text-lg font-medium mt-10">Danh sách danh mục</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
            <button class="btn btn-primary shadow-md mr-2" @click="createCategory">Thêm</button>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
            <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center"
                v-if="loadingIconAction">
                <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
            </div>
            <table class="table table-report -mt-2" v-if="!loadingIconAction">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">STT</th>
                        <th class="whitespace-nowrap">Tên</th>
                        <th class="whitespace-nowrap">Tổng số bài viết</th>
                        <th class="whitespace-nowrap">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="intro-x" v-for="(item, index) in data" :key="index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.count }}</td>
                        <td class="table-report__action w-30">
                            <div class="flex justify-center items-center">
                                <a class="flex items-center mr-3 text-primary" href="javascript:;"
                                    @click="editCategory(item.id)">
                                    <EditIcon class="w-4 h-4 mr-1" />
                                </a>
                                <a class="flex items-center text-danger" href="javascript:;"
                                    @click="deleteCategory(item.id)">
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
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
            v-if="!loadingIconAction && totalPages > 1">
            <pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="onPageChanged" />
        </div>
        <!-- END: Pagination -->
        <div id="false-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    Có lỗi trong quá trình xóa !
                </div>
            </div>
        </div>
        <div id="success-notification-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    Xóa thành công !
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryNewsApi from '../../api-services/CategoryNewsApi'
import Pagination from "@/components/pagination/pagination.vue";
import Toastify from "toastify-js"
export default {
    name: 'ListCheckin',
    components: {
        Pagination
    },
    data() {
        return {
            loadingIconAction: true,
            data: [],
            currentPage: 1,
            totalPages: 1,
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init(page = 1) {
            this.loadingIconAction = true;
            const dataResult = await CategoryNewsApi.getList(JSON.stringify({}), page);
            this.data = dataResult.data;
            this.totalPages = dataResult.paginate.last_page;
            this.loadingIconAction = false;
        },
        onPageChanged(page) {
            this.init(page);
            this.currentPage = page;
        },
        async deleteCategory(id) {
            if (confirm("Bạn muốn xóa danh mục này ?")) {
                this.loadingIconAction = true;
                const dataResult = await CategoryNewsApi.delete(id);
                if (dataResult.status == 400) {
                    Toastify({
                        node: dom("#false-delete")
                            .clone()
                            .removeClass("hidden")[0],
                        duration: 300000,
                        newWindow: true,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                    }).showToast();
                } else {
                    Toastify({
                        node: dom("#success-notification-delete")
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
                this.init();
            }

        },

        createCategory() {
            this.$router.push({ path: '/category-news/create'})
        },
        editCategory(categoryId) {
            this.$router.push({ path: '/category-news/create', query: { id: categoryId } })
        }
    }
}
</script>

<style scoped>
.wrapper:before {
    display: none;
}
</style>
<style>
.toastify .toastify-content {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 2.5rem;
    padding-left: 0px;
}

.toastify .toastify-content .text-success ,.toastify .toastify-content .text-danger{
    margin-right: -10px;
    width: 65px;
}
</style>