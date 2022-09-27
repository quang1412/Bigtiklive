require('dotenv').config();
const { database, getChannelSettings } = require('./fireStore');
const { WebcastPushConnection, signatureProvider } = require('tiktok-live-connector');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const express = require("express");
const path = require("path");
const app = express();
let activeTiktokRoom = {};

signatureProvider.config.extraParams.apiKey = "MzI2OGMwZDAxNjdhNzQ4ZjFhNDJmOTM0ZjliZmYyYWJhZmZiODUwMWQ4OTI3ZWVhNDRmYzY5";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 2096;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}
// Start the listener!
const server = app.listen(port, () => {
  console.log("❇️ Express server is running on port", server.address().port);
});

const io = socket(server, { path: '/socket' });



app.get('/api/duplicatecheck', async (req, res) => {
  const result = { error: false, error_msg: null, data: null };
  const cid = req.query.cid;
  if (!cid || cid === 'undefined') {
    result.error = true;
    result.error_msg = 'Dữ liệu đầu vào không hợp lệ';
  }
  else {
    const room = io.sockets.adapter.rooms.get(cid);
    const roomSize = room ? room.size : 0;
    result.error = roomSize > 1
    result.error_msg = roomSize > 1 ? 'Phát hiện trùng lặp trang admin.' : null;
  }
  return res.status(200).send(result);
});

app.post('/api/test-event', (req, res) => {
  const cid = req.body.cid;
  const event = req.body.event;
  if (!cid || !event) return res.status(200).send('dữ liệu đầu vào không hợp lệ');
  var data;
  switch (event) {
    case 'like':
      // data = fakeLikeEvent();
      break;
    case 'gift':
      // data = fakeLikeEvent();
      break;
    case 'follow':
      // data = fakeLikeEvent();
      break;
    case 'share':
      // data = fakeLikeEvent();
      break;
    default:
  }
  io.of('/').to(cid).emit(`tiktok_${event}`, data);
  io.of('/widget').to(cid).emit(`tiktok_${event}`, data);
  return res.status(200).send('OK');
});

app.get('/api/resetlikeranking', (req, res) => {
  const cid = req.query.cid;
  if (!cid) return;
  io.of('/widget').to(cid).emit('likerankreset');
  return res.status(200).send('ok');
});

app.get('/api/ggtts', (req, res) => {
  let text = req.query.text || 'xin chào';
  let lang = req.query.lang || 'vi';
  let slow = (req.query.slow || false) == 'true';
  // speechBase64(text, lang, slow, base64 => {
  //   base64 ? res.status(200).send('data:audio/wav;base64,' + base64) : res.status(500).send('fail')
  // })
});

app.get('/api', (req, res) => {
  res.status(200).send('<h5>Bigman marketing - tiktool API</h5>')
});


function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}



class TiktokLive {
  constructor(id) {
    this.id = id;
    this.channelIds = [];
    this.tiktok = new WebcastPushConnection(id || 'norinpham_m4', {
      clientParams: { "app_language": "en-US", "device_platform": "web" },
      enableExtendedGiftInfo: true,
      processInitialData: false,
    });
    this.roomInfo = { isConnected: false };
    this.listening();

    activeTiktokRoom[id] = this;

    console.log('CREATE NEW TIKTOK ROOM', this.id);
    console.log('active Tiktok Room', Object.keys(activeTiktokRoom))
  }
  updateChannelIds() {
    this.channelIds = socketsCustomInfo.getChannelByTiktokId(this.id);
  }
  emit(messenger, data = true) {
    io.of('/').to(`tiktok-${this.id}`).emit(messenger, data);
    this.channelIds.map(id => io.of('/widget').to(id).emit(messenger, data));
  }
  startConnect() {
    clearTimeout(this.disconnectDelay);
    this.emit('tiktok_roomInfo', this.roomInfo);
    if (this.roomInfo.isConnected) return;

    this.roomInfo.isConnected = true;
    this.tiktok.connect()
      .then(roomInfo => {
        this.roomInfo = roomInfo;
        this.emit('tiktok_connected', roomInfo);
        console.log(this.id, '✅ Connected :)');
      })
      .catch(err => {
        this.emit('tiktok_connectFailed', `${err}`);
        this.roomInfo.isConnected = false;
        this.emit('tiktok_roomInfo', this.roomInfo);
        console.log(`Tiktok connect failed ${err}`);
      })
  }
  stopConnect() {
    this.disconnectDelay = setTimeout(() => {
      this.tiktok.disconnect();
      delete activeTiktokRoom[this.id];
    }, 20000)
  }
  listening() {
    this.tiktok.on('disconnected', () => {
      this.roomInfo.isConnected = false;
      this.emit('tiktok_disconnected');
      console.log(this.id, '❌ Disconnected :(');
    })

    this.tiktok.on('chat', data => {
      // console.log(this.id, `${data.uniqueId} writes: ${data.comment}`);
      this.emit('tiktok_chat', { ...data, name: 'chat', id: makeid(10) });
    })

    this.tiktok.on('gift', data => {
      this.emit('tiktok_gift', { ...data, name: 'gift', id: makeid(10) });
    })

    this.tiktok.on('like', data => {
      // console.log(this.id, `${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
      this.emit('tiktok_like', { ...data, name: 'like', id: makeid(10) });
    })

    this.tiktok.on('follow', data => {
      // console.log(this.id, 'social event data:', data);
      this.emit('tiktok_follow', { ...data, name: 'follow', id: makeid(10) });
    })

    this.tiktok.on('share', data => {
      // console.log(this.id, 'social event data:', data);
      this.emit('tiktok_share', { ...data, name: 'share', id: makeid(10) });
    })

    this.tiktok.on('roomUser', data => {
      this.emit('tiktok_roomUser', { ...data, name: 'roomUser', id: makeid(10) });
    })
  }
}



