<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-4">Danh sách khen thưởng</h2>
    <div class="mt-2 mb-5 search">
      <div class="intro-y mt-2 form-search">
        <div class="search-layout">
          <div class="search-input-1">
            <label class="w-48">Đối tượng khen thưởng:</label>
            <input type="text" class="form-control w-44" v-model.trim="dataSearch.rewardedPersonName"
              placeholder="Đối tượng khen thưởng" />
          </div>
          <div class="search-input-2">
            <label class="w-48">Trạng thái:</label>
            <TomSelect placeholder="Trạng thái" class="w-44" v-model="dataSearch.status">
              <option value="0">Tất cả</option>
              <option v-for="(item, index) in RemunativeStatusEnum" v-bind:key="index" v-bind:value="index"
                v-bind:selected="(index == dataDetail.status ? true : false)">{{ item }}</option>
            </TomSelect>
          </div>
        </div>
        <div class="search-layout">
          <div class="search-input-3">
            <label class="w-28">Người duyệt:</label>
            <input type="text" class="form-control w-44" v-model.trim="dataSearch.approvedByName"
              placeholder="Người duyệt" />
          </div>
          <div class="search-input-4">
            <label class="w-28">Người đề xuất:</label>
            <input type="text" class="form-control w-44" v-model.trim="dataSearch.proposerName"
              placeholder="Người đề xuất" />
          </div>
        </div>

      </div>
      <div class="form-btn intro-y">

        <button class="btn btn-primary shadow-md mr-2 h-10 ml-auto" @click="search(), loadingIconAction = true"> Tìm
          kiếm
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
          <tr v-for="(item, index) in dataPage" :key="index">
            <td>
              {{ item.id }}
            </td>
            <td>
              <a href="#" class="font-medium whitespace-nowrap">
                {{ item.type == 1 ? item.organization.organizationName : item.rewardedPerson.name }}
              </a>
              <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
              </div>
            </td>
            <td>
              <a href="#" class="font-medium whitespace-nowrap flex  items-left">
                {{ item.type == 1 ? item.organizationName : item.rewardedPerson.organization.organizationName }}
              </a>
            </td>
            <td>
              <Tippy tag="a" href="javascript:;"
                class="tooltip block flex justify-left font-medium w-60 whitespace-nowrap" :content="item.rewardContent"
                :options="{
                  theme: 'light',
                }"><span class="truncate">{{ item.rewardContent }}</span></Tippy>
            </td>
            <td>
              <a href="#" class=" flex justify-left font-medium whitespace-nowrap">
                {{ item.proposer?.name }}
              </a>
            </td>
            <td>
              <a href="#" class=" flex justify-left font-medium whitespace-nowrap">
                {{ dateTime(item.rewardTime) }}
              </a>
            </td>
            <td>
              <a href="#" class=" flex justify-left font-medium whitespace-nowrap">
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
            <td class="table-report__action">
              <div class="flex justify-center items-center">
                <a class="flex items-center mr-3 text-primary"
                  @click="showDetail(item.id); superlargeModalSizePreview = true;" href="javascript:;">
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
    <!-- BEGIN: Failed Notification Content -->
    <div id="failed-notification-content" class="toastify-content toastify-content-update hidden flex">
      <XCircleIcon class="text-danger" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Thất bại!</div>
        <div class="text-slate-500 mt-1">
          Xuất excel thất bại.Vui lòng thử lại!
        </div>
      </div>
    </div>
    <!-- END: Failed Notification Content -->
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3"
      v-if="totalPages > 1">
      <pagination :totalPages="totalPages" :perPage="perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
      <div class="hidden md:block mx-auto lg:col-span-4 text-slate-500">
        Hiển thị {{ currentPage }} trong {{ perPage }} trang của {{ totalRemunerative }} phần tử
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
          <a @click="superlargeModalSizePreview = false" class="absolute right-0 top-3 mr-3" href="javascript:;">
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
          <ModalBody class="text-center m-custom content pt-10 pr-10 pl-10 pb-5">
            <div class="intro-y flex items-center mt-5 mb-3 h-4">
              <h2 class="text-lg font-medium mr-auto">Chi tiết khen thưởng</h2>
            </div>
            <div class="detail">
              <div class="info_left overflow-y-auto">
                <div class="reward_object box">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Trạng thái</h2>
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
                      :value="dataDetail.type == 1 ? dataDetail.organization.organizationName : dataDetail.rewardedPerson.name"
                      disabled />
                    <label for="regular-form-1" class="form-label mt-3">Bộ Phận</label>
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Bộ Phận"
                      :value="dataDetail.type == 1 ? dataDetail.organization.organizationName : dataDetail.rewardedPerson.organization.organizationName"
                      disabled />
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
                      :value="dataDetail.proposer.name" disabled />
                    <label for="regular-form-1" class="form-label mt-3">Ngày để xuất</label>
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
                      :value="dataDetail.approvedBy?.name" disabled />
                    <label for="regular-form-1" class="form-label mt-3" v-if="dataDetail.approvalDate != NULL">Ngày phê
                      duyệt</label>
                    <div class="relative mx-auto" v-if="dataDetail.approvalDate != NULL">
                      <div
                        class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
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
                      :value="dataDetail.approvedBy?.organization.organizationName" disabled />
                  </div>
                </div>
              </div>
              <div class="info_right ml-5 overflow-auto">
                <div class="box">
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
                    <p>{{ dataDetail.note }}</p>
                  </div>
                </div>
                <div class="box mt-5">
                  <!-- BEGIN: Hoverable Table -->
                  <PreviewComponent class="intro-y box mt-5">
                    <div class="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60">
                      <h2 class="font-medium text-base mr-auto">Lịch sử khen thưởng gần nhất</h2>
                      <div class="form-check form-switch w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"
                        v-if="listHistoryOfUser.length > 0">
                        <a @click="redirectPageHistory(dataDetail.rewardedPerson?.id, dataDetail.organization?.id)"
                          href="javascript:;">
                          <label class="form-check-label ml-0" for="show-example-3">Xem thêm</label>
                        </a>

                      </div>
                    </div>
                    <div class="p-5">
                      <Preview>
                        <div class="overflow-x-auto">
                          <table class="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th class="whitespace-nowrap">ID</th>
                                <th class="whitespace-nowrap">Ngày đề xuất</th>
                                <th class="whitespace-nowrap">Bộ phận</th>
                                <th class="whitespace-nowrap">Nội dung khen thưởng</th>
                                <th class="whitespace-nowrap">Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, index) in listHistoryOfUser" :key="index">
                                <td>{{ item.id }}</td>
                                <td>{{ dateTime(item.rewardTime) }}</td>
                                <td>{{ item.type == 1 ? item.organization.organizationName : item.rewardedPerson.organization.organizationName }}
                                </td>
                                <td>{{ item.rewardContent }}</td>
                                <td :class="{
                                  'text-success': item.status == 3,
                                  'text-danger': item.status != 3,
                                }"> {{ RemunativeStatusEnum[item.status] }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Preview>
                    </div>
                  </PreviewComponent>
                  <!-- END: Hoverable Table -->
                </div>
              </div>
            </div>
            <div class="text-center mt-8 h-4">
              <button type="button" @click="superlargeModalSizePreview = false"
                class="btn btn-outline-secondary w-24 mr-1">
                Hủy
              </button>
              <button v-if="dataDetail.status == 2" type="button" class="btn btn-primary w-24 mr-1"
                @click="showUpdate(3); shouldShowModalUpdate = true;" href="javascript:;">Xét duyệt</button>
              <button v-if="dataDetail.status == 2" type="button" class="btn btn-danger w-24"
                @click="showUpdate(4); shouldShowModalUpdate = true;" href="javascript:;">Từ chối</button>
            </div>
          </ModalBody>
        </Modal>
      </Preview>
    </div>

    <!-- Modal update -->
    <div class="p-5">
      <Preview>
        <Modal v-if="shouldShowModalUpdateIs" size="verybigmodal modal-lg" :show="shouldShowModalUpdate"
          @hidden="shouldShowModalUpdate = false">
          <a @click="shouldShowModalUpdate = false" class="absolute right-0 top-3 mr-3" href="javascript:;">
            <XIcon class="w-8 h-8 text-slate-400" />
          </a>
          <ModalBody class="text-center m-custom content pt-10 pr-10 pl-10 pb-5">
            <div class="intro-y flex items-center mt-5 mb-3 h-4">
              <h2 class="text-lg font-medium mr-auto">Xét duyệt khen thưởng</h2>
            </div>
            <div class="detail custom-update-status">

              <div class=" box mt-5 ">
                <div class="reward_object">
                  <div
                    class="flex flex-col items-center sm:flex-row p-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Ghi chú</h2>
                  </div>
                  <div class="m-5">
                    <textarea @blur="validateForm" class="form-control textarea-detail-remunerative "
                      v-model="dataCreate.note" rows="10" cols="50"
                      v-bind:class="{ 'border-danger': errors.messageNote }"></textarea>
                    <p class="text-danger text-danger-validate mt-2" v-if="errors.messageNote">{{ errors.messageNote }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div class="text-center mt-8 h-4">
              <button type="button" @click="shouldShowModalUpdate = false" class="btn btn-outline-secondary w-24 mr-1">
                Hủy
              </button>
              <button type="button" class="btn btn-primary w-24"
                @click="updateStatus(dataDetail.id); shouldShowModalUpdate = true;" href="javascript:;">Cập
                nhập</button>
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
import Validate from '../../assets/common/ValidateBase'
import moment from 'moment'
import Toastify from "toastify-js"
import JsonExcel from "vue-json-excel3"
import { mapGetters } from "vuex";
export default {
  name: 'list',
  components: {
    Pagination,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      loadingIconAction: false,
      totalRemunerative: 0,
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
        rewardedPersonName: "",
        rewardedPersonOrganizationName: "",
        proposerName: "",
        approvedByName: "",
        status: 0
      },
      dataCreate: {
        note: "",
        status: ""
      },
      note: "",
      status: "",
      nameExport: "",
      shouldShowModal: "",
      shouldShowModalUpdateIs: "",
      errors: {
        note: ''
      },
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
      listHistoryOfUser: []
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
      const res = await Remunerative.getRemuneratives(JSON.stringify({ type: 2 }));
      this.result = res.data;
      this.totalRemunerative = this.result.length;
      this.totalPages = (this.result.length / this.perPage).toFixed();
      this.dataPage = this.paginate(this.result, this.perPage, 1);
    },
    async search() {
      this.dataSearch;
      this.LoadingIcon = true;
      let params = {
        rewardedPersonName: this.dataSearch.rewardedPersonName == '' ? null : this.dataSearch.rewardedPersonName,
        rewardedPersonOrganizationName: this.dataSearch.rewardedPersonOrganizationName == '' ? null : this.dataSearch.rewardedPersonOrganizationName,
        proposerName: this.dataSearch.proposerName == '' ? null : this.dataSearch.proposerName,
        approvedByName: this.dataSearch.approvedByName == '' ? null : this.dataSearch.approvedByName,
        status: this.dataSearch.status,
        type: 2
      }
      const res = await Remunerative.getRemuneratives(JSON.stringify(params));
      this.result = res.data
      this.loadingIconAction = false;
      this.totalRemunerative = this.result.length;
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
    validateForm() {
      this.errors = {
        messageNote: ''
      }
      let checkLength = true;
      if (this.note != null && this.note != '') {
        checkLength = Validate.checkTextMaxLength(this.note, 1000);
      }
      return checkLength;
    },
    async updateStatus(idRemunerative) {

      let checkLength = this.validateForm();
      if (!checkLength) {
        this.errors.messageNote = "Vui lòng nhập không quá 1000 ký tự.";
      } else {
        let data = {
          "status": this.dataCreate.status,
          "note": this.dataCreate.note,
          "approvedBy": this.iduser
        }
        const res = await Remunerative.updateStatus(idRemunerative, JSON.stringify(data));
        this.search();
        this.shouldShowModalUpdateIs = false;
        const resDetail = await Remunerative.getRemunerativesDetail({ id: idRemunerative });
        this.dataDetail = resDetail.data;

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
      }
    },
    async showDetail(id) {
      const res = await Remunerative.getRemunerativesDetail({ id: id });
      this.dataDetail = res.data;
      this.dateTime(this.date);
      this.rewardTime = this.dateTime(this.dataDetail.rewardTime);
      this.dataCreate.note = this.dataDetail.note
      this.dataCreate.status = this.dataDetail.status
      this.shouldShowModal = true;
      let remunerativeRemove = [];
      let organizationId = this.dataDetail.type == 1 ? this.dataDetail.organization?.id : null;
      let rewardedPersonId = this.dataDetail.type == 2 ? this.dataDetail.rewardedPerson?.id : null;
      remunerativeRemove.push(this.dataDetail.id);
      let data = {
        "remunerativeRemove": remunerativeRemove,
        "organizationId": organizationId,
        "rewardedPerson": rewardedPersonId,
      }
      let listRemunerativeUser = await Remunerative.getRemunerativeListOfUser(JSON.stringify(data));
      if (listRemunerativeUser.data.length > 5) {
        listRemunerativeUser.data = listRemunerativeUser.data.slice(0, 5)
      }
      this.listHistoryOfUser = listRemunerativeUser.data;
    },
    showUpdate(status) {
      this.shouldShowModalUpdateIs = true;
      this.dataCreate.status = status;
    },
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    },
    dateTime(value) {
      return moment(value).format('DD-MM-YYYY');
    },
    redirectPageHistory(rewardedPersonId, organizationId) {
      this.shouldShowModal = false;
      this.$router.push(`/remunerative/list-history?organizationId=${organizationId}&rewardedPersonId=${rewardedPersonId}`);
    },
    redirectPageCreate() {
      this.$router.push(`/remunerative/create`);
    },
    resetDataSearch() {
      this.dataSearch.rewardedPersonName = "";
      this.dataSearch.proposerName = "";
      this.dataSearch.rewardedPersonOrganizationName = "";
      this.dataSearch.approvedByName = "";
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
const shouldShowModalUpdate = ref(false);

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

  .search-input-1,
  .search-input-2,
  .search-input-3,
  .search-input-4,
  .search-input-5 {
    align-items: center;
  }

  .search-input-4 label {
    width: 6rem !important;
  }

  .search-input-2 label {
    width: 6rem !important;
  }

  .search-input-1 label {
    width: 6rem !important;
  }

  .search-input-3 label {
    width: 6rem !important;
  }

  .search-input-5 label {
    width: 6rem !important;
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

.custom-update-status .box {
  width: 100%;
}
</style>
