import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { ref, onUnmounted } from 'vue'
let config = {
    apiKey: 'AIzaSyCf2zWFWg13SHH99YyDS1Md3GpN8ErsUr8',
    authDomain: 'parking-1943b.firebaseapp.com',
    databaseURL: 'https://parking-1943b-default-rtdb.firebaseio.com',
    projectId: 'parking-1943b',
    storageBucket: 'parking-1943b.appspot.com',
    messagingSenderId: '227634942260',
    appId: '1:227634942260:web:29eba01249323ad4be9561',
    measurementId: 'G-ZSG7F6PBHX'
}

firebase.initializeApp(config)

const db = firebase.firestore()
export { db }
const usersCollection = db.collection('users')

export const createUser = (user) => {
    return usersCollection.add(user)
}
export const getUser = async (id) => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}
export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user)
}
export const deleteUser = (id) => {
    return usersCollection.doc(id).delete()
}

export const useLoadUser = () => {
    const users = ref([])
    const close = usersCollection.onSnapshot((snapshot) => {
        users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}

const parkingCollection = db.collection('parkingLots')

export const createParking = (park) => {
    return parkingCollection.add(park)
}
export const getParking = async (id) => {
    const park = await parkingCollection.doc(id).get()
    return park.exists ? park.data() : null
}
export const updateParking = (id, park) => {
    return parkingCollection.doc(id).update(park)
}
export const deleteParking = (id) => {
    return parkingCollection.doc(id).delete()
}

export const getAllParkingLots = () => {
    const parkingLotsRef = db.collection('parkingLots')
    return parkingLotsRef
}
export const useLoadParking = () => {
    const park = ref([])
    const close = parkingCollection.onSnapshot((snapshot) => {
        park.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return park
}

const parkingSlotCollection = db.collection('parkingSlots')

export const createParkingSlot = (park) => {
    return parkingSlotCollection.add(park)
}
export const getParkingSlot = async (id) => {
    const park = await parkingSlotCollection.doc(id).get()
    return park.exists ? park.data() : null
}
export const updateParkingSlot = (id, park) => {
    return parkingSlotCollection.doc(id).update(park)
}
export const deleteParkingSlot = (id) => {
    return parkingSlotCollection.doc(id).delete()
}

export const getAllParkingLotsSlot = () => {
    const parkingLotsRef = db.collection('parkingSlot')
    return parkingLotsRef
}
export const useLoadParkingSlot = () => {
    const park = ref([])
    const close = parkingSlotCollection.onSnapshot((snapshot) => {
        park.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return park
}
