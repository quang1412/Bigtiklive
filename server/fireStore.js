require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const serviceAccountKey=  JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

initializeApp({ credential: cert(serviceAccountKey), databaseURL: 'https://bigman-marketing.firebaseio.com' });
const database = getFirestore();

async function getChannelSettings(cid) {
  const userRef = database.collection('channelSettings').doc(cid);
  const doc = await userRef.get();
  return (doc.exists ? doc.data() : {});
}

// async function updateChanelSettings(cid, data) {
//   const writeResult = await database.collection('channelSettings').doc(cid).update(data);
//   return writeResult;
// }

// async function findChannelUser(cid, uid) {
//   if (!cid || !uid) return false;
//   let userRef = db.collection("userData");

//   let users = await userRef.where('channelId', '==', cid).where('userId', '==', uid).get()

//   return users.empty ? false : users[0];
// }

// async function updateUserCoin(uid, amount) {
//   const useRef = database.collection('userData').doc(uid);
//   const res = await useRef.update({
//     updateAt: Timestamp.fromDate(new Date()),
//     totalAmount: FieldValue.increment(amount),
//     totalRewardAmount: FieldValue.increment(amount)
//   });
// }

module.exports = { database, getChannelSettings }