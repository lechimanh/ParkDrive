<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-4">Danh sách tiến cử</h2>
    <div class="mt-2 mb-5 search">
      <div class="intro-y mt-2 form-search">
        <div class="search-layout">
          <div class="search-input-1">
            <label class="form-label xl:w-25 xl:!mr-10">Đối tượng cá nhân:</label>
            <input type="text" class="form-control w-48" v-model.trim="dataSearch.rewardedPersonName"
              placeholder="Đối tượng cá nhân" />
          </div>
          <div class="search-input-2">
            <label class="form-label xl:w-25 xl:!mr-10">Đối tượng tổ chức:</label>
            <TomSelect placeholder="Tất cả" class="w-48" v-model="dataSearch.organizationId">
              <option value="0">Tất cả</option>
              <option v-for="(item, index) in organization " v-bind:key="index" v-bind:value="item.id"
                v-bind:selected="(index == dataSearch.organizationId ? true : false)">{{ item.organizationName }}</option>
            </TomSelect>
          </div>
        </div>
        <div class="search-layout">
          <div class="search-input-1">
            <label class="w-28">Loại:</label>
            <TomSelect placeholder="Tất cả" class="w-48" v-model="dataSearch.type">
              <option value="0">Tất cả</option>
              <option value="1">Tổ chức</option>
              <option value="2">Cá nhân</option>
            </TomSelect>
          </div>
          <div class="search-input-1">
            <label class="w-28">Trạng thái:</label>
            <TomSelect placeholder="Trạng thái" class="w-48" v-model="dataSearch.status">
              <option key="0" value="0" selected>Tất cả</option>
              <option v-for="(item, index) in RemunativeStatusEnum" v-bind:key="index" v-bind:value="index"
                v-bind:selected="(index == dataDetail.status ? true : false)">{{ item }}</option>
            </TomSelect>
          </div>
        </div>
      </div>
      <div class="form-btn intro-y justify-content-between">
        <button class="btn btn-primary shadow-md mr-2 h-10" @click="createNominated()">Thêm
          <PlusIcon class="w-5 h-5 ml-2" />
        </button>
        <div>
          <button class="btn btn-primary shadow-md mr-2 h-10" @click="search(), loadingIconAction = true">Tìm kiếm
            <SearchIcon class="w-5 h-5 ml-2" />
          </button>
          <button class="btn btn-primary shadow-md mr-2 h-10" @click="resetDataSearch()">Xóa điều kiện tìm kiếm
            <Trash2Icon class="w-4 h-4 mr-1" />
          </button>
        </div>
        <download-excel class="btn btn-primary shadow-md mr-2 h-10" :data="json_data" :fields="json_fields"
          :fetch="fetchData" :name="nameExport">
          Tải về
          <FileIcon class="w-5 h-5 ml-2" />
        </download-excel>

      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto">
      <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center"
        v-if="loadingIconAction">
        <LoadingIcon icon="three-dots" class="w-20 h-20" />
      </div>
      <table class="table table-report -mt-2" v-if="!loadingIconAction">
        <thead>
          <tr>
            <th class="whitespace-nowrap">ID</th>
            <th class="whitespace-nowrap">ĐỐI TƯỢNG KHEN THƯỞNG</th>
            <th class="text-left whitespace-nowrap">NGÀY TIẾN CỬ</th>
            <th class="text-left whitespace-nowrap">MÔ TẢ</th>
            <th class="whitespace-nowrap text-left">NGƯỜI DUYỆT</th>
            <th class="text-left whitespace-nowrap">TRẠNG THÁI</th>
            <th class="text-left whitespace-nowrap">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataPage" :key="index">
            <td>{{ item.id }}</td>
            <td><a href="#" class="font-medium whitespace-nowrap">
                {{ item.type == 1 ? item.organization.organizationName : item.rewardedPerson.name }}
              </a></td>
            <td>{{ dateTime(item.rewardTime) }}</td>
            <td>{{ item.rewardContent }}</td>
            <td>{{ item.approvedBy?.name }}</td>
            <td>
              <div class="flex items-left justify-left whitespace-nowrap text-success" :class="{
                'text-success': item.status == 3,
                'text-danger': item.status != 3,
              }">
                <CheckSquareIcon class="w-4 h-4 mr-2" />
                {{ RemunativeStatusEnum[item.status] }}
              </div>
            </td>
            <td class="table-report__action">
              <div class="flex justify-center items-center">
                <a class="flex items-center mr-3 text-primary"
                  @click="showDetail(item.id); superlargeModalSizePreview = true;" href="javascript:;">
                  <EyeIcon class="w-4 h-4 mr-1" />
                </a>
                <!-- <a class="flex items-center text-danger w-5" href="javascript:;">
                  <Trash2Icon class="w-4 h-4 mr-1" />
                </a> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Success Notification Content -->
    <!-- END: Success Notification Content -->
    <!-- BEGIN: Failed Notification Content -->
    <!-- END: Failed Notification Content -->
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3"
      v-if="totalPages > 1">
      <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
      <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
        Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalNominated }} phần tử
      </div>
      <select v-model="perPage" class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="35">35</option>
        <option value="50">50</option>
      </select>
    </div>
    <!-- END: Pagination -->
    <div class="p-5">
      <Preview>
        <Modal v-if="shouldShowModal" size="verybigmodal modal-xl" :show="superlargeModalSizePreview"
          @hidden="superlargeModalSizePreview = false">
          <a @click="superlargeModalSizePreview = false" class="absolute right-0 top-0 mr-2" href="javascript:;">
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
          <ModalBody class="text-center m-custom content pt-10 pr-10 pl-10 pb-5">
            <div class="intro-y flex items-center mt-3 mb-2 h-4">
              <h2 class="text-lg font-medium mr-auto">Chi tiết tiết cử</h2>
            </div>
            <div class="detail">
              <div class="info_left overflow-y-auto">
                <div class="reward_object box mt-5">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Trạng thái </h2>
                  </div>
                  <div class="p-3 text-left">
                    <input type="text" class="form-control" :value="RemunativeStatusEnum[dataDetail.status]" disabled />
                  </div>
                </div>
                <div class="reward_object box mt-5">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Đối Tượng Khen Thưởng</h2>
                  </div>
                  <div class="p-3 text-left">
                    <label for="regular-form-1" class="form-label">Tên</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Tên"
                      :value="dataDetail.type == 1 ? dataDetail.organization?.organizationName : dataDetail.rewardedPerson.name"
                      disabled />
                    <label for="regular-form-1" class="form-label mt-3">Ngày tiến cử</label>
                    <div class="relative mx-auto">
                      <div
                        class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <CalendarIcon class="w-4 h-4" />
                      </div>
                      <Litepicker v-model="rewardTime" :options="{
                        autoApply: true,
                        lang: 'vi-VN',
                        format: 'DD-MM-YYYY',
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }" class="form-control pl-12" disabled />
                    </div>
                  </div>
                </div>
                <div class="proposer box mt-5">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Người duyệt</h2>
                  </div>
                  <div class="p-3 text-left">
                    <label for="regular-form-1" class="form-label">Tên</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Tên"
                      :value="dataDetail.approvedBy?.name" disabled />
                      <label for="regular-form-1" class="form-label mt-3" v-if="dataDetail.approvalDate != NULL">Ngày phê duyệt</label>
                    <div class="relative mx-auto" v-if="dataDetail.approvalDate != NULL">
                      <div
                        class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <CalendarIcon class="w-4 h-4" />
                      </div>
                      <Litepicker v-model="dataDetail.approvalDate" :options="{
                        autoApply: true,
                        lang: 'vi-VN',
                        format: 'DD-MM-YYYY',
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }" class="form-control pl-12" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div class="info_right ml-5 overflow-y-auto">
                <div class=" box mt-5 ">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto lh-lg">Nội dung Khen Thưởng</h2>
                  </div>
                  <div>
                    <div class="title text-primary my-10 text-4xl ">
                      {{ dataDetail.rewardContent }}
                    </div>
                    <div class="mx-5">
                      {{ dataDetail.description }}
                    </div>
                    <div class="my-10">
                      <h2 class="font-medium text-base  mr-20 w-40 ml-auto ">Người phê duyệt</h2>
                      <h2 class="font-medium text-base  mr-20 w-40 ml-auto ">{{ dataDetail.approvedByName }}</h2>
                    </div>
                  </div>
                </div>
                <div class=" box mt-5 ">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Ghi chú</h2>
                  </div>
                  <div class="m-5">
                    <p>{{ dataDetail.note }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-8 h-4">
              <button type="button" @click="superlargeModalSizePreview = false"
                class="btn btn-outline-secondary w-24 mr-1">
                Hủy
              </button>
              <!-- <button type="button" class="btn btn-primary w-24" @click="updateStatus(dataDetail.remunerativeId)">Cập
              nhập</button> -->
            </div>
          </ModalBody>
        </Modal>
      </Preview>
    </div>
  </div>
</template>
<script>
import Pagination from '../../../components/pagination/pagination.vue'
import RemunativeStatusEnum from "../../../common/remunative"
import RemunerativeApi from '../../../api-services/RemunerativeApi';
import OrganizationApi from '../../../api-services/OrganizationApi'
import moment from "moment";
import { mapGetters } from "vuex";
import JsonExcel from "vue-json-excel3"
export default {
  name: 'listNominated',
  components: {
    Pagination,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      loadingIconAction: false,
      date: "",
      totalNominated: 0,
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      result: {},
      dataPage: {},
      dataDetail: {},
      organization: [],
      dataSearch: {
        rewardedPersonName: "",
        proposerId: this.iduser,
        organizationId: 0,
        status: 0,
        type: 0
      },
      shouldShowModal: "",
      nameExport: "",
      json_fields: {
        'ID': "id",
        'ĐỐI TƯỢNG KHEN THƯỞNG': "rewardedPersonName",
        'BỘ PHẬN': "rewardedPersonOrganizationName",
        'NỘI DUNG KHEN THƯỞNG': 'rewardContent',
        'NGƯỜI ĐỀ XUẤT': 'proposerName',
        'NGÀY ĐỀ XUẤT': 'rewardTime',
        'NGƯỜI DUYỆT': 'approvedByName',
        'TRẠNG THÁI': 'status'
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
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
  computed: mapGetters('auth', ['iduser']),
  methods: {
    async init() {
      const res = await RemunerativeApi.getNominated(JSON.stringify({ "proposerId": this.iduser }));
      this.result = res.data;
      this.totalNominated = this.result.length;
      this.totalPages = (this.result.length / this.perPage).toFixed();
      this.dataPage = this.paginate(this.result, this.perPage, 1);
      const organizationRs = await OrganizationApi.getListOrganization();
      this.organization  = organizationRs.data;
    },
    async search() {
      let params = {
        rewardedPersonName: this.dataSearch.rewardedPersonName ? this.dataSearch.rewardedPersonName : null,
        organizationId: this.dataSearch.organizationId,
        rewardedPersonOrganizationName: this.dataSearch.rewardedPersonOrganizationName,
        status: this.dataSearch.status,
        type: this.dataSearch.type,
        proposerId: this.iduser
      }
      const res = await RemunerativeApi.getNominated(JSON.stringify(params));
      this.result = res.data
      this.loadingIconAction = false;
      this.totalNominated = this.result.length;
      this.totalPages = (this.result.length / this.perPage).toFixed();
      this.dataPage = this.paginate(this.result, this.perPage, 1);
    },
    onPageChange(page) {
      this.dataPage = this.paginate(this.result, this.perPage, page);
      this.currentPage = page;
    },
    async showDetail(id) {
      const res = await RemunerativeApi.getRemunerativesDetail({ id: id });
      this.dataDetail = res.data;
      this.dateTime(this.date);
      this.rewardTime = this.dateTime(this.dataDetail.rewardTime);
      this.note = this.dataDetail.note
      this.status = this.dataDetail.status
      this.shouldShowModal = true
    },
    async fetchData() {
      let listRemunerative = [{
        id: "",
        rewardedPersonName: "",
        rewardedPersonOrganizationName: "",
        rewardContent: "",
        proposerName: "",
        rewardTime: "",
        approvedByName: "",
        status: ""
      }];
      if (this.result.length > 0) {
        listRemunerative = this.result.map(item => {
          return {
            ...item,
            status: RemunativeStatusEnum[item.status],
            rewardTime: this.dateTime(item.rewardTime),
            rewardedPersonName: item.type == 1 ? item.organization.organizationName : item.rewardedPerson.name,
            rewardedPersonOrganizationName: item.type == 1 ? item.organization.organizationName : item.rewardedPerson.organization.organizationName,
            approvedByName: item.approvedBy?.name,
            proposerName: item.proposer.name
          };
        });
      }
      const dateCurent = Date.now();
      this.nameExport = "DanhSachKhenThuongCaNhan_" + moment(dateCurent).format('DD_MM_YYYY');
      return listRemunerative;
    },
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    },
    dateTime(value) {
      return moment(value).format('DD-MM-YYYY');
    },
    resetDataSearch() {
      this.dataSearch.rewardedPersonName = "";
      this.dataSearch.organizationName = "";
      this.dataSearch.rewardedPersonOrganizationName = "";
      this.dataSearch.status = 0;
    },
    createNominated() {
      this.$router.push({ "path": "/remunerative/create" });
    }
  },
}
</script>
<script setup>
import { ref } from "vue";
const basicModalPreview = ref(false);
const smallModalSizePreview = ref(false);
const mediumModalSizePreview = ref(false);
const largeModalSizePreview = ref(false);
const superlargeModalSizePreview = ref(false);
const programmaticallyModal = ref(false);
const warningModalPreview = ref(false);
const buttonModalPreview = ref(false);
const staticBackdropModalPreview = ref(false);
const overlappingModalPreview = ref(false);
const nextOverlappingModalPreview = ref(false);
const headerFooterModalPreview = ref(false);
const deleteModalPreview = ref(false);
const successModalPreview = ref(false);
const tinySliderModalPreview = ref(false);
</script>
<style>
.search {
  gap: 25px;
  display: flex;
  flex-direction: column;
}

.form-search {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.search-layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.search-input-1,
.search-input-2,
.search-input-3,
.search-input-4,
.search-input-5 {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 16px;
  align-items: baseline;
}

.form-btn {
  display: flex;
  justify-content: center;
}

.detail {
  display: flex;
}

.m-custom {
  min-height: 0 !important;
}

.info_left {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 600px;
}

.info_right {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 600px;
}

.title {
  font-size: 48px;
  font-weight: bolder;
  line-height: normal;
}

.wrapper:before {
  background-color: unset !important;
}

.dp__button {
  display: none !important;
}

@media screen and (max-width: 875px) {

  .form-search {
    margin: auto;
  }

  .search-layout {
    display: flex;
    flex-direction: column !important;
    align-items: flex-start;
    gap: 15px !important;
  }

  .search-input-2,
  .search-input-4 label {
    width: 100%;
  }

}

@media screen and (max-width: 1025px) {

  .detail {
    flex-direction: column-reverse;
  }

  .info_left {
    width: 100%;
  }

  .info_right {
    width: 100%;
    margin-left: 0 !important;
    margin-bottom: 1.25rem;
  }
}

@media screen and (max-width: 1100px) {

  .form-search {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .search-layout {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 5%;
  }

  .search-input-2 label {
    width: 7rem;
  }

  .search-input-3 label {
    width: 12rem;
  }

  .search-input-5 label {
    width: 12rem;
  }

}

@media screen and (min-width: 1300px) {

  .modal .modal-dialog.modal-xl {
    width: 1200px !important;
  }
}

@media screen and (min-width: 1800px) {

  .modal .modal-dialog.modal-xl {
    width: 1400px !important;
  }
}

.content {
  min-height: unset !important;
}

.text-danger,
.text-success {
  width: 85px;
}

.intro-y:nth-child(3) {
  height: 45vh;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background: #A9A9A9;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

.textarea-detail-remunerative {
  width: 100%;
}

.text-danger-validate {
  width: 100%;
  text-align: left;
}

.toastify .toastify-content-update {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 2.5rem;
  padding-left: 0px;
}

.message-toast {
  display: flex;
  align-items: center;
}

#success-notification-content .text-success {
  margin-right: -10px;
  width: 65px;
}
</style>