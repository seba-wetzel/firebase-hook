import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, QuerySnapshot, CollectionReference, DocumentReference, Firestore } from "firebase/firestore";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";


let DB: Firestore;
let AUTH: Auth;

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  measurementId?: string;
}
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export const useInitializeFirebase = (initialConfig: FirebaseConfig): Boolean => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      initializeApp(initialConfig);
      DB = getFirestore();
      AUTH = getAuth();
      setInitialized(true);
    }
  } , [initialized]);
  return initialized;
}


export const useFirestore =  (collectionPath:string) => {
    const [docs, setDocs] = useState < null| QuerySnapshot>(null);
    useEffect(() => {
        async function getData() {
            const collectionReference: CollectionReference = collection(DB, collectionPath);
            const querySnapshot = await getDocs(collectionReference);
            setDocs(querySnapshot);
        }   
        if(!docs) getData();
    }, [docs, collectionPath]);
    

    return docs;
}

export const useOnAuthStateChanged = (callback: (user: User | null) => User | null) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, callback);
    return () => unsubscribe();
  } , []);
}


/* 
@param {string} collection name
@return {object} doc snapshot created in firestore
@return {function} setData to save data in collection
@return {object} error if any
@description This function is used to create a new collection in firestore
*/
export const useFirestoreAdd =  (collectionPath: string) => {
    const [docs, setDocs] = useState < null| DocumentReference>(null);
    const [error, setError] = useState<any>(null);
   
    async function setData(data: String) {
        try {
            const collectionReference: CollectionReference = collection(DB, collectionPath);
            const docRef = await addDoc(collectionReference, data);
            setDocs(docRef);
          
          } catch (e) {
            setError(e);
          }
        }   

    return [docs, setData, error];
}















//test function
export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
