import React, { useEffect, useState, memo } from 'react';
import style from "./style.module.css";
import Winwheel from 'winwheel';
import { MDBBtn } from 'mdb-react-ui-kit';
const size = 400;

const demoPlayer = {
  "cao_bay_37": {
    "uniqueId": "cao_bay_37",
    "nickname": "cao_bay_37-",
    "profilePictureUrl": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/b7ab24fd72c1d52d9d108b32d0226bec.webp?x-expires=1664269200&x-signature=vis%2BIdLcWF3zJr%2FA47EwW1eR%2FDY%3D"
  },
  "tuanbo_01": {
    "uniqueId": "tuanbo_01",
    "nickname": "Tuấn Bò",
    "profilePictureUrl": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1670424726689794.webp?x-expires=1664269200&x-signature=0L6agIQAKRVwHTLELPBev6Vd6zc%3D"
  },
  "pown_mai_69": {
    "uniqueId": "pown_mai_69",
    "nickname": "Con quỷ đen vô danh",
    "profilePictureUrl": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9905f7201fbcfd69cafb8ce0f778e636.webp?x-expires=1664269200&x-signature=huOnbrj1nXEfhRi4HoW1nIJChmk%3D"
  },
  "3003831393nam": {
    "uniqueId": "3003831393nam",
    "nickname": "Nam2004♥",
    "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/5748581ae3eecff6249d5a89cd4c2065~c5_100x100.webp?x-expires=1664269200&x-signature=hz5JfOVxIOPr3gPx2ex8snZ6Qos%3D"
  },
  "quangphucshopee": {
    "uniqueId": "quangphucshopee",
    "nickname": "PhucSadRoi",
    "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/439214fa941c4be353b889120a0e69f5~c5_100x100.webp?x-expires=1664269200&x-signature=NeJmP16WXALETssCZlkAcYsnV0o%3D"
  },
  "quanpham14082022": {
    "uniqueId": "quanpham14082022",
    "nickname": "Quânphạm14082022",
    "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_100x100.webp?x-expires=1664269200&x-signature=pRXIh6syPbYNGe4QIBGIg0jB0YE%3D"
  },
  "huudai184": {
    "uniqueId": "huudai184",
    "nickname": "Nguyễn Hữu Đại",
    "profilePictureUrl": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/1c0882310d8257e56db42779d703841d.webp?x-expires=1664269200&x-signature=lEL89272xFn1EzI1xXeWKiq2D0I%3D"
  },
  "facebook_phamcong": {
    "uniqueId": "facebook_phamcong",
    "nickname": "🍁",
    "profilePictureUrl": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7c4d3130cea590c23504e44112f89398.webp?x-expires=1664269200&x-signature=KbKC2lqdPD1j5tlRI4SmDN0lA7Y%3D"
  },
  "trungtutin": {
    "uniqueId": "trungtutin",
    "nickname": "Trung Tự tin",
    "profilePictureUrl": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/1fe3707fa4397ddcaa82c8f06c39fe9d.webp?x-expires=1664269200&x-signature=EXWc1zZtVx%2Btza9q0z3aReZx5XE%3D"
  },
  "utnghia945": {
    "uniqueId": "utnghia945",
    "nickname": "utnghia945",
    "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/7144934450743214107~c5_100x100.webp?x-expires=1664269200&x-signature=rNdK6QvOGwDy6t8yKO%2F9LQ4xcIM%3D"
  }
}

window.wheelSoundTrigger = () => {
  console.log('play sound');
}

const WheelBackground = () => {
  const [index, setindex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setindex(1 - index);
    }, 1000);
    return () => clearInterval(intervalId)
  }, [index])
  return (
    <>
      <div className={style.wheelBg + (index ? ' d-none' : '')} style={{ backgroundImage: `url('/assets/images/wheel-of-fortune-bg-1.webp')` }}></div>
      <div className={style.wheelBg + (!index ? ' d-none' : '')} style={{ backgroundImage: `url('/assets/images/wheel-of-fortune-bg-2.webp')` }}></div>
    </>
  )
}

function Wheel(props) {
  const { players } = props;

  useEffect(() => {
    function createWheel(){
      const keys = Object.keys(players);
      const segments = !keys.length ? [{
        'fillStyle': '#ff0000',
        'textFillStyle': '#ff0000',
        'text': '',
      }] : keys.map((uniqueId, index) => {
        const player = players[uniqueId];
        return ({
          id: player.uniqueId,
          text: player.uniqueId,
          name: player.nickname || '',
          fillStyle: (index % 2 === 0 ? '#ff0000' : '#ffffff'),
          textFillStyle: (index % 2 === 0 ? '#ffffff' : '#ff0000'),
          image: player.profilePictureUrl
        })
      });
      window.wheel = (new Winwheel({
        'numSegments': segments.length,
        'responsive': true,
        'innerRadius': (size / 2) * 0.08,
        'outerRadius': (size / 2) * 0.725,
        'centerY': (size / 2) * 0.9,
        'centerX': (size / 2),
        'textFontSize': (size / 2) * 0.07,
        'lineWidth': 1,
        'segments': segments,
        'animation':
        {
          'type': 'spinToStop',
          'easing': 'Power2.easeOut',
          'duration': 30,
          'spins': 30,
          'callbackSound': 'window.wheelSoundTrigger()',
          'soundTrigger': 'pin',
          'callbackFinished': 'window.wheelFinished()'
        },
        'pins':
        {
          'number': segments.length,
          'responsive': true,
          'outerRadius': 1
        }
      }));
      window.wheel.rotationAngle = 0;
      window.wheel.draw();
    }

    createWheel();

    return () => {
      try { window.wheel.stopAnimation(false); }
      catch (e) { };
      window.wheel = null;
    };
  }, [players])

  return (
    <canvas className={style.wheelCanvas} id='canvas' width={size} height={size} >
      Canvas not supported, use another browser.
    </canvas>
  )
}

