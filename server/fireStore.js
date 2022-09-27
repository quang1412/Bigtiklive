require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const serviceAccountKey=  JSON.parse('{ "type": "service_account", "project_id": "bigman-marketing", "private_key_id": "a229821eb6536ec29f094864726165ad4923f6e7", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVH+8vh5RWNdqp\nMZMP4hwPXpepIsZaTuAO3hJc7qMQCEBgbog18oBFi+UKnyQ/bx7NLSAr3o32F/4a\nXKGQKYVt1eIMzxYoTrrrBCVSgS98v3CHwWyPvz+FeUbh/z/mgp8LqBOXw/FSv1W0\nd6uDu8+6aVa8Glo7GWFHAG5nj2jagLmh3KUi5pK1f9FLf7wbD1anMLvySAo8hxJ3\nSCPqmz4pNupEs4VHFYyQPSPyKUOc84/WdrmxUfde5zLakzThTXYKvqs348abGppy\nfcM8oyydhV4NI6hvWxuzi18EEMXufcfD2lXswulJBQSznVfMXmqKyWr5QSA0FDGR\nWGMkxVnRAgMBAAECggEAERhlGiTHy45G7+h//G0mXFiyuDAFXyr1op6wqjitNtRL\nVQK22MBhFhfwfOQ7io4ZkNnge0b7LUAY4DrIRreL1UiUrnU7DAnigbiq8qdeo0Vr\nCBUTdfMtvAZoKtZRJALLatGs1VQgISVQFO03G1X3fV5AFDZNK8NAFJynC3Y0RgAY\n+W3iV4KyfPFpS4jchpEPgH5mlKvo+mvdJeokL7v1d4ekNhv9etBEJIKNcIYA0GUB\nTzKtxIDF2+s05zdaWe9QyrlqpLH1ZpLqZ9Tcq+x3IL+0Sg62uPbaXxyFueddD5CM\nR3H2LPIh8XBzgzC5lXbQdyP995roTb+JfjuwzlBAlQKBgQDHIYGrnGE4DEH+R5/B\nWoJXSt/9uwFd+waPxJpFssDEeElkq5Xfjjwq5O7vVu1jFlVcAU4MfSASn7haIkkv\no1zomAFwBDXqbgu9kQXYbprz8irnT6ysfNWsZTMuGl+eEGr/XnnVVUiFI9X3GjwI\ngpxtAjovtGkJDV1K0IAwD3p/EwKBgQC/tnhawo72kCqQb5QPWj1lzZTjl8qwQ+04\n3ddmsJuRQP16Oc2e8q6NOUTwYxk2Rvkw3Hw6VVSryP6AURqAaR+EJQI4GOkLNuUN\n7BcpyAfG0eWn6toC8YwriJS/H9U92QswhvdLPAvbqIbUgLyACr2qU1qd/u2PcfS0\nMeWOKd8MCwKBgFp6nQKu0XW4DBxPywT97Q9g1Bnj6KEdOEQG3togeHpM9XwqgrTL\nWgdbcj2Jz98f/LULWr1N9U7BB/Dcd0iP/90nhC+zmhPk4KzHwlIvH3UMafYkO588\nMZJdgT3Hef7GEvfpo44NbCAiwku+vdxYDF9zjaCzZq5YRjWCO1ybC9vFAoGAfzI3\npDAV3m1EcFQ3bgA3YEYIFQDvEAfhaqt1cMKYVMVD6EZVsLHfMf/fR4bYgXSRfOOs\n4J8g8GEIymYFKVGWAXz0ffe5FyGy04viymvXDQjSUJi3UOCmWXPjDPO37bMFg4ro\npFgQngqweml3p5R4xntLUiyDvXqkGrJIVgxd2oUCgYEApBtJ+c/1QcNty1tNcAGJ\n7kmMoneQ1nYlrGOdojdV63LHfGtTZ5qCZdRPmYcH1te+PATi6LSGqivwhDpz8Ck1\nQ5at6VLWTmf6Ble3i0fJ9EpUJ6/wUVK6p4/2DA79Gv10ZL2poXSWAFFwB+KLbux4\ntl2ftvqI+n+rprlMzIwcjho=\n-----END PRIVATE KEY-----\n", "client_email": "firebase-adminsdk-9ehez@bigman-marketing.iam.gserviceaccount.com", "client_id": "105506808299283034114", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9ehez%40bigman-marketing.iam.gserviceaccount.com" }');

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