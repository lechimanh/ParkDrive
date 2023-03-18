<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
      <h2 class="intro-y text-lg font-medium mr-auto mt-2">Quản lý tập tin</h2>
      <!-- BEGIN: File Manager Menu -->
      <div class="intro-y box p-5 mt-6">
        <div class="mt-1">
          <a @click="searchListType(1)" href="javascript:;" class="flex items-center px-3 py-2 rounded-md"
            v-bind:class="(this?.type == 1)?'bg-primary text-white font-medium':''">
            <ImageIcon class="w-4 h-4 mr-2" /> Hình ảnh
          </a>
          <a @click="searchListType(2)" href="javascript:;" class="flex items-center px-3 py-2 mt-2 rounded-md"
            v-bind:class="(this?.type == 2) ? 'bg-primary text-white font-medium' : ''">
            <VideoIcon class="w-4 h-4 mr-2" /> Video
          </a>
          <a @click="searchListType(3)" href="javascript:;" class="flex items-center px-3 py-2 mt-2 rounded-md"
            v-bind:class="(this?.type == 3) ? 'bg-primary text-white font-medium' : ''">
            <FileIcon class="w-4 h-4 mr-2" /> Tài liệu
          </a>
        </div>
        <div class="border-t border-slate-200 dark:border-darkmode-400 mt-4 pt-4">
          <a @click="listFile(0)" href="javascript:;" class="flex items-center px-3 py-2 rounded-md"
            v-bind:class="this?.fileCategoryId == 0 ? 'active-cate' : ''">
            <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
            Tất cả
          </a>
          <a v-for="(item, index) in category" :key="index" :value="item.id" @click="listFile(item.id)"
            href="javascript:;" class="flex items-center px-3 py-2 rounded-md"
            v-bind:class="this?.fileCategoryId == item.id ? 'active-cate' : ''">
            <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
            {{ item.name }}
          </a>

        </div>
      </div>
      <!-- END: File Manager Menu -->
    </div>
    <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
      <!-- BEGIN: File Manager Filter -->
      <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
        <div class="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
          <input type="text" class="form-control w-44" v-model.trim="name" placeholder="Tên file" />

          <button class="btn btn-primary shadow-md mr-2 h-10 ml-auto ml-2" @click="searchFile"> Tìm kiếm
            <SearchIcon class="w-5 h-5 ml-2" />
          </button>
          <button class="btn btn-primary shadow-md mr-2 h-10" @click="resetDataSearch()">Xóa điều kiện tìm
            kiếm
            <Trash2Icon class="w-4 h-4 ml-2" />
          </button>
        </div>

        <div class="w-full sm:w-auto flex">
          <button class="btn btn-primary shadow-md mr-2" @click="goToFolderList">
            Thêm tập tin
          </button>
          <Dropdown v-if="showDelete">
            <DropdownToggle class="btn px-2 box">
              <span class="w-5 h-5 flex items-center justify-center">
                <PlusIcon class="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>

                <DropdownItem @click="removeAllFile">
                  <FileIcon class="w-4 h-4 mr-2" /> Xóa file
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <!-- END: File Manager Filter -->
      <!-- BEGIN: Directory & Files -->
      <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
        <div v-for="(item, index) in result" :key="index"
          class="intro-x col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2">
          <div class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in height">
            <div class="absolute left-0 top-0 mt-3 ml-3">
              <input class="form-check-input border border-slate-500" type="checkbox" :value="item.id"
                @click="clickCheckBox( item.id)" />
            </div>
            <a v-if="item?.type == 3" href="javascript:;"
              @click="showDetailPdf(item.url), superlargeModalSizePreview = true;"
              class="w-3/5 file__icon file__icon--empty-directory mx-auto"></a>
            <a v-else-if="item?.type == 2" href="" class="w-3/5 file__icon file__icon--directory mx-auto"></a>
            <a v-else-if="item?.type == 1" href="javascript:;" class="w-3/5 file__icon file__icon--image mx-auto">
              <div class="file__icon--image__preview image-fit">
                <img alt="Midone Tailwind HTML Admin Template" :src="item.url" data-action="zoom"
                  class="w-full rounded-md" />
              </div>
            </a>
            <a v-else href="javascript:;" class="w-3/5 file__icon file__icon--file mx-auto">
              <div class="file__icon__file-name">
                {{ item?.type }}
              </div>
            </a>
            <a href="javascript:;" class="block font-medium mt-4 text-center truncate">{{
              item.name.split("-")[
                item.name.split("-").length - 1
              ]
            }}</a>
            <div class="text-slate-500 text-xs text-center mt-0.5">
              {{ item.detail }}
            </div>
            <Dropdown class="absolute top-0 right-0 mr-2 mt-3 ml-auto">
              <DropdownToggle tag="a" class="w-5 h-5 block" href="javascript:;">
                <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
              </DropdownToggle>
              <DropdownMenu class="w-40">
                <DropdownContent>
                  <DropdownItem  @click="downloadFile(item.url)">
                  <DownloadIcon class="w-4 h-4 mr-2" /> Tải về
                </DropdownItem>
                  <DropdownItem @click="deleteFile(item.id)">
                    <TrashIcon class="w-4 h-4 mr-2" /> Xóa
                  </DropdownItem>
                  
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div>

        </div>
      </div>
      <!-- END: Directory & Files -->
      <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
        <CheckCircleIcon class="text-success" />
        <div class="ml-1 mr-2 message-toast">
          <div class="text-slate-500">
            Xóa thành công!
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="shouldShowModalPdf" :show="superlargeModalSizePreview" @hidden="superlargeModalSizePreview = false"
      size="modal-xl">
      <a @click="superlargeModalSizePreview = false" class="absolute right-0 top-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
      <ModalBody class="p-10 text-center">
        <PdfApp v-if="checkFile == 'pdf'" style="height: 80vh"
                :pdf="this.urlPdf"></PdfApp>
        <vue-office-docx v-if="checkFile == 'docx'" :src="docx" style="height: 80vh;" />
        <div class="text-center mt-8 h-4">
          <button type="button" @click="superlargeModalSizePreview = false" class="btn btn-outline-secondary w-24 mr-1">
            Hủy
          </button>
        </div>
      </ModalBody>
    </Modal>
  </div>
