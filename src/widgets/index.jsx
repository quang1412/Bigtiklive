import React, { useEffect, useState, lazy, Suspense } from "react";
import StartScreen from '../components/loadingScreen';
import io from 'socket.io-client';
import '../App.css';

const Alertbox = lazy(() => import('./Alertbox'));
const LikeRanking = lazy(() => import('./LikeRanking'));
const WheelOfFortune = lazy(() => import('./WheelOfFortune'));

export default function Widget() {
  const pathname = window.location.pathname;
  const [loadingTitle, setLoadingTitle] = useState('Đang chuẩn bị');
  const [loadingText, setLoadingText] = useState('Thiết lập kết nối tới máy chủ');
  const [settings, updateSettings] = useState({});
  const [event, setEvent] = useState({});

  function createSocketConnect(cid) {
    return new Promise((resolve, reject) => {
      const socket = io(`/widget?cid=${cid}`, {
        transports: ['websocket'],
        path: '/socket'
      })
      const onConnected = () => {
        socket.off('connect', onConnected);
        resolve(socket);
      }
      socket.on('connect', onConnected);

      socket.on('connect_error', () => {
        socket.off('connect', onConnected);
        reject('Kết nối thất bại');
      })

      socket.on('tiktok_chat', event => {
        setEvent(event);
      })
      socket.on('tiktok_like', event => {
        setEvent(event);
      })
      socket.on('tiktok_gift', event => {
        setEvent(event);
      })
      socket.on('tiktok_share', event => {
        setEvent(event);
      })
      socket.on('tiktok_follow', event => {
        setEvent(event);
      })
      socket.on('updateSetting', newSetting => {
        console.log('updateSetting', newSetting);
        updateSettings(newSetting);
      });
    })
  }

  useEffect(() => {
    return async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cid = urlParams.get('cid');
      window.cid = cid;
      try {
        if (!cid) throw new Error('CID không hợp lệ!')
        await window.wait(1);
        createSocketConnect(cid)
          .then(() => {
            setLoadingText(null);
          })
          .catch(e => {
            throw new Error(e)
          })
      } catch (error) {
        setLoadingTitle('Xảy ra lỗi');
        setLoadingText(`${error}`)
      }
    };
  }, [])

  return (<>
    <div className="App">
      {loadingText ?
        <StartScreen title={loadingTitle} text={loadingText} />
        : <>
          {pathname === '/widget/alertbox' &&
            <Suspense fallback={<div>Loading</div>}>
              <Alertbox event={event} settings={settings} />
            </Suspense>
          }
          {pathname === '/widget/likeranking' &&
            <Suspense fallback={<div>Loading</div>}>
              <LikeRanking event={event} settings={settings} />
            </Suspense>
          }
          {pathname === '/widget/wheeloffortune' &&
            <Suspense fallback={<div>Loading</div>}>
              <WheelOfFortune event={event} settings={settings} />
            </Suspense>
          }
        </>
      }
    </div>
  </>)
}