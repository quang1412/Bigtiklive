import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  increment,
  deleteDoc,
  Timestamp,
  collection,
  query,
  where,
  limit,
  // orderBy, startAfter
} from 'firebase/firestore/lite';
import { defaultSettings } from './fakeData.js'

const firebaseConfig = {
  apiKey: "AIzaSyCunIat65MI7BDlNGDjhOTzUqXw3zW2qdA",
  authDomain: "bigman-marketing.firebaseapp.com",
  projectId: "bigman-marketing",
  storageBucket: "bigman-marketing.appspot.com",
  messagingSenderId: "146427318803",
  appId: "1:146427318803:web:f76d91a345e142347625e6",
  measurementId: "G-CHDYV45M1V"
};
const firebase = initializeApp(firebaseConfig);
const database = getFirestore(firebase);
const auth = getAuth();

function uidMaker(cid, uid) {
  return (`${cid.substring(0, 5)}-${uid}`)
}

export default database;

export async function createNewChannel(cid) {
  const docRef = doc(database, 'channelSettings', cid);
  await setDoc(docRef, defaultSettings(cid));
  return;
}

export function login(method) {
  if(method !== 'facebook' && method !== 'google') return;
  const provider = (method === 'facebook') ? new FacebookAuthProvider() : (method === 'google') && new GoogleAuthProvider();
  signInWithPopup(auth, provider) 
    .then(async result => {
      const cid = result.user.uid;
      // const credential = (method === 'facebook') ? FacebookAuthProvider.credentialFromResult(result) : (method === 'google') && GoogleAuthProvider.credentialFromResult(result)
      // const accessToken = credential.accessToken;
      // console.log(accessToken);
      
      const { isNewUser } = getAdditionalUserInfo(result) 
      isNewUser && await createNewChannel(cid);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function logout() {
  if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
    await auth.signOut();
    window.location.reload();
  }
};

export async function getChannelSettings(cid) {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(database, 'channelSettings', cid);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          return resolve(docSnap.data());
        } else {
          return reject('không tìm thấy dữ liệu kênh');
        }
      })
      .catch(err => {
        console.log(err)
        return reject(`${err}`);
      })
  })
}

export function saveChannelSetting(cid, data) {
  return new Promise((resolve, reject) => {
    const docRef = doc(database, 'channelSettings', cid);
    updateDoc(docRef, data)
      .then(resolve)
      .catch(reject)
  });
}

export function updateUserCoin(uid, amount) {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(database, 'userData', uid);
    updateDoc(docRef, {
      updateAt: Timestamp.fromDate(new Date()),
      totalAmount: increment(amount),
      totalRewardAmount: increment(amount)
    })
      .then(resolve)
      .catch(reject)
  })
}

export function createChannelUser(cid, eventData, initAmount = 0) {
  return new Promise(async (resolve, reject) => {
    const { uniqueId, userId, userDetails } = eventData;
    const uid = uidMaker(cid, userId);
    const userRef = doc(database, 'userData', uid);
    await setDoc(userRef, {
      id: uid,
      username: uniqueId,
      userId: userId.toString(),
      channelId: cid.toString(),
      createAt: Timestamp.fromDate(new Date()),
      updateAt: Timestamp.fromDate(new Date()),
      thumbnailUrl: userDetails.profilePictureUrls[0],
      totalAmount: initAmount,
      totalRewardAmount: initAmount
    }, { merge: true })
      .then(resolve)
      .catch(reject)
  })
}

export async function getChannelTotalUser(cid) {
  const q = query(collection(database, "userData"), where("channelId", "==", cid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}

export async function getChannelUser(cid, nav) {

  // const first = query(collection(database, "userData"), where("channelId", "==", cid), limit(10));
  // const documentSnapshots = await getDocs(first);

  // // Get the last visible document
  // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  // console.log("last", lastVisible);

  // const next = query(collection(database, "userData"),
  //   where("channelId", "==", cid),
  //   startAfter(lastVisible),
  //   limit(10));

  // const result = { data: [], paginate: {} }
  // documentSnapshots.forEach(doc => {
  //   const data = doc.data();
  //   result.data.push(data);
  // })
  // console.log(result);
  // return result;

  const docRef = collection(database, "userData");
  const q = query(
    docRef,
    where("channelId", "==", cid),
    // orderBy('username'),
    // startAt('Springfield'),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  const result = { data: [], paginate: {} }
  querySnapshot.forEach((doc, index) => {
    const data = doc.data();
    result.data.push(data);
  })
  console.log(result);
  return result;
}

export async function removeAllChannelUser(cid) {
  const q = query(collection(database, "userData"), where("channelId", "==", cid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc, index) => {
    console.log(index);
    deleteDoc(doc.ref);
  });
  console.log('deleted all user');
}

export async function checkExstedUser(cid, userId) {
  const uid = uidMaker(cid, userId);
  // tìm channel uid ở bộ nhớ local
  var isExists = window.existsChannelUser.indexOf(uid) + 1;
  // nếu ko thấy ở local thì check trên database
  if (!isExists) {
    const userRef = doc(database, 'userData', uid);
    const docSnap = await getDoc(userRef);
    isExists = docSnap.exists();
    isExists && window.existsChannelUser.push(uid)
  }
  return isExists;
} 
