<script setup>
import { onMounted, ref } from 'vue'
import { collection, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../api-services/Firebase'

// const someTodo = useDocument(doc(collection(db, 'todos'), 'someId'))
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'user'))
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref)
    })
    const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            console.log(change)
        })
    })
})
</script>

<template>
    <ul></ul>
</template>