const Winner = props => {
  const { info } = props;
  const [isShow, setShow] = useState(true);

  function onAnimationEnd(e) {
    e.target.classList.remove('animate__zoomInDown');
    setTimeout(() => {
      e.target.classList.add('animate__fadeOut');
      e.target.removeEventListener('animationend', onAnimationEnd);
      e.target.addEventListener('animationend', () => { setShow(false) });
    }, 10000);
  }
  return (isShow &&
    <div className='animate__animated animate__zoomInDown h-100 text-center d-flex flex-column justify-content-center align-items-center' style={{ marginTop: "-40px" }} onAnimationEnd={onAnimationEnd}>
      <span className='fw-bolder fs-4 text-info'
        style={{ textShadow: '2px 2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, -2px -2px 0 #ffffff, 2px 0px 0 #ffffff, 0px 2px 0 #ffffff, -2px 0px 0 #ffffff, 0px -2px 0 #ffffff' }}>
        WINNER
      </span>
      <img className='d-block rounded-circle mx-auto border border-5 border-info'
        width="150"
        height="150"
        alt='winner'
        src={info.image}
        onError={window.imageOnError}
      />
      <span className='fw-bolder fs-4 text-info lh-1'
        style={{ textShadow: '2px 2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, -2px -2px 0 #ffffff, 2px 0px 0 #ffffff, 0px 2px 0 #ffffff, -2px 0px 0 #ffffff, 0px -2px 0 #ffffff' }}>
        {info.name}<br />
        <small className='fs-6'>
          {info.text}
        </small>
      </span>
    </div>
  );
}

function WheelofFortune(props) {
  const { settings, event } = props;
  const [players, setPlayers] = useState({})
  const [canJoin, setCanjoin] = useState(true);
  const [winner, setWinner] = useState(false);
  const [isSpining, setIsSpining] = useState(false)

  function startSpin() {
    if (Object.keys(players).length < 2 || isSpining) return;
    window.wheel.rotationAngle = Math.floor(Math.random() * 359) + 1;
    window.wheel.draw();
    window.wheel.startAnimation();
    setCanjoin(false);
    setWinner(false);
    setIsSpining(true);
  }

  function resetWheel() {
    try { window.wheel.stopAnimation(false); }
    catch (e) { };
    window.wheel.rotationAngle = 0;
    window.wheel.draw();
    setPlayers({});
    setIsSpining(false);
    setCanjoin(true);
    setWinner(false);
  }

  useEffect(() => {
    const validFollowrRole = {
      0: settings.widget_wof_unfollower,
      1: settings.widget_wof_follower,
      2: settings.widget_wof_friend,
    }

    return setPlayers(current => {
      if(!window.cid) return demoPlayer;

      const isLimit = Object.keys(current).length >= settings.widget_wof_maxPlayer;
      if (isLimit || !canJoin) return current;

      const { name, uniqueId, nickname, profilePictureUrl, followRole } = event;

      const isJoined = current[uniqueId]

      if (isJoined || name !== settings.widget_wof_joinEvent || !validFollowrRole[followRole]) return current;

      var valid;
      switch (name) {
        case 'chat':
          const { comment } = event;
          valid = comment && comment.includes(settings.widget_wof_commentKey);
          break;
        case 'gift':
          const { giftType, giftName, repeatCount, repeatEnd } = event;
          if (giftType === 1 && !repeatEnd) break;
          valid = (giftName === settings.widget_wof_giftName) && repeatCount < settings.widget_wof_giftCount;
          break;
        default:
      }
      return (valid ? { ...current, [uniqueId]: { uniqueId, nickname, profilePictureUrl } } : current)
    })
  }, [event, canJoin, settings]);

  useEffect(() => {
    window.wheelFinished = () => {
      let winningSegment = window.wheel.getIndicatedSegment();
      setWinner(winningSegment.id ? winningSegment : false);
      setIsSpining(false);
      console.warn(winningSegment.text, 'is winner');
    }
    return () => { window.wheelFinished = null }
  }, [])

  return (
    <div className=''>
      <div className='position-relative mx-auto'
        style={{ width: `${size}px`, height: `${size}px` }}>
        <div className='position-absolute  '>
          <Wheel players={players} />
        </div>
        <div className='position-absolute w-100 h-100'>
          <WheelBackground />
        </div>
        <div className='position-absolute w-100 h-100'>
          {(winner && winner.id) &&
            <Winner info={winner} />
          }
        </div>
        <div className='position-absolute w-100 h-100 text-center'>
          <div className='w-100 position-absolute bottom-0 mb-2'>
            <MDBBtn size="sm" color='light' className='text-danger' onClick={startSpin}>Quay</MDBBtn> <MDBBtn size="sm" color='light' className='text-danger' onClick={resetWheel}>Đặt lại</MDBBtn>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(WheelofFortune);