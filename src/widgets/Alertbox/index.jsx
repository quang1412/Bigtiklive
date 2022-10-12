import React, { useEffect, useState, useRef, memo } from "react"
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit"
import style from "./style.module.css"
import "./textAnimation.css"
import { defaultSettings } from "../../modules/fakeData"

const defaultTemplate = {
  gift: "{nickname} tặng {giftcount} {giftname}",
  follow: "{nickname} đã theo dõi",
  share: "{nickname} đã chia sẻ live",
  like: "{nickname} đã thả {likecount} tim",
}

const demoEvent = {
  giftId: 5655,
  repeatCount: 12,
  repeatEnd: true,
  groupId: "1664097626079",
  monitorExtra: {
    anchor_id: 6510015174786613000,
    from_idc: "useast2a",
    from_user_id: 6586645488631677000,
    gift_id: 5655,
    gift_type: 1,
    log_id: "20220925092029010099072118466E80CE",
    msg_id: 7147241652322487000,
    repeat_count: 12,
    repeat_end: 1,
    room_id: 7147214089667513000,
    send_gift_profit_core_start_ms: 0,
    send_gift_send_message_success_ms: 1664097634102,
    to_user_id: 6510015174786613000,
  },
  userId: "6586645488631676930",
  secUid:
    "MS4wLjABAAAA2hB_uKH13F8_vFoXAA3rTok9y2RkZdtRcdKKPonX04p7TvaC1qpzHA4SMIdYGORA",
  uniqueId: "thanhhieu20303",
  nickname: "Hëñrÿ Võ",
  profilePictureUrl:
    "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~c5_100x100.webp?x-expires=1664269200&x-signature=3OqKqi19sSzUXh9%2BQT7S4Db8OlE%3D",
  followRole: 0,
  userBadges: [],
  userDetails: {
    createTime: "0",
    bioDescription: "",
    profilePictureUrls: [
      "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~tplv-tiktok-shrink:72:72.webp?x-expires=1664269200&x-signature=NRnpWyPkKMvpSkQiJ3L%2FDzuIT%2Fc%3D",
      "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~c5_100x100.webp?x-expires=1664269200&x-signature=3OqKqi19sSzUXh9%2BQT7S4Db8OlE%3D",
      "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c4e57c814caf870b6f69220523441c04~c5_100x100.jpeg?x-expires=1664269200&x-signature=8mBGmMh2ut05JNy2adhnQLyRdgo%3D",
    ],
  },
  followInfo: {
    followingCount: 210,
    followerCount: 15,
    followStatus: 0,
    pushStatus: 0,
  },
  isModerator: false,
  isNewGifter: false,
  isSubscriber: false,
  topGifterRank: null,
  msgId: "7147241652322487067",
  createTime: "1664097634101",
  displayType: "webcast_aweme_gift_send_message",
  label: "{0:user} sent {1:gift} {2:string}",
  gift: { gift_id: 5655, repeat_count: 12, repeat_end: 1, gift_type: 1 },
  describe: "Sent Rose",
  giftType: 1,
  diamondCount: 1,
  giftName: "Rose",
  giftPictureUrl:
    "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.png",
  timestamp: 1664097634102,
  receiverUserId: "6510015174786613249",
  extendedGiftInfo: {
    action_type: 0,
    app_id: 0,
    business_text: "",
    can_put_in_gift_box: false,
    color_infos: [],
    combo: true,
    deprecated10: false,
    deprecated11: false,
    deprecated12: 0,
    deprecated14: "",
    deprecated2: false,
    deprecated3: false,
    deprecated4: 0,
    deprecated5: [],
    deprecated6: 0,
    deprecated7: 0,
    deprecated8: 0,
    deprecated9: false,
    describe: "sent Rose",
    diamond_count: 1,
    duration: 1000,
    event_name: "livesdk_gift_click",
    for_custom: false,
    for_linkmic: true,
    gift_rank_recommend_info: "",
    gift_scene: 1,
    gold_effect: "",
    gray_scheme_url: "",
    guide_url: "",
    icon: {
      avg_color: "#405237",
      height: 0,
      image_type: 0,
      is_animated: false,
      open_web_url: "",
      uri: "webcast-va/eba3a9bb85c33e017f3648eaf88d7189",
      url_list: [
        "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
        "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
      ],
      width: 0,
    },
    id: 5655,
    image: {
      avg_color: "#FADCDC",
      height: 0,
      image_type: 0,
      is_animated: false,
      open_web_url: "",
      uri: "webcast-va/eba3a9bb85c33e017f3648eaf88d7189",
      url_list: [
        "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
        "https://p19-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
      ],
      width: 0,
    },
    is_box_gift: false,
    is_broadcast_gift: false,
    is_displayed_on_panel: true,
    is_effect_befview: false,
    is_gray: false,
    is_random_gift: false,
    item_type: 1,
    lock_info: { lock: false, lock_type: 0 },
    manual: "",
    name: "Rose",
    notify: false,
    primary_effect_id: 0,
    region: "",
    scheme_url: "",
    special_effects: {},
    tracker_params: {},
    trigger_words: [],
    type: 1,
  },
  name: "gift",
  id: "TXhk0HTyDP",
}

