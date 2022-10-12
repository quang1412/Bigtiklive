import React, { useState, memo, useRef, useEffect } from "react"
import {
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBIcon,
} from "mdb-react-ui-kit"
import { login, logout } from "../modules/fireBase"

const TiktokIdInputField = ({ settings, updateSettings }) => {
  const [isShow, setShow] = useState(false)
  const [secondLeft, setSecondLeft] = useState(3600)
  const [countDown, setCountDown] = useState("--:--")
  const tiktokId = useRef()

  useEffect(() => {
    function counter() {
      const now = (new Date().getTime() / 1000).toFixed()
      const timeLeft = Math.max(
        window.idEditDelay - (now - settings.basic_updateidat / 1000),
        0
      )
      setSecondLeft(timeLeft)
      setCountDown(timeLeft.toMMSS())
    }
    counter()
    const interval = setInterval(counter, 1000)
    return () => {
      clearTimeout(interval)
    }
  }, [settings]) // đồng hồ đếm ngược tới thời gian sửa ID tiktok

  function saveTiktokId() {
    const usernameRegex = /^[a-zA-Z\_\.\d]+$/
    const id = tiktokId.current.value.trim()
    if (!id) {
      return window.toast.warn("vui lòng điền đầy đủ ID Tiktok")
    } else if (!usernameRegex.test(id)) {
      return window.toast.warn("id không hợp lệ")
    } else if (id === settings.basic_tiktokid) {
      return setShow(false)
    } else {
      updateSettings((current) => ({
        ...current,
        basic_tiktokid: id,
        basic_updateidat: new Date().getTime() - 1000,
      }))
      setShow(false)
    }
  }

  function cancelEdit(e) {
    setShow(false)
    tiktokId.current.value = settings.basic_tiktokid
  }

  function editTiktokId() {
    if (secondLeft <= 0) {
      setShow(true)
      return setTimeout(() => {
        tiktokId.current.select()
      }, 100)
    }
    window.toast.warn(
      `Chỉ có thể sửa ID 1 lần trong ${window.idEditDelay / 60} phút`,
      {}
    )
    return setShow(false)
  }

  return (
    <MDBRow>
      <MDBCol size="sm" md="4" lg="3" xl="2">
        <span>ID Tiktok</span> <small className="text-danger">(bắt buộc)</small>
      </MDBCol>
      <MDBCol size="sm" md="5" lg="4" xl="3">
        <MDBInputGroup textBefore="@">
          <input
            readOnly={!isShow}
            disabled={!isShow}
            ref={tiktokId}
            type="text"
            className={`form-control text-white bg-dark`}
            placeholder="Id tài khoản Tiktok"
            defaultValue={settings.basic_tiktokid || ""}
          />
        </MDBInputGroup>
        {isShow ? (
          <small>
            <span className="link-danger" role="button" onClick={cancelEdit}>
              huỷ bỏ
            </span>
            <span
              className="link-info ms-2"
              role="button"
              onClick={saveTiktokId}
            >
              lưu lại
            </span>
          </small>
        ) : secondLeft ? (
          <small className="text-muted">có thể sửa sau {countDown} nữa.</small>
        ) : (
          <>
            <small className="link-info" role="button" onClick={editTiktokId}>
              thay đổi
            </small>
            <small className="text-muted ms-2">
              giới hạn 1 lần trong 60 phút
            </small>
          </>
        )}
      </MDBCol>
    </MDBRow>
  )
}

