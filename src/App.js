import React, { useState, useEffect, memo, lazy, Suspense } from 'react';
import './App.css';
import io from 'socket.io-client';
import { getAuth } from "firebase/auth";
import { MDBContainer } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getChannelSettings, saveChannelSetting
} from './modules/fireBase.js';
import StartScreen from './components/loadingScreen';
import Navbar from './components/navBar';

const GetStarted = lazy(() => import('./pages/getStarted'));
const BasicSetting = lazy(() => import('./pages/basicSetting'));
const UserAndPoint = lazy(() => import('./pages/userAndPoint'));
const Widgets = lazy(() => import('./pages/widgets'));

const auth = getAuth();
window.toast = toast;
window.idEditDelay = 3600; //seconds
window.limitTotalUser = 1000;

function onAuthStateChanged() {
  return new Promise(resolve => {
    auth.onAuthStateChanged(resolve);
  })
}

function duplicateCheck(cid) {
  return new Promise((resolve, reject) => {
    fetch(`/api/duplicatecheck?cid=${cid}`)
      .then(res => res.json())
      .then(result => {
        if (result.error) return reject(result.error_msg);
        else return resolve(true)
      })
      .catch(err => {
        return reject(`${err}`);
      })
  })
}

function App() {
  const [_loadingTitle, setLoadingTitle] = useState('Đang chuẩn bị')
  const [_loadingText, setLoadingText] = useState('...');
  const [_pageName, setPageName] = useState(window.location.hash.replace('#', '') || 'home');
  const [_settings, updateSettings] = useState({});
  const [_ttRoomInfo, setTtRoomInfo] = useState({});
  const [_lastEvent, setLastEvent] = useState({});
  const [totalUser, updateTotalUser] = useState(0);
  const [userData, setUserData] = useState(() => {
    var data = {};
    try { data = JSON.parse(window.localStorage.userData) }
    finally {
      return data;
    }
  });

  function socketConnect(cid) {
    return new Promise((resolve, reject) => {

      const socket = io(`/?cid=${cid}`, {
        transports: ['websocket'],
        path: '/socket'
      });

      var connectTimeout = setTimeout(() => {
        socket.disconnect();
        return reject('Kết nối websocket thất bại, vui lòng thử lại sau');
      }, 30000);

      const onConnected = () => {
        socket.off('connect', onConnected);
        clearTimeout(connectTimeout);
        return resolve(socket);
      }

      socket.on('connect', onConnected);

      socket.on('tiktok_connected', roomInfo => {
        setTtRoomInfo(roomInfo);
      })

      socket.on('tiktok_connectFailed', error => {
        console.log(error);
        window.toast.info(`Kết nối tiktok thất bại: ${error}`);
      })

      socket.on('tiktok_disconnected', () => {
        setTtRoomInfo(current => ({ ...current, isConnected: false }))
        console.log('❌ disconnect');
      })

      socket.on('tiktok_roomInfo', roomInfo => {
        setTtRoomInfo(roomInfo);
        console.log('Room Info:', roomInfo);
      })

      socket.on('tiktok_like', event => {
        setLastEvent(event)
        console.log(`👍 ${event.uniqueId} send ${event.likeCount} like`);
      })

      socket.on('tiktok_gift', event => {
        if (event.giftType === 1 && !event.repeatEnd) {
          // console.log(`${event.uniqueId} is sending gift ${event.giftName} x${event.repeatCount}`);
        } else {
          console.log(event)
          console.log(`🎁 ${event.uniqueId} has sent gift ${event.giftName} x${event.repeatCount}`);
        }
        setLastEvent(event)
      })

      socket.on('tiktok_chat', event => {
        console.log(`💬 ${event.uniqueId} say: ${event.comment}`);
        setLastEvent(event)
      })

      socket.on('tiktok_share', event => {
        console.log(`🚀 ${event.uniqueId} shared`);
        setLastEvent(event)
      })

      socket.on('tiktok_follow', event => {
        console.log(`📌 ${event.uniqueId} followed`);
        setLastEvent(event)
      })

      socket.on('tiktok_roomUser', event => {
        setTtRoomInfo(current => ({ ...current, viewerCount: event.viewerCount }))
      })
    });
  }

  function onSettingChange(e) {
    const target = e.target;
    const type = target.type;
    const name = target.name;
    var value = target.value;

    if (!window.authData || name === 'basic_updateidat' || name === 'basic_tiktokid') return;

    switch (type) {
      case 'radio':
        if (('true false').includes(value)) {
          value = value === "true";
        }
        break;
      case 'checkbox':
        value = target.checked
        break;
      case 'number':
      case 'range':
        const min = parseInt(target.min);
        const int = parseInt(value || min);
        const float = parseFloat(value || min);
        value = Math.max(min, int, float);
        target.value = value;
        break;
      case 'text':
        break;
      default:
    }
    console.log(name, value);
    return updateSettings(current => ({ ...current, [name]: value }));
  }

  // lưu userData vào localStorage
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
    updateTotalUser(Object.keys(userData).length);
  }, [userData])

  // Tính điểm thành viên;
  useEffect(() => {
    const cid = window.cid;
    if (!cid) return;

    const { name, userId, uniqueId, userDetails, followRole } = _lastEvent;
    const isFollower = (followRole > 0);
    const now = new Date().getTime();

    function handleReward(amount) {
      setUserData(current => {
        if (current[userId]) {
          const user = current[userId];
          const totalAmount = user.totalAmount + amount;
          const totalRewardAmount = user.totalRewardAmount + amount;
          return ({
            ...current,
            [userId]: {
              ...user,
              'totalAmount': totalAmount,
              'totalRewardAmount': totalRewardAmount,
              'thumbnailUrl': userDetails.profilePictureUrls[0],
              'updateAt': now
            }
          })
        }
        else {
          if (totalUser >= window.limitTotalUser) return;
          return ({
            ...current, [userId]: {
              id: userId,
              username: uniqueId,
              userId: userId.toString(),
              channelId: cid.toString(),
              createAt: now,
              updateAt: now,
              thumbnailUrl: userDetails.profilePictureUrls[0],
              totalAmount: amount,
              totalRewardAmount: amount
            }
          })
        }
      })
    }

    async function handleEvent() {
      switch (name) {
        case 'gift':
          const { giftType, repeatEnd, diamondCount, repeatCount } = _lastEvent;
          if (giftType === 1 && !repeatEnd) break;

          if (_settings.basic_coinperdiamondenabled) {
            const amount = (diamondCount * repeatCount) * _settings.basic_coinperdiamond;
            const bonus = !isFollower ? 0 : parseFloat((_settings.basic_followerbonus / 100 * amount).toFixed(1))
            handleReward(amount + bonus);
          }
          break;
        // case 'like':
        //   const { likeCount } = _lastEvent;
        //   handleReward(likeCount);
        //   break;
        case 'share':
          if (_settings.basic_coinpershareenabled) {
            const amount = _settings.basic_coinpershare;
            const bonus = !isFollower ? 0 : parseFloat((_settings.basic_followerbonus / 100 * amount).toFixed(1))
            handleReward(amount + bonus);
          }
          break;
        default:
          break;
      }
    }
    handleEvent();
    return;
  }, [_lastEvent]);
  // lưu cài đặt
  useEffect(() => {
    // if (_loadingText || _settings === {}) return;
    if (!window.authData) return;
    clearTimeout(window.settingSaveDelay);
    window.settingSaveDelay = setTimeout(() => {
      saveChannelSetting(window.cid, _settings)
        .then()
        .catch(async error => {
          toast.error("Xảy ra lỗi khi lưu cài đặt, vui lòng liên hệ admin");
          console.error(error);
        });
    }, 1500);
    return
  }, [_settings]);
  //Trạng thái lievestream
  useEffect(() => {
    document.title = `Bigtik ${_ttRoomInfo.isConnected ? `[LIVE] ${(_ttRoomInfo.viewerCount || 0)} viewer` : ''}`;
  }, [_ttRoomInfo]);

  // START
  useEffect(() => {
    window.socketio && window.socketio.disconnect();

    return () => {
      setLoadingTitle('Đang chuẩn bị');
      setLoadingText('Xác thực tài khoản');

      onAuthStateChanged()
        .then(async authData => {
          if (authData) {
            window.authData = authData;
            const cid = authData.uid;
            window.cid = cid;

            await window.wait(1);
            setLoadingText('Tải thông tin tài khoản');
            const settings = await getChannelSettings(cid);
            updateSettings(settings);
            console.log('Channel Settings:', settings);

            await window.wait(1);
            setLoadingText('Kết nối websocket');
            window.socketio = await socketConnect(cid);

            await window.wait(1);
            setLoadingText('Kiểm tra trùng lặp admin');
            await duplicateCheck(cid);

            await window.wait(1);
            setLoadingText(null);

          } else {
            await window.wait(1);
            setLoadingText(null);
          }
        }).catch(async err => {
          await window.wait(1.5);
          setLoadingTitle('Xảy ra lỗi');
          setLoadingText(`${err}`);
          window.socketio && window.socketio.disconnect();
        });
    }
  }, []);

  // HASH CHANGE 
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      setPageName(hash)
    }
    window.addEventListener("hashchange", onHashChange, false);
    return () => {
      window.removeEventListener("hashchange", onHashChange, false);
    }
  }, []);

  return (
    <div className="App">
      {_loadingText ?
        <StartScreen title={_loadingTitle} text={_loadingText} />
        :
        <div className="main">
          <Navbar roomInfo={_ttRoomInfo} pageName={_pageName} />
          <br />
          <br />
          <br />
          <MDBContainer className="p-3 text-start">
            {(_pageName === 'home' || _pageName === '') &&
              <Suspense fallback={<div>Loading</div>}>
                <GetStarted />
              </Suspense>
            }
            {_pageName === 'setup' &&
              <Suspense fallback={<div>Loading</div>}>
                <BasicSetting settings={_settings} handleSettingChange={onSettingChange} updateSettings={updateSettings} setUserData={setUserData}/>
              </Suspense>
            }
            {_pageName === 'widgets' &&
              <Suspense fallback={<div>Loading</div>}>
                <Widgets settings={_settings} handleSettingChange={onSettingChange} event={_lastEvent} setEvent={setLastEvent} />
              </Suspense>
            }
            {_pageName === 'user-point' &&
              <Suspense fallback={<div>Loading</div>}>
                <UserAndPoint settings={_settings} users={userData} totalUser={totalUser}/>
              </Suspense>
            }
          </MDBContainer>
          <ToastContainer />
        </div>
      }
    </div>
  );
}

export default memo(App);

// git push command
// git init
// git commit -m 'Init'
// git remote add origin https://github.com/quang1412/bigtiklive.git
// git branch -M main
// git push -u origin main