import React, { useState, useEffect, memo } from "react"
import { MDBRow, MDBCol, MDBCheckbox, MDBRange } from "mdb-react-ui-kit"

function App({ settings }) {
  return (
    <div className="mb-3 ">
      <h4 className="text-info">Đọc comment</h4>
      <p className="mb-0">Mô tả...</p>
      <small>mô tả</small>
      <div className="p-3">
        <MDBRow className="mb-3">
          <MDBCol size="sm" md="4" lg="3">
            <h6 className="text-info my-3">Cài đặt chung</h6>
            <table>
              <tr>
                <td>Kích hoạt</td>
                <td>
                  <MDBCheckbox
                    name="ttspeech_enabled"
                    value=""
                    id="ttspeech_enabled"
                    label=""
                  />
                </td>
              </tr>
              <tr>
                <td>Ngôn ngữ</td>
                <td>
                  <select
                    name="ttspeech_language"
                    defauleValue="vi"
                    className="form-select"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Tốc độ</td>
                <td>
                  <input
                    name="ttspeech_defaultspeed"
                    type="number"
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Cao độ</td>
                <td>
                  <input
                    name="ttspeech_defaultpitch"
                    type="number"
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Giọng ngẫu nhiên</td>
                <td>
                  <MDBCheckbox
                    name="ttspeech_randomvoice"
                    value=""
                    id="ttspeech_randomvoice"
                    label=""
                  />
                </td>
              </tr>
              <tr>
                <td>Âm lượng</td>
                <td>
                  <MDBRange
                    defaultValue={100}
                    id="ttspeech_volume"
                    max="100"
                    min="0"
                    label=""
                  />
                </td>
              </tr>
            </table>
          </MDBCol>
          <MDBCol size="sm" md="4" lg="3">
            <h6 className="text-info my-3">Thành viên</h6>
            <MDBCheckbox
              name="ttspeech_allowalluser"
              value=""
              id="ttspeech_allowalluser"
              label="Mọi người"
            />
            <MDBCheckbox
              name="ttspeech_allowfollower"
              value=""
              id="ttspeech_allowfollower"
              label="Follower"
            />
            <MDBCheckbox
              name="ttspeech_allowfriend"
              value=""
              id="ttspeech_allowfriend"
              label="Bạn bè"
            />
            <MDBCheckbox
              name="ttspeech_allowmoderators"
              value=""
              id="ttspeech_allowmoderators"
              label="Quản trị viên"
            />
            <MDBCheckbox
              name="ttspeech_allowtop1gifter"
              value=""
              id="ttspeech_allowtop1gifter"
              label="#1 Gifter"
            />
            <MDBCheckbox
              name="ttspeech_allowtop3gifter"
              value=""
              id="ttspeech_allowtop3gifter"
              label="Top 3 Gifter "
            />
            <MDBCheckbox
              name="ttspeech_allowuserfromlist"
              value=""
              id="ttspeech_allowuserfromlist"
              label="Danh sách"
            />
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  )
}
export default memo(App)
