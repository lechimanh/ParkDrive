<template>
    <div class="list-attendance">
        <h2 class="intro-x text-lg font-medium mt-4 text-green-400">Danh sách đã điểm danh</h2>
        <div class="box checked" :class="{ 'h-[200px]': Object.getOwnPropertyNames(userCheckin).length === 0 || userCheckin.length === 0 }">
            <ul class="ul-checked intro-x" :class="{ 'ul-checked-3': userCheckin.length <= 3 }" v-if="userCheckin.length > 0">
                <li
                    v-for="(item, key) in userCheckin"
                    :key="key"
                    class="li-checked"
                    :class="{
                        animation: key === newBlockIndex,
                        'li-checked-3': userCheckin.length <= 3,
                        'li-checked-5': userCheckin.length > 3 && userCheckin.length <= 5,
                        'li-checked-6': userCheckin.length > 5 && userCheckin.length <= 6,
                        'animate-zoom': flag == 1
                    }"
                >
                    <img
                        :src="item.imageUrl"
                        alt=""
                        class="image-checked"
                        :class="{ 'w-[200px]': userCheckin.length <= 3, 'h-[200px]': userCheckin.length <= 3 }"
                    />
                    <div
                        class="info-user w-full text-center mt-2 font-medium"
                        :class="{ 'text-success': item.checkOnTime === 0, 'text-danger': item.checkOnTime === 1 }"
                    >
                        <p class="checked-name inline">{{ item.name }}</p>
                        <p class="time-checked">Giờ: {{ item.checkinTime }}</p>
                        <div class="flex justify-center whitespace-nowrap items-center" v-if="item.checkOnTime === 0">
                            <CheckSquareIcon class="w-4 h-4 mr-2" />Đã điểm danh
                        </div>
                        <div class="flex justify-center whitespace-nowrap items-center" v-else><AlertTriangleIcon class="w-4 h-4 mr-2" />Đi trễ</div>
                    </div>
                </li>
            </ul>
            <span
                class="checked-empty border-2 border-dashed shadow-sm border-red-500 dark:border-red-400 rounded-md p-10"
                v-else-if="userCheckin.length === 0"
                >Chưa nhân viên nào điểm danh !!!</span
            >
        </div>
        <h2 class="intro-x text-lg font-medium mt-4 h-2 text-red-500">Danh sách chưa điểm danh</h2>
        <div class="box unchecked" :class="{ 'h-[200px]': Object.getOwnPropertyNames(userNotCheckin).length === 0 || userNotCheckin.length === 0 }">
            <ul class="ul-checked intro-x" :class="{ 'ul-checked-3': userNotCheckin.length <= 3 }" v-if="userNotCheckin.length > 0">
                <li
                    v-for="(item, key) in userNotCheckin"
                    :key="key"
                    class="li-checked"
                    :class="{
                        'li-checked-3': userNotCheckin.length <= 3,
                        'li-checked-5': userNotCheckin.length > 3 && userNotCheckin.length <= 5,
                        'li-checked-6': userNotCheckin.length > 5 && userNotCheckin.length <= 6,
                        'animate-remove': item.id == idNotCheckIn
                    }"
                >
                    <img :src="item.imageUrl" alt="" class="image-checked" />
                    <span class="unchecked-name checked-name inline mt-2">{{ item.name }}</span>
                </li>
            </ul>
            <span
                class="unchecked-empty border-2 border-dashed shadow-sm border-green-400 dark:border-green-400 rounded-md p-10"
                v-else-if="userNotCheckin.length === 0"
                >Tất cả nhân viên đã điểm danh</span
            >
        </div>
    </div>
</template>

<script>
import { doc } from 'firebase/firestore'
import CheckinUserApi from '../../api-services/CheckinUserApi'
import { collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore'
import { db } from '../../api-services/Firebase'
import moment from 'moment'
import { concat } from 'lodash'
export default {
    data() {
        return {
            userCheckin: {},
            userNotCheckin: {},
            flag: null,
            idNotCheckIn: 0
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            const checkin = await CheckinUserApi.getUserCheckin(JSON.stringify({}))
            this.userCheckin = checkin.data
            console.log(this.userCheckin)
            const notCheckin = await CheckinUserApi.getUserNotCheckin(JSON.stringify({}))
            this.userNotCheckin = notCheckin.data
        },
        dateTime(value) {
            return moment(value).format('DD-MM-YYYY')
        },
        checkIn(user) {
            let userCheck = null
            Object.keys(this.userNotCheckin).map((key, value) => {
                if (this.userNotCheckin[key].id == user.employeeId) {
                    this.flag = 1
                    this.idNotCheckIn = this.userNotCheckin[key].id
                    userCheck = this.userNotCheckin[key]
                    userCheck.checkinDate = user.checkinDate.timestamp
                    userCheck.checkinTime = user.checkinTime.split('.')[0]
                    userCheck.checkOnTime = user.checkOnTime
                } else {
                }
            })
            if (userCheck != null) {
                this.userCheckin.unshift(userCheck)
                this.userNotCheckin = this.userNotCheckin.filter(function (el) {
                    return el.id != user.employeeId
                })
            }
        }
    },
    async mounted() {
        const querySnapshot = await getDocs(collection(db, 'user'))
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
        })
        const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                this.checkIn(change.doc.data())
            })
        })
    }
}
</script>

<style>
.intro-y:nth-child(3) {
    height: 100%;
}
.text-danger,
.text-success {
    width: 85px;
}
.text-warning {
    color: #f7b217;
}
.list-attendance {
    height: 95%;
    padding: 10px 0 30px 0;
}
.checked,
.unchecked {
    display: flex;
    align-items: center;
}

.checked-empty {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #ff7675;
}
.unchecked-empty {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #69f470;
}
.unchecked {
    margin-top: 20px;
    justify-content: center;
    transition: all 0.5s ease;
}
.li-checked {
    width: 12.99999%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 5px 7px 5px 7px;
    transition: all 0.5s ease;
}
.ul-checked {
    width: 100%;
    margin-left: 3px;
    padding: 10px 4px 10px 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.image-checked {
    width: 130px;
    height: 130px;
    object-fit: cover;
    margin: auto;
    display: block;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 0 5px rgba(255, 255, 255, 0.5), 0 8px 16px rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
}
.image-checked:hover {
    transform: scale(1.5);
    z-index: 9999;
    cursor: pointer;
}
.checked-200 {
    height: 200px;
}

.ul-checked-3 {
    width: 100%;
    justify-content: space-evenly !important;
}

.li-checked-5 {
    margin: 10px 10px 0 5px !important;
    width: 18% !important;
}
.li-checked-6 {
    width: 15% !important;
    margin: 0 10px 0 5px !important;
}
.li-checked-3 {
    width: 20% !important;
    margin: 30px 0 30px 0 !important;
}
ul > .li-checked-5 {
    margin: auto;
}
ul > .li-checked-6 {
    margin: auto;
}
.unchecked-name,
.checked-name {
    white-space: nowrap;
}
.animate-zoom {
    animation: zoom 0.5s ease-in-out;
}
.animate-remove {
    animation: zoomOut 1s ease-out;
}
@keyframes zoom {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes zoomOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0);
    }
}
</style>