const socketsCustomInfo = {
  data: {},
  create: (socketId, channelId) => {
    this.data = { ...this.data, [socketId]: { 'channelId': channelId, 'tiktokId': null } };
  },
  destroy: socketId => {
    delete this.data[socketId]
  },
  set: (socketId, props) => {
    const current = this.data[socketId] || {};
    this.data[socketId] = { ...current, ...props }
  },
  getChannelByTiktokId: tiktokId => {
    const subscribers = [];
    Object.keys(this.data).forEach(socketId => {
      const info = this.data[socketId];
      info.tiktokId === tiktokId && subscribers.push(info.channelId);
    })
    return [...new Set(subscribers)]; //unique filter
  }
}

io.of('/').on('connection', async socket => {
  const cid = socket.handshake.query.cid;
  if (!cid) return socket.disconnect();

  var currentTiktokID = null;

  socketsCustomInfo.create(socket.id, cid);
  socket.join(cid);

  const doc = database.collection('channelSettings').doc(cid);
  const offSettingsSnapshot = doc.onSnapshot(async docSnapshot => {
    const settings = docSnapshot.data();
    io.of('/widget').to(cid).emit('updateSetting', settings);

    const newTiktokID = settings.basic_tiktokid;

    socketsCustomInfo.set(socket.id, { 'tiktokId': newTiktokID })

    socket.leave('tiktok-' + currentTiktokID);
    socket.join('tiktok-' + newTiktokID);
    currentTiktokID = newTiktokID;
  });

  socket.on('disconnect', _ => {
    offSettingsSnapshot();
    socketsCustomInfo.destroy(socket.id)
  });

  console.log('NEW CHANNEL IS CONNECT', socket.id, cid);
});



io.of("/").adapter.on("create-room", (room) => {
  const prefix = 'tiktok-';
  if (room.includes(prefix)) {
    const tiktokId = room.replace(prefix, '');

    const tiktokRoom = activeTiktokRoom[tiktokId] || new TiktokLive(tiktokId);
    tiktokRoom.updateChannelIds();
    tiktokRoom.startConnect();
    activeTiktokRoom[tiktokId] = tiktokRoom;
  }
});



io.of("/").adapter.on("join-room", (room, id) => {
  const prefix = 'tiktok-';
  if (room.includes(prefix)) {
    const tiktokId = room.replace(prefix, '');

    const tiktokRoom = activeTiktokRoom[tiktokId];
    tiktokRoom.updateChannelIds();
    tiktokRoom.startConnect();
  }
});



io.of("/").adapter.on("leave-room", (room, id) => {
  const prefix = 'tiktok-';
  if (room.includes(prefix)) {
    const tiktokId = room.replace(prefix, '');

    const tiktokRoom = activeTiktokRoom[tiktokId];

    if (!tiktokRoom) return;

    tiktokRoom.updateChannelIds();
  }
});



