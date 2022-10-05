import React, { memo } from "react"

function GetStarted(props) {
  return (
    <div className="mb-3">
      <h4 className="text-info">Giới thiệu</h4>
      <p className="mb-0">
        Chúc bạn livestream vui vẻ, và nhớ giữ trang này luôn mở trong khi live
        nhé
      </p>
      <p className="mb-0">
        (Bạn vẫn có thể chuyển tab, hoặc thu nhỏ cửa sổ trình duyệt)
      </p>
    </div>
  )
}
export default memo(GetStarted)
