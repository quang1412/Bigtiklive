import React, { useEffect, useState, memo } from 'react';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import style from './style.module.css';
import './textAnimation.css';

const defaultTemplate = {
  gift: '{nickname} tặng {giftcount} {giftname}',
  follow: '{nickname} đã theo dõi',
  share: '{nickname} đã chia sẻ live',
  like: '{nickname} đã thả {likecount} tim'
}

const DemoAlert = () => {
  const demoEvent = { "giftId": 5655, "repeatCount": 12, "repeatEnd": true, "groupId": "1664097626079", "monitorExtra": { "anchor_id": 6510015174786613000, "from_idc": "useast2a", "from_user_id": 6586645488631677000, "gift_id": 5655, "gift_type": 1, "log_id": "20220925092029010099072118466E80CE", "msg_id": 7147241652322487000, "repeat_count": 12, "repeat_end": 1, "room_id": 7147214089667513000, "send_gift_profit_core_start_ms": 0, "send_gift_send_message_success_ms": 1664097634102, "to_user_id": 6510015174786613000 }, "userId": "6586645488631676930", "secUid": "MS4wLjABAAAA2hB_uKH13F8_vFoXAA3rTok9y2RkZdtRcdKKPonX04p7TvaC1qpzHA4SMIdYGORA", "uniqueId": "thanhhieu20303", "nickname": "Hëñrÿ Võ", "profilePictureUrl": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~c5_100x100.webp?x-expires=1664269200&x-signature=3OqKqi19sSzUXh9%2BQT7S4Db8OlE%3D", "followRole": 0, "userBadges": [], "userDetails": { "createTime": "0", "bioDescription": "", "profilePictureUrls": ["https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~tplv-tiktok-shrink:72:72.webp?x-expires=1664269200&x-signature=NRnpWyPkKMvpSkQiJ3L%2FDzuIT%2Fc%3D", "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~c5_100x100.webp?x-expires=1664269200&x-signature=3OqKqi19sSzUXh9%2BQT7S4Db8OlE%3D", "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~c5_100x100.jpeg?x-expires=1664269200&x-signature=8mBGmMh2ut05JNy2adhnQLyRdgo%3D"] }, "followInfo": { "followingCount": 210, "followerCount": 15, "followStatus": 0, "pushStatus": 0 }, "isModerator": false, "isNewGifter": false, "isSubscriber": false, "topGifterRank": null, "msgId": "7147241652322487067", "createTime": "1664097634101", "displayType": "webcast_aweme_gift_send_message", "label": "{0:user} sent {1:gift} {2:string}", "gift": { "gift_id": 5655, "repeat_count": 12, "repeat_end": 1, "gift_type": 1 }, "describe": "Sent Rose", "giftType": 1, "diamondCount": 1, "giftName": "Rose", "giftPictureUrl": "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png", "timestamp": 1664097634102, "receiverUserId": "6510015174786613249", "extendedGiftInfo": { "action_type": 0, "app_id": 0, "business_text": "", "can_put_in_gift_box": false, "color_infos": [], "combo": true, "deprecated10": false, "deprecated11": false, "deprecated12": 0, "deprecated14": "", "deprecated2": false, "deprecated3": false, "deprecated4": 0, "deprecated5": [], "deprecated6": 0, "deprecated7": 0, "deprecated8": 0, "deprecated9": false, "describe": "sent Rose", "diamond_count": 1, "duration": 1000, "event_name": "livesdk_gift_click", "for_custom": false, "for_linkmic": true, "gift_rank_recommend_info": "", "gift_scene": 1, "gold_effect": "", "gray_scheme_url": "", "guide_url": "", "icon": { "avg_color": "#405237", "height": 0, "image_type": 0, "is_animated": false, "open_web_url": "", "uri": "webcast-va/eba3a9bb85c33e017f3648eaf88d7189", "url_list": ["https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp", "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp"], "width": 0 }, "id": 5655, "image": { "avg_color": "#FADCDC", "height": 0, "image_type": 0, "is_animated": false, "open_web_url": "", "uri": "webcast-va/eba3a9bb85c33e017f3648eaf88d7189", "url_list": ["https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp", "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp"], "width": 0 }, "is_box_gift": false, "is_broadcast_gift": false, "is_displayed_on_panel": true, "is_effect_befview": false, "is_gray": false, "is_random_gift": false, "item_type": 1, "lock_info": { "lock": false, "lock_type": 0 }, "manual": "", "name": "Rose", "notify": false, "primary_effect_id": 0, "region": "", "scheme_url": "", "special_effects": {}, "tracker_params": {}, "trigger_words": [], "type": 1 }, "name": "gift", "id": "TXhk0HTyDP" }
  const demoSettings = {
    widget_alertbox_gift_textanimation: 'wave',
    widget_alertbox_gift_texthighlightcolor: '#32c3a6',
  }
  return (
    <div className={`${style.alertboxLayer} ${style.banner}`}>
      <div className={`${style.widget} animate__animated animate__fadeIn`}>
        <div className={style.alertBox}>
          <div className={style.wrap}>
            <div className={style.alertImageWrap}>
              <div className={style.alertImage} style={{ backgroundImage: `url("https://isetup.vn/tiktok/assets/gif/Explosion.gif")` }}>
                <img style={{ height: "1px", opacity: "0", width: "1px" }} src="https://isetup.vn/tiktok/assets/gif/jumpy-t-rex.gif" alt="animate gif" />
              </div>
            </div>
            <div className={style.alertTextWrap}>
              <div className={style.alertText}>
                <div style={{
                  fontSize: "40px",
                  color: "rgb(255, 255, 255)",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
                  fontWeight: "800",
                  textShadow: "0px 0px 1px #000, 0px 0px 2px #000, 0px 0px 3px #000, 0px 0px 4px #000, 0px 0px 5px #000"
                }}>
                  <TextAnimation event={demoEvent} settings={demoSettings} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TextAnimation = props => {
  const { event, settings } = props;
  if (!event.id) return true;

  const animateName = settings[`widget_alertbox_${event.name}_textanimation`]
  const template = settings[`widget_alertbox_${event.name}_messagetemplate`] || defaultTemplate[event.name]
  const color = settings[`widget_alertbox_${event.name}_texthighlightcolor`]

  const animateText = string => {
    try { string = string.toString() }
    catch { return true }

    return string.split(" ").map((text, index2) => {
      let arr = Array.from(text);
      return (<span key={index2} className="text-nowrap"> {
        arr.map((letter, index1) => (
          <span style={{ "color": color }} key={index1} className={"animated-letter " + animateName}>
            {letter}
          </span>)
        )
      } </span>);
    })
  }

  return template.split(" ").map((text, index) => (<span key={index}>{
    text === "{username}" ? animateText(event.uniqueId) :
      text === "{nickname}" ? animateText(event.nickname || event.uniqueId) :
        text === "{giftname}" ? animateText(event.giftName) :
          text === "{giftcount}" ? animateText(event.repeatCount) :
            text === "{likecount}" ? animateText(event.likeCount) :
              text === "{amount}" ? animateText(event.repeatCount * event.diamondCount) :
                text} </span>));
}

const Alertbox = (props) => {
  const { settings, event, isMute } = props;
  const [_isShowing, setIsShowing] = useState(false)
  const [_isDelay, setIsDelay] = useState(false);
  const [_isOutro, setIsOutro] = useState(false);
  const [_canPlaySound, setCanPlaySound] = useState(false);
  const [eventQueue, setEventQueue] = useState([]);
  const [mainEvent, setMainEvent] = useState({});
  const [animate, setAnimate] = useState("");

  function removeEventType(type) {
    setEventQueue(oldList => oldList.filter(function (e) {
      return e.name !== type;
    }));
  }

  function handleAnimationEnd(e) {
    setAnimate("");
    setIsShowing(!_isOutro);
  }

  function playSound(url = "https://isetup.vn/tiktok/assets/sound/new-message-4.ogg", vol = 50) {
    if (!_canPlaySound || isMute) return;
    const audio = new Audio(url);
    audio.pause();
    audio.currentTime = 0;
    audio.src = url;
    audio.volume = vol / 100;
    audio.play();
  }

  function getSetting(shortName, eventName = 'general') {
    return settings[`widget_alertbox_${eventName}_${shortName}`]
  }

  useEffect(() => {
    return () => {
      const audio = new Audio("https://isetup.vn/tiktok/assets/sound/new-message-4.ogg");
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => setCanPlaySound(true))
          .catch(_ => setCanPlaySound(false))
      }
    }
  }, [])

  useEffect(() => {
    if (!event.id) return;
    switch (event.name) {
      case 'like':
        if (!getSetting('active', 'like')) break;
        setEventQueue(current => [...current, event]);
        break;
      case 'share':
        if (!getSetting('active', 'share')) break;
        setEventQueue(current => [...current, event]);
        break;
      case 'gift':
        const { giftType, repeatEnd } = event;
        if (giftType === 1 && !repeatEnd) break;
        if (!getSetting('active', 'gift')) break;
        setEventQueue(current => [...current, event]);
        break;
      case 'follow':
        if (!getSetting('active', 'follow')) break;
        setEventQueue(current => [...current, event]);
        break;
      default:
        break;
    }
  }, [event])

  useEffect(function () {

    if (_isDelay) return;

    if (!eventQueue.length) return;

    if (_isShowing && !getSetting('alertparries')) return;;

    const events = [...eventQueue];
    const event = events.shift();
    // const event = events.pop();
    var delay = getSetting('alertdelay')

    setEventQueue(events);
    setIsShowing(true);
    setMainEvent(event);

    if (!getSetting('active', event.name)) {
      removeEventType(event.name);
      setIsDelay(false);
    }

    delay += getSetting('alertduration', event.name);

    delay = getSetting('alertparries') ? getSetting('parryalertdelay') : delay;

    setIsOutro(false);
    const introAnimate = (!_isShowing) ? getSetting('alertanimationin', event.name) :
      getSetting('alertparries') ? "fadeIn" : getSetting('alertanimationin', event.name)

    setAnimate(`animate__animated animate__${introAnimate}`);

    playSound(getSetting('soundurl', event.name), getSetting('soundvolume', event.name));

    setTimeout(() => {
      if (document.getElementById(event.id)) {
        setIsOutro(true);
        const outroAnimate = (events.length === 0) ? getSetting('alertanimationout', event.name) :
          getSetting('alertparries') ? "fadeOut" : getSetting('alertanimationout', event.name)

        setAnimate(`animate__animated animate__${outroAnimate}`);
      }
    }, getSetting('alertduration', event.name) * 1000);

    setIsDelay(true);
    setTimeout(() => {
      setIsDelay(false);
    }, delay * 1000);
  }, [eventQueue, _isDelay, _isShowing])

  return (
    <div className="Alertbox">
      {!window.cid && <DemoAlert/>}
      <div className={`${style.alertboxLayer} ${style[getSetting('layout', mainEvent.name || 'like')]}`}>
        {(_isShowing && mainEvent.id) &&
          <div className={`${style.widget} ${animate}`} onAnimationEnd={handleAnimationEnd}>
            <div className={style.alertBox}>
              <div className={style.wrap}>
                <div className={style.alertImageWrap}>
                  <div id={mainEvent.id} className="d-none" ></div>
                  <div className={style.alertImage} style={{ backgroundImage: `url(${getSetting('imageurl', mainEvent.name)})` }}>
                    <img style={{ height: "1px", opacity: "0", width: "1px" }} src={getSetting('imageurl', mainEvent.name)} alt="animate gif" />
                  </div>
                </div>
                <div className={style.alertTextWrap}>
                  <div className={style.alertText}>
                    <div style={{
                      fontSize: `${getSetting('fontsize', mainEvent.name)}px`,
                      color: `${getSetting('textcolor', mainEvent.name) || "rgb(255, 255, 255)"}`,
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
                      fontWeight: `${getSetting('fontweight', mainEvent.name)}`,
                      textShadow: "0px 0px 1px #000, 0px 0px 2px #000, 0px 0px 3px #000, 0px 0px 4px #000, 0px 0px 5px #000"
                    }}>
                      <TextAnimation event={mainEvent} settings={settings} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {!_canPlaySound &&
          <MDBBtn floating color='light' tag='button'
            className='position-absolute top-0 end-0 m-2' onClick={() => { setCanPlaySound(true) }}>
            <MDBIcon fas icon="volume-mute" className='fs-6' />
          </MDBBtn>
        }
      </div>
    </div>
  );
}
export default memo(Alertbox);