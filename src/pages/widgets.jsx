import React, { useState, memo } from "react"
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit"
import Alertbox from "../widgets/Alertbox"
import LikeRanking from "../widgets/LikeRanking"
import WheelOfFortune from "../widgets/WheelOfFortune"

import AlertboxConfig from "../components/modalAlertboxSettings"
import LikeRankingConfig from "../components/modalLikeRankingSettings"
import WheelOfFortuneSettings from "../components/modalWheelSettings"

const homeUrl = window.location.origin

function Widgets(props) {
  const { settings, handleSettingChange, event, authData } = props
  const [modalShow, setModalShow] = useState(false)
  const [modalSetting, setModalSetting] = useState(false)
  const cid = settings.uid

  return (
    <>
      <div className="mb-5">
        <h4 className="text-info">Widgets</h4>
        <p>
          <span>
            Tại đây bạn có thể sử dụng các widget để hiển thị lên Livestream qua
            OBS (nguồn trình duyệt).
          </span>
          <br />
          <span>
            Tất các widget được tách biệt riêng lẻ, giúp bạn dễ dàng căn chỉnh
            trên giao diện Livestream.
          </span>
          <br />
          <span>Để thêm widget vào OBS, bạn chỉ cần copy URL.</span>
          <br />
        </p>
        <p>
          Lưu ý: Để thay đổi màu sắc hoặc font chữ, bạn hãy ấn vào "Tuỳ biến"
          của mỗi widget.
        </p>
        <p>Nên đặt chiều rộng của widget tối đa là 1280px.</p>
      </div>

      <div className="mb-3">
        {/* ALERTBOX */}
        <h5 className="text-info">AlertBox</h5>
        <p>
          Tuỳ biến hiệu ứng thông báo cho các sự kiện donate, follow, like,
          share.
        </p>
        <div className="p-3">
          <MDBRow className="mb-2">
            <MDBCol size="md" lg="11" xl="9">
              {authData && (
                <MDBInputGroup>
                  <input
                    className="form-control rounded bg-dark text-light border-muted mb-1 me-1"
                    id="alertboxWidgetUrl"
                    type="text"
                    style={{ borderStyle: "dashed", cursor: "text" }}
                    readOnly
                    value={
                      cid
                        ? `${homeUrl}/widget/alertbox?cid=${cid}`
                        : "vui lòng đăng nhập"
                    }
                  />
                  <MDBBtn
                    color="dark"
                    className="text-light rounded border border-muted mb-1 me-1"
                    data-copy-target="alertboxWidgetUrl"
                    onClick={window.handleCopy}
                  >
                    <MDBIcon className="me-1" fas icon="link" /> Copy
                  </MDBBtn>
                  <MDBDropdown className="rounded border border-muted mb-1 me-1 text-nowrap">
                    <MDBDropdownToggle className="bg-dark text-success h-100">
                      <MDBIcon className="me-1" fas icon="heart" /> Test
                    </MDBDropdownToggle>
                    <MDBDropdownMenu dark>
                      <MDBDropdownItem
                        link
                        childTag="button"
                        onClick={() => window.createFakeEvent("gift")}
                      >
                        Quà tặng
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        childTag="button"
                        onClick={() => window.createFakeEvent("follow")}
                      >
                        Theo dõi
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        childTag="button"
                        onClick={() => window.createFakeEvent("share")}
                      >
                        Chia sẻ
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        childTag="button"
                        onClick={() => window.createFakeEvent("like")}
                      >
                        Thả tim
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  <MDBBtn
                    color="dark"
                    className="text-light rounded border border-muted mb-1 text-nowrap"
                    onClick={() => {
                      setModalShow(true)
                      setModalSetting("alertbox")
                    }}
                  >
                    <MDBIcon className="me-1" fas icon="tools" /> Tuỳ biến
                  </MDBBtn>
                </MDBInputGroup>
              )}
              <MDBCard
                background="dark"
                className="text-white position-relative border border-muted"
              >
                <MDBCardBody
                  style={{
                    minHeight: "400px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Alertbox event={event} settings={settings} isMute={true} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <div className="mb-3">
        {/* LIKE RANK */}
        <h5 className="text-info">Top Thả tim</h5>
        <p>Xếp hạng người xem dựa trên lượt thả tim</p>
        <MDBRow className="p-3 mb-2">
          <MDBCol size="md" lg="11" xl="9">
            {authData && (
              <MDBInputGroup>
                <input
                  className="form-control rounded bg-dark text-light border-muted mb-1 me-1 d-block d-md-inline-block"
                  id="likerankingWidgetUrl"
                  type="text"
                  style={{ borderStyle: "dashed", cursor: "text" }}
                  readOnly
                  value={
                    cid
                      ? `${homeUrl}/widget/likeranking?cid=${cid}`
                      : "vui lòng đăng nhập"
                  }
                />
                <MDBBtn
                  color="dark"
                  className="text-light rounded border border-muted mb-1 me-1"
                  data-copy-target="likerankingWidgetUrl"
                  onClick={window.handleCopy}
                >
                  <MDBIcon className="me-1" fas icon="link" /> Copy
                </MDBBtn>
                <MDBBtn
                  color="dark"
                  className="text-danger rounded border border-muted mb-1 me-1"
                  data-copy-target="likerankingWidgetUrl"
                  onClick={() => window.widgetControl("reset-likerank")}
                >
                  <MDBIcon className="me-1" fas icon="trash-alt" /> Reset
                </MDBBtn>
                <MDBBtn
                  color="dark"
                  className="text-light rounded border border-muted mb-1"
                  data-copy-target="likerankingWidgetUrl"
                  onClick={() => {
                    setModalShow(true)
                    setModalSetting("likeranking")
                  }}
                >
                  <MDBIcon className="me-1" fas icon="sliders-h" /> Tuỳ biến
                </MDBBtn>
              </MDBInputGroup>
            )}
            <MDBCard
              background="dark"
              className="text-white position-relative border border-muted"
            >
              <MDBCardBody
                style={{
                  minHeight: "400px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <LikeRanking settings={settings} event={event} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
      <div className="mb-3">
        {/* WHEEL OF FORTUNE */}
        <h5 className="text-info">Wheel of fortune</h5>
        <p>Mô tả...</p>
        <div className="p-3">
          <MDBRow className="mb-2">
            <MDBCol size="md" lg="11" xl="9">
              {authData && (
                <MDBInputGroup>
                  <input
                    className="form-control rounded bg-dark text-light border-muted mb-1 me-1"
                    id="wheelOfFortuneWidgetUrl"
                    type="text"
                    style={{ borderStyle: "dashed", cursor: "text" }}
                    readOnly
                    value={`${homeUrl}/widget/wheeloffortune?cid=${cid}`}
                  />
                  <MDBBtn
                    color="dark"
                    className="text-light rounded border border-muted mb-1 me-1"
                    data-copy-target="wheelOfFortuneWidgetUrl"
                    onClick={window.handleCopy}
                  >
                    <MDBIcon className="me-1" fas icon="link" /> Copy
                  </MDBBtn>
                  <MDBBtn
                    color="dark"
                    className="text-success rounded border border-muted mb-1 me-1"
                    data-copy-target="wheelOfFortuneWidgetUrl"
                    onClick={() => window.widgetControl("wheel-start-spin")}
                  >
                    <MDBIcon className="me-1" fas icon="play" /> Quay
                  </MDBBtn>
                  <MDBBtn
                    color="dark"
                    className="text-danger rounded border border-muted mb-1 me-1"
                    data-copy-target="wheelOfFortuneWidgetUrl"
                    onClick={() => window.widgetControl("wheel-reset")}
                  >
                    <MDBIcon className="me-1" fas icon="trash-alt" /> Reset
                  </MDBBtn>
                  <MDBBtn
                    color="dark"
                    className="text-light rounded border border-muted mb-1"
                    data-copy-target="wheelOfFortuneWidgetUrl"
                    onClick={() => {
                      setModalShow(true)
                      setModalSetting("wheel")
                    }}
                  >
                    <MDBIcon className="me-1" fas icon="sliders-h" /> Tuỳ biến
                  </MDBBtn>
                </MDBInputGroup>
              )}
              <MDBCard
                background="dark"
                className="text-white position-relative border border-muted"
              >
                <MDBCardBody
                  className=""
                  style={{
                    minHeight: "520px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <WheelOfFortune settings={settings} event={event} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <MDBModal show={modalShow} setShow={setModalShow} tabIndex="-1">
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent className="bg-dark h-100">
            <MDBModalHeader className="border-1 border-muted">
              <MDBModalTitle>Cài đặt widget</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="white"
                onClick={() => setModalShow(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {modalSetting === "alertbox" && (
                <AlertboxConfig
                  settings={settings}
                  handleChange={handleSettingChange}
                />
              )}
              {modalSetting === "likeranking" && (
                <LikeRankingConfig
                  settings={settings}
                  handleChange={handleSettingChange}
                />
              )}
              {modalSetting === "wheel" && (
                <WheelOfFortuneSettings
                  settings={settings}
                  handleChange={handleSettingChange}
                />
              )}
            </MDBModalBody>
            <MDBModalFooter className="border-1 border-muted">
              <MDBBtn color="info" onClick={() => setModalShow(false)}>
                Đóng
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
export default memo(Widgets)
