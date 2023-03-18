
import { getFirestore, collection } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseApp } from '../firebase'
export  const db = getFirestore(firebaseApp)

