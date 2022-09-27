import React, { memo } from 'react';
 
function GetStarted(props) {

  return (
    <div className="mb-3">
      <h4 className='text-info'>Giới thiệu</h4>
      <h5>
        Chúc bạn livestream vui vẻ, và nhớ giữ trang này luôn mở trong khi live nhé<br />
        <small>(Bạn vẫn có thể chuyển tab, hoặc thu nhỏ cửa sổ trình duyệt)</small>
      </h5>
    </div>
  )
}
export default memo(GetStarted);