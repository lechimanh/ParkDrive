<template>
    <h2 class="intro-y text-lg font-medium mt-10">Danh sách danh mục</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
            <button class="btn btn-primary shadow-md mr-2">Thêm</button>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
            <table class="table table-report -mt-2">
                <thead>
                    <tr>
                        <th class="whitespace-nowrap">STT</th>
                        <th class="whitespace-nowrap">Tên</th>
                        <th class="text-center whitespace-nowrap">Tổng số bài viết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(faker, fakerKey) in $_.take($f(), 9)" :key="fakerKey" class="intro-x">
                        <td class="!py-3.5">
                            <div class="flex items-center">
                                <div class="w-9 h-9 image-fit zoom-in"></div>
                                <div class="ml-4">
                                    <a href="" class="font-medium whitespace-nowrap">{{ faker.users[0].name }}</a>
                                    <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        {{ faker.users[0].email }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">
                            <a class="flex items-center justify-center underline decoration-dotted" href="javascript:;">{{
                                ['Themeforest', 'Codecanyon', 'Graphicriver'][$_.random(0, 2)]
                            }}</a>
                        </td>
                        <td class="text-center capitalize">
                            {{ faker.users[0].gender }}
                        </td>
                        <td class="w-40">
                            <div
                                class="flex items-center justify-center"
                                :class="{
                                    'text-success': faker.trueFalse[0],
                                    'text-danger': !faker.trueFalse[0]
                                }"
                            ></div>
                        </td>
                        <td class="text-center">{{ faker.totals[0] }} Items</td>
                        <td class="table-report__action w-56">
                            <div class="flex justify-center items-center">
                                <a class="flex items-center mr-3" href="javascript:;"> Edit </a>
                                <a class="flex items-center text-danger" href="javascript:;" @click="deleteConfirmationModal = true"> </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->
        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav class="w-full sm:w-auto sm:mr-auto">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#"> </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#"> </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">...</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">...</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#"> </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#"> </a>
                    </li>
                </ul>
            </nav>
            <select class="w-20 form-select box mt-3 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
            </select>
        </div>
        <!-- END: Pagination -->
    </div>
</template>
<script>
import CategoryNewsApi from '../../api-services/CategoryNewsApi'
export default {
    name: 'ListCheckin',
}
</script>

<style scoped>
.wrapper:before{
  display: none;
}
</style>