io.of("/").adapter.on("delete-room", (room) => {
  const prefix = 'tiktok-';
  if (room.includes(prefix)) {
    const tiktokId = room.replace(prefix, '');

    const tiktokRoom = activeTiktokRoom[tiktokId];
    tiktokRoom.stopConnect();
  }
});



io.of('/widget').on('connection', async socket => {

  const cid = socket.handshake.query.cid;

  if (!cid) return socket.disconnect();

  console.log('🏞 A widget connected - uid:', cid);
  socket.join(cid);

  try {
    const settings = await getChannelSettings(cid);
    socket.emit('updateSetting', settings);
  } catch (err) { }

  socket.on('getSettings', () => {
    socket.emit('updateSetting', settings);
  })

  socket.on("disconnect", (reason) => {
    console.log('Web socket disconnected - id:', cid);
    console.log(reason);
  });
});





// app.get('/api/tts/word/:word', async (req, res) => {
//   const word = req.params.word;
//   const subscriptionKey = '5046803c86b0454c9b854a51d6234c43';
//   const serviceRegion = 'southeastasia';

//   const speechConfig = SpeechConfig.fromSubscription(
//     subscriptionKey,
//     serviceRegion
//   );

//   speechConfig.speechSynthesisOutputFormat =
//     SpeechSynthesisOutputFormat.Ogg24Khz16BitMonoOpus;

//   const synthesizer = new SpeechSynthesizer(speechConfig);

//   synthesizer.speakSsmlAsync(
//     `
//     <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
//        xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="vi-VN"> 
//     <voice name="vi-VN-HoaiMyNeural">
//             ${word}
//     </voice>
//     </speak>
//     `,
//     (resp) => {
//       const audio = resp.audioData;
//       synthesizer.close();
//       const buffer = Buffer.from(audio);
//       res.set('Content-Type', 'audio/ogg; codecs=opus; rate=24000');
//       res.send(buffer);
//     }
//   );
// });



// function speechBase64(text, lang, slow, callback) {
//   getAudioBase64(text, {
//     lang: lang,
//     slow: slow,
//     host: 'https://translate.google.com',
//     timeout: 10000,
//     splitPunct: ',.?',
//   })
//     .then(base64sound => {
//       return callback(base64sound)
//     })
//     .catch(error => {
//       return callback(false)
//     })
// }


// PWAs want HTTPS!
// function checkHttps(request, response, next) {
//   // Check the protocol — if http, redirect to https.
//   if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
//     return next(); 
//   } else {
//     response.redirect("https://" + request.hostname + request.url); 
//   } 
// }
// app.all("*", checkHttps); 

// class Channel {
//   constructor(cid) {
//     const start = async () => {
//       this.cid = cid;
//       this.socket = socket;
//       this.widgetSocket = io.of('/widget').to(this.cid)
//       this.settings = await store.getChannelSettings(this.cid);
//       this.tiktokRoom = null;
//       this.tiktokID = null;

//       this.offSettingsSnapshot = () => { };
//       this.settings && this.onSettingSnapshot();
//     }
//     start();
//   }
//   onSettingSnapshot() {
//     const doc = database.collection('channelSettings').doc(this.cid);
//     this.offSettingsSnapshot = doc.onSnapshot(async docSnapshot => {
//       // console.log(`📝 Received doc snapshot`);
//       const snapShotData = docSnapshot.data();
//       const newTtId = snapShotData.basic_tiktokid;

//       if (this.tiktokRoom) {
//         if (newTtId !== this.tiktokRoom.id) {
//           this.tiktokRoom.removeChannel(this.cid);
//           this.tiktokRoom = activeTiktokRoom[newTtId] || new TiktokLive(newTtId);
//           this.tiktokRoom.addChannel(this.cid);
//         }
//       } else {
//         const existRoom = activeTiktokRoom[newTtId];
//         if (existRoom) {
//           existRoom.addChannel(this.cid);
//           this.tiktokRoom = existRoom;
//         } else {
//           const newRoom = new TiktokLive(newTtId);
//           newRoom.addChannel(this.cid);
//           this.tiktokRoom = newRoom;
//         }
//       }

//       this.settings = snapShotData;
//       this.widgetSocket.emit('updateSetting', this.settings);

//     }, err => {
//       console.log(`Encountered error: ${err}`);
//     });
//   }
// }