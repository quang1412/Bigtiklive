import React, { useEffect, useState, useRef, lazy, Suspense } from "react"
import StartScreen from "../components/loadingScreen"
import io from "socket.io-client"
import { defaultSettings } from "../modules/fakeData"
import "./style.css"

const Alertbox = lazy(() => import("./Alertbox"))
const LikeRanking = lazy(() => import("./LikeRanking"))
const WheelOfFortune = lazy(() => import("./WheelOfFortune"))

export default function Widget() {
  const pathname = window.location.pathname
  const [loadingTitle, setLoadingTitle] = useState("Đang chuẩn bị")
  const [loadingText, setLoadingText] = useState("Kết nối máy chủ")
  const [settings, updateSettings] = useState(defaultSettings())
  const [event, setEvent] = useState({})

  const likeStorage = useRef({})
  const likeDelay = (event) => {
    const { uniqueId, likeCount } = event
    clearTimeout(likeStorage.current[uniqueId]?.timeOut)
    const totalLike =
      (likeStorage.current[uniqueId]?.likeCount || 0) + likeCount
    likeStorage.current[uniqueId] = {
      likeCount: totalLike,
      timeOut: setTimeout(() => {
        setEvent({ ...event, likeCount: totalLike })
        console.log(`👍👍 ${uniqueId} send total ${totalLike} like`)
        delete likeStorage.current[uniqueId]
      }, 5000),
    }
  }

  function createSocketConnect(cid) {
    return new Promise((resolve, reject) => {
      const socket = io(`/widget?cid=${cid}`, {
        transports: ["websocket"],
        path: "/socket",
      })
      const onConnected = () => {
        socket.off("connect", onConnected)
        resolve(socket)
      }
      socket.on("connect", onConnected)

      socket.on("connect_error", () => {
        socket.off("connect", onConnected)
        reject("Kết nối thất bại")
      })
      // TIKTOK EVENT
      socket.on("tiktok-chat", (event) => {
        setEvent(event)
      })
      socket.on("tiktok-like", (event) => {
        // setEvent(event)
        likeDelay(event)
      })
      socket.on("tiktok-gift", (event) => {
        setEvent(event)
      })
      socket.on("tiktok-share", (event) => {
        setEvent(event)
      })
      socket.on("tiktok-follow", (event) => {
        setEvent(event)
      })
      // WIDGET CONTROL
      socket.on("widget-control", (action) => {
        setEvent({ name: action })
      })
      // SETTING UPDATE EVENT
      socket.on("updateSetting", (newSetting) => {
        console.log("updateSetting", newSetting)
        updateSettings(newSetting)
      })
    })
  }

  useEffect(() => {
    const getStart = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const cid = urlParams.get("cid")
      window.cid = cid
      try {
        if (!cid) throw new Error("CID không hợp lệ!")
        await window.wait(1)
        createSocketConnect(cid)
          .then(() => {
            setLoadingText(null)
          })
          .catch((e) => {
            throw new Error(e)
          })
      } catch (error) {
        setLoadingTitle("Xảy ra lỗi")
        setLoadingText(`${error}`)
      }
    }
    // clearTimeout(window.startUp)
    // window.startUp = setTimeout(getStart, 1000)
    return () => {
      // clearTimeout(window.startUp)
      getStart()
    }
  }, [])

  return (
    <>
      <div
        className="App"
        style={{ background: "transparent", backgroundColor: "transparent" }}
      >
        {loadingText ? (
          <StartScreen title={loadingTitle} text={loadingText} />
        ) : (
          <>
            {pathname === "/widget/alertbox" && (
              <Suspense fallback={<div>Loading</div>}>
                <Alertbox event={event} settings={settings} />
              </Suspense>
            )}
            {pathname === "/widget/likeranking" && (
              <Suspense fallback={<div>Loading</div>}>
                <LikeRanking event={event} settings={settings} />
              </Suspense>
            )}
            {pathname === "/widget/wheeloffortune" && (
              <Suspense fallback={<div>Loading</div>}>
                <WheelOfFortune event={event} settings={settings} />
              </Suspense>
            )}
          </>
        )}
      </div>
    </>
  )
}
