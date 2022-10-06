import React, { memo } from "react"
import RoomInfoCard from "../components/roomInfoCard"

function GetStarted({ roomList }) {
  return (
    <>
      <div className="mb-5">
        <h4 className="text-info">Giới thiệu</h4>
        <p className="mb-0">
          Chúc bạn livestream vui vẻ, và nhớ giữ trang này luôn mở trong khi
          live nhé
        </p>
        <p className="mb-0">
          (Bạn vẫn có thể chuyển tab, hoặc thu nhỏ cửa sổ trình duyệt)
        </p>
      </div>

      <div className="mb-3">
        {/* <h5 className="text-info">Active Rooms</h5> */}
        <p className="">
          các kênh livestream đang kết nối tới
          <b className="text-info"> Bigtik</b>, bạn có thể ghé thăm các kênh này
          để tham khảo cách họ setup, sử dụng công cụ, và sáng tạo theo cách
          riêng của mình.
        </p>
        <div className="d-flex mb-3">
          {roomList.map(
            (roomInfo, index) =>
              roomInfo.isConnected && (
                <RoomInfoCard info={roomInfo} className="me-2" key={index} />
              )
          )}
        </div>
        <div className="d-flex mb-3">
          {roomList.map(
            (roomInfo, index) =>
              !roomInfo.isConnected && (
                <RoomInfoCard info={roomInfo} className="me-2" key={index} />
              )
          )}
        </div>
      </div>
    </>
  )
}
export default memo(GetStarted)
