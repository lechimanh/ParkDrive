<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-4">Danh sách lịch sử khen thưởng</h2>
    <div class="mt-2 mb-5 search form-search-update">
      <div class="intro-y mt-2 form-search">
        <div class="search-input-5">
          <label class="w-24">Trạng thái:</label>
          <TomSelect placeholder="Trạng thái" class="w-48" v-model="dataSearch.status">
            <option value="0">Tất cả</option>
            <option v-for="(item, index) in RemunativeStatusEnum" v-bind:key="index" v-bind:value="index"
              v-bind:selected="(index == dataDetail.status ? true : false)">{{ item }}</option>
          </TomSelect>
        </div>
      </div>
      <div class="form-btn intro-y mt-2">
 
        <button class="btn btn-primary shadow-md mr-2 h-10 ml-auto" @click="search()"> Tìm kiếm
          <SearchIcon class="w-5 h-5 ml-2" />
        </button>
        <button class="btn btn-primary shadow-md mr-2 h-10" @click="resetDataSearch()">Xóa điều kiện tìm kiếm
          <Trash2Icon class="w-4 h-4 ml-2" />
        </button>
        <download-excel class="btn btn-primary shadow-md mr-2 h-10 ml-auto" :data="json_data" :fields="json_fields"
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
            <th class="whitespace-nowrap text-left">BỘ PHẬN</th>
            <th class="text-left whitespace-nowrap">NỘI DUNG KHEN THƯỞNG</th>
            <th class="text-left whitespace-nowrap">NGƯỜI ĐỀ XUẤT</th>
            <th class="whitespace-nowrap text-left">NGÀY ĐỀ XUẤT</th>
            <th class="whitespace-nowrap text-left">NGƯỜI DUYỆT</th>
            <th class="text-left whitespace-nowrap">TRẠNG THÁI</th>
            <th class="text-left whitespace-nowrap">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataPage" :key="index" class="intro-x">
            <td>
              {{ item.id }}
            </td>
            <td>
              <a href="" class="font-medium whitespace-nowrap">
                {{ item.type == 1 ? item.organization?.organizationName : item.rewardedPerson?.name }}
              </a>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
              </div>
            </td>
            <td>
              <a href="" class="font-medium whitespace-nowrap flex  items-left">
                {{ item.type == 1 ? item.organization?.organizationName : item.rewardedPerson?.organization?.organizationName }}
              </a>
            </td>
            <td>
              <Tippy tag="a" href="javascript:;"
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap truncate "
                :content="item.rewardContent" :options="{
                  theme: 'light',
                }">{{ item.rewardContent }}</Tippy>
            </td>
            <td>
              <a href="" class=" flex justify-left font-medium whitespace-nowrap">
                {{ item.proposer.name }}
              </a>
            </td>
            <td>
              <a href="" class=" flex justify-left font-medium whitespace-nowrap">
                {{ dateTime(item.rewardTime) }}
              </a>
            </td>
            <td>
              <a href="" class=" flex justify-left font-medium whitespace-nowrap">
                {{ item.approvedBy?.name }}
              </a>
            </td>
            <td>
              <div class="flex items-left justify-left whitespace-nowrap" :class="{
                'text-success': item.status == 3,
                'text-danger': item.status != 3,
              }">
                <CheckSquareIcon class="w-4 h-4 mr-2" />
                {{ RemunativeStatusEnum[item.status] }}
              </div>
            </td>
            <td class="table-report__action w-30">
              <div class="flex justify-center items-center">
                <a class="flex items-center mr-3 text-primary"
                  @click="showDetail(item.remunerativeId); superlargeModalSizePreview = true;" href="javascript:;">
                  <EyeIcon class="w-4 h-4 mr-1" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Success Notification Content -->
    <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
      <CheckCircleIcon class="text-success" />
      <div class="ml-1 mr-2 message-toast">
        <div class="text-slate-500">
          Cập nhập trạng thái khen thưởng thành công!
        </div>
      </div>
    </div>
    <!-- END: Success Notification Content -->
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3"
      v-if="totalPages > 1">
      <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
      <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
        Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalHistory }} phần tử
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
              <h2 class="text-lg font-medium mr-auto">Chi tiết khen thưởng</h2>
            </div>
            <div class="detail">
              <div class="info_left overflow-y-auto">
                <div class="reward_object box mt-5">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Trạng thái </h2>
                  </div>
                  <div class="p-3 text-left">
                    <input type="text" class="form-control" :value="RemunativeStatusEnum[dataDetail.status]" disabled/>
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
                      :value="dataDetail.type == 1 ? dataDetail.organization.organizationName : dataDetail.rewardedPerson.name" disabled />
                    <label for="regular-form-1" class="form-label mt-3">Bộ Phận</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Bộ Phận"
                      :value="dataDetail.type == 1 ? dataDetail.organization.organizationName : dataDetail.rewardedPerson.organization.organizationName" disabled />
                  </div>
                </div>
                <div class="proposer box mt-5">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Người đề xuất</h2>
                  </div>
                  <div class="p-3 text-left">
                    <label for="regular-form-1" class="form-label">Tên</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Tên"
                      :value="dataDetail.proposer.name" disabled/>
                    <label for="regular-form-1" class="form-label mt-3">Ngày để xuất</label>
                    <div class="relative mx-auto">
                      <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
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
                                    }" class="form-control pl-12"  disabled/>
                  </div>
                    <label for="regular-form-1" class="form-label mt-4">Bộ phận</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Bộ phận "
                      :value="dataDetail.proposer.organization.organizationName" disabled />

                  </div>
                </div>
                <div class="approver box mt-5">
                  <div
                    class="flex flex-col sm:flex-row items-center p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Người phê duyệt</h2>
                  </div>
                  <div class="p-3 text-left">
                    <label for="regular-form-1" class="form-label">Tên</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Tên"
                      :value="dataDetail.approvedBy?.name" disabled/>
                    <label for="regular-form-1" class="form-label mt-3" v-if="dataDetail.approvalDate != NULL">Ngày phê duyệt</label>
                    <div class="relative mx-auto" v-if="dataDetail.approvalDate != NULL">
                      <div class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <CalendarIcon class="w-4 h-4" />
                      </div>
                      
                      <Litepicker v-model="date" :options="{
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
                    <label for="regular-form-1" class="form-label mt-3">Bộ phận</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Bộ phận "
                      :value="dataDetail.approvedBy?.organization?.organizationName" disabled />
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
                      <h2 class="font-medium text-base  mr-20 w-40 ml-auto ">{{ dataDetail.approvedBy?.name }}</h2>
                    </div>
                  </div>
                </div>
                <div class=" box mt-5 ">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Ghi chú</h2>
                  </div>
                  <div class="m-5">
                      {{ dataDetail.note }}
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
import Pagination from '../../components/pagination/pagination.vue'
import Remunerative from '../../api-services/RemunerativeApi'
import RemunativeStatusEnum from '../../common/remunative'
import moment from 'moment'
import JsonExcel from "vue-json-excel3"
import RoleApi from "../../api-services/RoleApi";
import { mapGetters } from 'vuex';
export default {
  name: 'ListHistory',
  components: {
    Pagination,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      userList : [],
      loadingIconAction: false,
      totalHistory: 0,
      rewardTime: "",
      date: "",
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      result: {},
      dataPage: {},
      dataDetail: {},
      proposerOrganization: "",
      approvedOrganization: "",
      dataSearch: {
        organizationId: 0,
        rewardedPersonId: "",
        status: 0
      },
      note: "",
      status: "",
      nameExport: "",
      shouldShowModal: "",
      errors: {
        note: ''
      },
      json_fields: {
        'ID': "remunerativeId",
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
    this.getListUser();
  },
  computed: mapGetters('auth', ['iduser']),
  watch: {
    "perPage": function () {
      this.dataPage = this.paginate(this.result, this.perPage, this.currentPage);
    },
  },
  methods: {
    async getListUser(){
            const res = await RoleApi.getListUser(JSON.stringify({}));
            this.userList = res.data
    },
    async init() {
      let organizationId = this.$route?.query?.organizationId;
      this.dataSearch.organizationId = organizationId;
      let rewardedPersonId = null;
      console.log("asdasd:"+organizationId);
      if(organizationId == "undefined" || organizationId == undefined){
        console.log("111"+this.$route?.query?.rewardedPersonId);
         rewardedPersonId = this.$route?.query?.rewardedPersonId != undefined ? this.$route?.query?.rewardedPersonId : this.iduser;
         organizationId = 0;
      }
   

      this.dataSearch.rewardedPersonId = rewardedPersonId;
      this.dataSearch.organizationId = organizationId;
      let data = {
        "remunerativeRemove": [],
        "organizationId": organizationId,
        "rewardedPerson": rewardedPersonId,
      }
      let res = await Remunerative.getRemunerativeListOfUser(JSON.stringify(data));
      this.result = res.data;
      this.totalHistory = this.result.length;
      this.totalPages = (this.result.length / this.perPage).toFixed();
      this.dataPage = this.paginate(this.result, this.perPage, 1);
    },
    async search() {
    
      this.dataSearch;
      let params = {
        status: parseInt(this.dataSearch.status),
        remunerativeRemove: [],
        organizationId:  this.dataSearch.organizationId,
        rewardedPerson: this.dataSearch.rewardedPersonId,
      }
      let res = await Remunerative.getRemunerativeListOfUser(JSON.stringify(params));
      this.result = res.data
      this.loadingIconAction = false;
      this.totalHistory = this.result.length;
      this.totalPages = (this.result.length / this.perPage).toFixed();
      this.dataPage = this.paginate(this.result, this.perPage, 1);
    },
    onPageChange(page) {
      this.dataPage = this.paginate(this.result, this.perPage, page);
      this.currentPage = page;
    },
    async fetchData() {
      let listRemunerative = [{
        remunerativeId: "",
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
            rewardedPersonName: item.type == 1 ? item.organizationName : item.rewardedPersonName,
            rewardedPersonOrganizationName: item.type == 1 ? item.organizationName : item.rewardedPersonOrganizationName
          };
        });
      }
      const dateCurent = Date.now();
      this.nameExport = "LichSuKhenThuong_" + moment(dateCurent).format('DD_MM_YYYY');
      return listRemunerative;
    },
    async showDetail(id) {
      const res = await Remunerative.getRemunerativesDetail({ id: id });
      this.dataDetail = res.data;
      this.dateTime(this.date);
      this.rewardTime = this.dateTime(this.dataDetail.rewardTime);
      const res1 = await Remunerative.getOrganizationByUser({ id: this.dataDetail.proposerId });
      this.proposerOrganization = res1.data.organizationName;
      if(this.dataDetail.approvedById != 0 && this.dataDetail.approvedById != null){
         const res2 = await Remunerative.getOrganizationByUser({ id: this.dataDetail.approvedById });
         this.approvedOrganization = res2.data.organizationName;
      }
      this.note = this.dataDetail.note;
      this.status = this.dataDetail.status
      this.shouldShowModal = true
    },
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    },
    dateTime(value) {
      return moment(value).format('DD-MM-YYYY');
    },
    resetDataSearch() {
      this.dataSearch.organizationId = 0;
      this.dataSearch.status = 0;
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
<style scoped>
.content .form-search-update {
  display: flex;
  flex-direction: row;
}
.search-input-1-text{
  align-items: center !important;
}
</style>