</template>
<script>
import FileCategoryApi from '../../api-services/FileCategoryApi'
import FileManagementApi from '../../api-services/FileManagementApi'
import Toastify from "toastify-js"
import PdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import axios from 'axios';
export default {
  name: 'CreateDecentralization',
  components: { PdfApp, VueOfficeDocx },
  data() {
    return {
      docx: '',
      urlPdf: "",
      show: false,
      check: false,
      showDelete : false,
      type: 1,
      fileCategoryId: 0,
      arrValueChecked: [],
      name: null,
      category: {},
      result: {},
      shouldShowModalPdf: false,
      checkFile: ""
    }
  },
  created() {
    this.listCategory();
    this.getListFile();
  },
  watch: {},
  methods: {
    async createCategory() {
      this.dataCreate;
      let params = {
        name: this.dataCreate.name,
      }
      const res = await FileCategoryApi.insertCategory(JSON.stringify(params));
      this.result = res.data,
        this.goToFolderList();

    },
    clickCheckBox(id){

      if (event.target.checked) {
        this.arrValueChecked.push(id);
        event.target.checked = true;
      }else{
        this.arrValueChecked = this.arrValueChecked.filter(item=>item != id);
        event.target.checked = false;
      }
      if(this.arrValueChecked.length > 0){
        this.showDelete = true;
      }else{
        this.showDelete = false;
      }
      console.log(this.showDelete);
    },
    searchListType(type) {
      this.type = type;
      this.fileCategoryId = 0;
      this.listCategory();
      let paramsFile = {
        name: this.name,
        type: this.type,
        fileCategoryId: this.fileCategoryId
      }
      this.getListFile(paramsFile);
    },
    async getListFile(params = {}) {
      if (Object.keys(params).length === 0) {
        params = {
          name: null,
          type: 1,
          fileCategoryId: 0
        }
      } else {
        params = {
          name: this.name,
          type: this.type,
          fileCategoryId: this.fileCategoryId
        }
      }
      const res = await FileManagementApi.getFileAll(JSON.stringify(params));
      this.result = res.data;
    },
    async listCategory(params = {}) {
      const res = await FileCategoryApi.getCategory(JSON.stringify({}));
      this.category = res.data;
    },
    async deleteFile(id) {
      const res = await FileManagementApi.deleteFile(id);
      this.getListFile();
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
    async removeAllFile() {
      let arrArrayId = this.arrValueChecked.join(",");
      const res = await FileManagementApi.deleteFile(arrArrayId);
      this.getListFile();

      this.arrValueChecked = [];
      this.showDelete = false;
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
    listFile(idCate) {
      let params = {
        name: null,
        type: 0,
        fileCategoryId: idCate
      }
      this.fileCategoryId = idCate;
      this.getListFile(params);
    },
    searchFile() {
      let params = {
        name: this.name,
        type: this.type,
        fileCategoryId: this.fileCategoryId
      }
      this.getListFile(params);
    },
    resetDataSearch() {
      this.name = "";
      let params = {
        name: this.name,
        type: this.type,
        fileCategoryId: this.fileCategoryId
      }
      this.getListFile(params);
    },
    showDetailPdf(url) {

      let extensionFile = url.split('.').pop();
      this.shouldShowModalPdf = false;
      if(extensionFile === "pdf"){
        this.urlPdf = url;
        this.checkFile = "pdf";
        this.shouldShowModalPdf = true;
      }  
      if(extensionFile === "docx"){
        this.docx = url;
        this.checkFile = "docx";
        this.shouldShowModalPdf = true;
      }
    
    },
    goToFolderList() {
      this.$router.push('/file/create-file');
    },
    downloadFile(url) {
              axios({
                    url: url, 
                    method: 'GET',
                    responseType: 'blob',
                }).then((res) => {
                     var FILE = window.URL.createObjectURL(new Blob([res.data]));
                     var docUrl = document.createElement('a');
                     docUrl.href = FILE;
                     docUrl.setAttribute('download', url.split('/').pop());
                     document.body.appendChild(docUrl);
                     console.log(docUrl);
                     docUrl.click();
                });

          }
  },
}

</script>
<style scoped>
.active-cate {
  font-weight: bold;
  color: #1E3A8A;
}
</style>
<script setup>
import { ref } from "vue";
const superlargeModalSizePreview = ref(false);
</script>