function BasicSetting(props) {
  const { settings, handleSettingChange, updateSettings, setUserData } = props

  async function resetChannelUser() {
    if (
      window.confirm(
        "Bạn có chắc chắn xoá thông tin toàn bộ thành viên trên kênh của bạn?"
      )
    ) {
      setUserData(new Object())
      window.toast.success("Đã reset dữ liệu thành viên")
    }
  }

  return (
    <>
      <div className="mb-5">
        <h4 className="text-info">Cài đặt</h4>
        <p>Tuỳ biến các cài đặt cơ bản tại đây</p>
      </div>
      <div className="mb-3">
        <div className="p-3">
          {!settings.uid ? (
            <MDBRow>
              <MDBCol>
                <small className="mb-0">
                  Vui lòng đăng nhập tài khoản trước khi có thể sử dụng ứng
                  dụng!
                </small>
                <MDBBtn
                  onClick={() => login("google")}
                  className="px-5 my-2 text-nowrap d-block animate__animated animate__lightSpeedInLeft animate__faster "
                  style={{ width: "auto" }}
                >
                  Đăng nhập / Đăng ký
                  <MDBIcon className="ms-2" fab icon="google" />
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          ) : (
            <TiktokIdInputField
              settings={settings}
              updateSettings={updateSettings}
            />
          )}
        </div>
      </div>
      <div className="mb-3">
        {/* Tính điểm */}
        <h5 className="text-info">Tính điểm</h5>
        <div className="p-3">
          <MDBRow className="mb-3">
            {/*Tên đồng coin của bạn*/}
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Tên đồng coin của bạn</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className="form-control text-white bg-dark"
                defaultValue={settings.basic_nameofcoin}
                placeholder="Xu"
                type="text"
                name="basic_nameofcoin"
                onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-2">
            {/*Số coin cho 1 k.cương*/}
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <MDBCheckbox
                name="basic_coinperdiamondenabled"
                defaultChecked={settings.basic_coinperdiamondenabled}
                onChange={handleSettingChange}
                value=""
                label="Số coin cho 1 k.cương"
              />
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className="form-control text-white bg-dark"
                defaultValue={settings.basic_coinperdiamond}
                placeholder="1"
                min="1"
                type="number"
                name="basic_coinperdiamond"
                onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            {/*Số coin cho 1 share*/}
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <MDBCheckbox
                name="basic_coinpershareenabled"
                defaultChecked={settings.basic_coinpershareenabled}
                onChange={handleSettingChange}
                label="Số coin cho 1 share"
              />
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className="form-control text-white bg-dark"
                defaultValue={settings.basic_coinpershare}
                placeholder="1"
                min="1"
                type="number"
                name="basic_coinpershare"
                onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <div className="mb-3">
        {/* Ưu đãi cho Follower */}
        <h5 className="text-info">Ưu đãi cho Follower</h5>
        <p>
          Bạn có thể đặt hệ số bonus cho follower, giúp họ nhận nhiều coin hơn
          cho mỗi tương tác.
        </p>
        <div className="p-3">
          <MDBRow>
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Tỷ lệ ưu đãi follower</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <MDBInputGroup textAfter={<span className="text-white">%</span>}>
                <input
                  className="form-control text-white bg-dark"
                  defaultValue={settings.basic_followerbonus}
                  placeholder="0"
                  min="0"
                  type="number"
                  name="basic_followerbonus"
                  onChange={handleSettingChange}
                />
              </MDBInputGroup>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      {/* <div className="mb-3"> 
        <h5 className="text-info">Tuỳ chọn Level</h5>
        <p>
          Người xem có thể tăng cấp độ của họ bằng cách thu thập điểm. Trong
          Điểm cấp độ, bạn đặt số điểm cần thiết để đạt cấp độ tiếp theo. Hơn
          nữa, có một hệ số cấp độ, giúp tăng số điểm cần thiết với mỗi cấp độ.
          Do đó, số điểm cần thiết để đạt được cấp độ tiếp theo tăng lên theo
          cấp số nhân
        </p>
        <div className="p-3">
          <MDBRow className="mb-2">
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Số điểm cho mỗi level</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className="form-control text-white bg-dark"
                defaultValue={settings.basic_levelcoin}
                placeholder="1"
                min="1"
                type="number"
                name="basic_levelcoin"
                onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Hệ số tăng sau mỗi level</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <MDBInputGroup textAfter={<span className="text-white">%</span>}>
                <input
                  className="form-control text-white bg-dark"
                  defaultValue={settings.basic_levelmultiplier}
                  placeholder="1"
                  min="1"
                  step="0.1"
                  type="number"
                  name="basic_levelmultiplier"
                  onChange={handleSettingChange}
                />
              </MDBInputGroup>
            </MDBCol>
          </MDBRow>
        </div>
      </div> */}
      {settings.uid && (
        <>
          <div className="mb-3">
            {/* Reset coin & level */}
            <h5 className="text-info">Reset thành viên</h5>
            <p>
              Sử dụng tính năng này để xoá toàn bộ thành viên trong kênh của bạn
            </p>
            <div className="mb-3 p-3">
              <MDBBtn
                onClick={resetChannelUser}
                color="danger"
                className="px-5 text-nowrap "
              >
                Reset
              </MDBBtn>
            </div>
          </div>

          <div className="mb-3">
            {/* Tài khoản */}
            <h5 className="text-info">Tài khoản</h5>
            <p>
              Nếu có vấn đề gì với kết nối, bạn hãy thử đăng xuất và đăng nhập
              lại, dữ liệu của bạn đã được lưu trữ an toàn.
            </p>
            <div className="p-3">
              <MDBBtn
                onClick={logout}
                color="dark"
                className="px-5 text-nowrap border border-1"
              >
                Đăng xuất
              </MDBBtn>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default memo(BasicSetting)
