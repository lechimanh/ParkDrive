<template>
    <div>
        <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">
                    Sửa thành công!
                </div>
            </div>
        </div>
        <h2 class="intro-y text-lg font-medium mt-4">Sửa Tên Danh mục</h2>
        <div>
            <ModalBody>
                <div class="mx-auto w-11/12 p-3 box">
                    <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                        <div class="w-1/2 create-layout">
                            <label for="regular-form-1" class="form-label text-base">Tên:</label>
                            <input type="text" class="form-control pr-10" v-model="dataUpdate.name" placeholder="Nhập tên"/>
                        </div>
                    </div>          
                    <div class="mt-4 mx-auto text-center">
                        <button class="btn btn-secondary w-24 mr-4 mb-2" @click="goToFolderList">Hủy</button>
                        <button class="btn btn-primary w-24 mb-2" @click="updateCategory">Sửa</button>
                    </div>
                </div>
            </ModalBody>
        </div>
    </div>
</template>
<script>
import Toastify from "toastify-js"
export default {
    name: 'CreateDecentralization',
    components: {},
    data() { 
        return {
            show: false,
            check: false,
            dataDetail : null,
            result: {},
            dataUpdate: {
                id: this.$route.query.id,
                name: ""
            }
        }
    },
    created() {
        this.getCategoryFile(this.$route.query.id);
    },
    watch: {},
    methods: {
        async getCategoryFile(id){
            const category = await FileCategoryApi.getCategoryDetail({},id);
            this.dataUpdate.name = category.data.name;
        },
        async updateCategory() {
            this.dataCreate;
            let params = {
                id: this.dataUpdate.id,
                name: this.dataUpdate.name,
            }
            const res = await FileCategoryApi.updateCategory(JSON.stringify(params));
            this.result = res.data,
            this.goToFolderList();
            Toastify({
                node: dom("#success-notification-content")
                .clone()
                .removeClass("hidden")[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                }).showToast();
        },

        goToFolderList() {
            this.$router.push('/file/list-folder');
        }
    },
}

</script>
<script setup>
    import { ref } from "vue";
import FileCategoryApi from '../../api-services/FileCategoryApi'
    const userMultiple = ref([]);
</script>
<style scoped>

.toastify .toastify-content-update {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 2.5rem;
  padding-left: 0px;
}

.form_checkbox {
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 20px 20px;
}

@media screen and (max-width: 576px) {

    .modal-body .form-create {
        flex-direction: column;
    }

    .form-create .create-layout {
        width: 100%;
    }
}

.check1{
    margin-top: 10px;
}

</style>
