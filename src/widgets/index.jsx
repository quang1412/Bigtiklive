import React, { useEffect, useState, lazy, Suspense } from "react"
import StartScreen from "../components/loadingScreen"
import io from "socket.io-client"
import { defaultSettings } from "../modules/fakeData"
import "../App.css"

const Alertbox = lazy(() => import("./Alertbox"))
const LikeRanking = lazy(() => import("./LikeRanking"))
const WheelOfFortune = lazy(() => import("./WheelOfFortune"))

export default function Widget() {
  const pathname = window.location.pathname
  const [loadingTitle, setLoadingTitle] = useState("Đang chuẩn bị")
  const [loadingText, setLoadingText] = useState("Kết nối máy chủ")
  const [settings, updateSettings] = useState(defaultSettings())
  const [event, setEvent] = useState({})

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
        setEvent(event)
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
    return () => getStart()
  }, [])

  return (
    <>
      <div className="App">
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
