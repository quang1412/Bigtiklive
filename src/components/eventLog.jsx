import React, { useState, useEffect } from "react"

const A = ({ event }) => {
  const limit = 10
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (event.name === "gift" && event.giftType === 1 && !event.repeatEnd)
      return
    setEvents((current) => [...current.slice(-limit), event])
  }, [event])
  return (
    <div
      className="text-muted  position-fixed top-0 end-0 d-none d-lg-block"
      style={{
        width: "200px",
        fontSize: "12px",
        marginTop: "100px",
        marginRight: "50px",
      }}
    >
      <div className="text-center mb-2">====== LOG ======</div>
      <div className="d-flex flex-column-reverse">
        {events.map((event, index) => {
          var text
          switch (event.name) {
            case "chat":
              text = `💬 ${event.uniqueId} say: ${event.comment}`
              break
            case "gift":
              text = `🎁 ${event.uniqueId} has sent gift ${event.giftName} x${event.repeatCount}`
              break
            case "share":
              text = `🚀 ${event.uniqueId} shared`
              break
            case "follow":
              text = `📌 ${event.uniqueId} followed`
              break
            case "like":
              text = `👍 ${event.uniqueId} send ${event.likeCount} like`
              break
            default:
              break
          }
          return (
            <p className="mb-0" key={index}>
              {text}
            </p>
          )
        })}
      </div>
    </div>
  )
}
export default A