const AlertContent = ({ event, settings, isMute }) => {
  const eventName = event.name
  const [isHidden, setHidden] = useState(false)
  const [animation, setAnimation] = useState(
    window.alertBoxisShowing
      ? "fadeIn"
      : settings[`widget_alertbox_${eventName}_alertanimationin`] || "rollIn"
  )

  const getSetting = (n) => settings[`widget_alertbox_${eventName}_${n}`]

  const layout = getSetting("layout") || "banner"
  const duration = getSetting("alertduration") || 3
  const image = getSetting("imageurl")
  // const duration = 3

  const onLoad = (e) => {
    return !isMute
      ? window.playSound(
          getSetting("soundurl", eventName),
          getSetting("soundvolume", eventName)
        )
      : false
  }
  const animationEnd = (e) => {
    setAnimation("")
    setTimeout(() => {
      setAnimation(getSetting("alertanimationout") || "rollOut")
      e.target.onanimationend = () => {
        setHidden(true)
        window.alertBoxisShowing = false
      }
    }, duration * 1000)
  }

  useEffect(() => {
    return () => (window.alertBoxisShowing = true)
  }, [])

  return (
    <div
      className={`${style.alertboxLayer} ${style[layout]} ${
        isHidden && "d-none"
      }`}
    >
      <div
        className={`${style.widget} animate__animated animate__${animation}`}
        onAnimationEnd={animationEnd}
        onLoad={onLoad}
      >
        <div className={style.alertBox}>
          <div className={style.wrap}>
            <div className={style.alertImageWrap}>
              <div
                className={style.alertImage}
                style={{
                  backgroundImage: `url("${image}")`,
                }}
              >
                <img
                  style={{ height: "1px", opacity: "0", width: "1px" }}
                  src={image}
                  alt="animate gif"
                />
              </div>
            </div>
            <div className={style.alertTextWrap}>
              <div className={style.alertText}>
                <div
                  style={{
                    fontSize: getSetting("fontsize") + "px",
                    color: getSetting("textcolor"),
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
                    fontWeight: getSetting("fontweight"),
                    textShadow:
                      "0px 0px 1px #000, 0px 0px 2px #000, 0px 0px 3px #000, 0px 0px 4px #000, 0px 0px 5px #000",
                  }}
                >
                  <TextAnimation
                    event={event}
                    template={
                      getSetting("messagetemplate") ||
                      defaultTemplate[eventName]
                    }
                    color={getSetting("texthighlightcolor")}
                    animation={getSetting("textanimation")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TextAnimation = ({ event, template, color, animation }) => {
  const {
    id,
    uniqueId,
    nickname,
    giftName,
    repeatCount,
    likeCount,
    diamondCount,
  } = event

  if (!id) return

  const animationLetter = (string) => {
    try {
      string = string.toString()
    } catch {
      return
    }

    return string.split(" ").map((text, tIndex) => {
      let arr = Array.from(text)
      return (
        <span key={tIndex} className="text-nowrap">
          {" "}
          {arr.map((letter, lIndex) => (
            <span
              style={{ color: color }}
              key={lIndex}
              className={"animated-letter " + animation}
            >
              {letter}
            </span>
          ))}{" "}
        </span>
      )
    })
  }

  return template
    .split(" ")
    .map((text, index) => (
      <span key={index}>
        {text === "{username}"
          ? animationLetter(uniqueId)
          : text === "{nickname}"
          ? animationLetter(nickname || uniqueId)
          : text === "{giftname}"
          ? animationLetter(giftName)
          : text === "{giftcount}"
          ? animationLetter(repeatCount)
          : text === "{likecount}"
          ? animationLetter(likeCount)
          : text === "{amount}"
          ? animationLetter(repeatCount * diamondCount)
          : text}{" "}
      </span>
    ))
}

const Alertbox = ({ settings, event, isMute }) => {
  const [isDelay, setIsDelay] = useState(false)
  const [eventQueue, setEventQueue] = useState([])
  const [mainEvent, setMainEvent] = useState(false)
  const delayTimeOut = useRef(null)

  function removeEventType(type) {
    setEventQueue((oldList) =>
      oldList.filter(function (e) {
        return e.name !== type
      })
    )
  }

  const getSetting = (shortName, eventName = "general") => {
    return settings[`widget_alertbox_${eventName}_${shortName}`]
  }

  useEffect(() => {
    if (!event.id) return
    switch (event.name) {
      case "like":
        if (!getSetting("active", "like")) break
        setEventQueue((current) => [...current, event])
        break
      case "share":
        if (!getSetting("active", "share")) break
        setEventQueue((current) => [...current, event])
        break
      case "gift":
        const { giftType, repeatEnd } = event
        if (giftType === 1 && !repeatEnd) break
        if (!getSetting("active", "gift")) break
        setEventQueue((current) => [...current, event])
        break
      case "follow":
        if (!getSetting("active", "follow")) break
        setEventQueue((current) => [...current, event])
        break
      default:
        break
    }
  }, [event])

  useEffect(() => {
    const handle = () => {
      if (eventQueue.length && !isDelay) {
        const events = [...eventQueue]
        const event = events.shift()
        // const event = events.pop();

        if (!event) return

        setIsDelay(true)

        setEventQueue(events)
        setMainEvent(event)

        if (!getSetting("active", event.name)) {
          removeEventType(event.name)
          setIsDelay(false)
        }

        const delay = getSetting("alertparries")
          ? getSetting("parryalertdelay")
          : parseInt(
              getSetting("alertdelay") + getSetting("alertduration", event.name)
            ) + 0

        // window.clearTimeout(delayTimeOut.current)
        delayTimeOut.current = setTimeout(() => setIsDelay(false), delay * 1000)
      }
    }
    handle()
    // return handle
  }, [eventQueue, isDelay])

  useEffect(() => {
    const interval = setInterval(() => {}, 1000)
    return clearInterval(interval)
  }, [])

  useEffect(() => {
    const update = function () {}
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [settings])

  return (
    <div className="Alertbox">
      <AlertContent
        key={`${mainEvent?.uniqueId}_${mainEvent?.name}_${mainEvent?.createTime}`}
        event={mainEvent || demoEvent}
        settings={settings || defaultSettings()}
        isMute={isMute}
      />
      {/* <MDBBtn
        color="white"
        className={`rounded-circle p-0 position-absolute end-0 bottom-0 m-3 ${
          canPlaySound && "d-none"
        }`}
        style={{ width: "30px", height: "30px" }}
        onClick={(e) => setCanPlaySound(true)}
      >
        <MDBIcon fas icon="volume-up" />
      </MDBBtn> */}
    </div>
  )
}
export default memo(Alertbox)
