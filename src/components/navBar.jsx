import React, { useState, memo } from "react"
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit"

const StatusAvatar = (props) => {
  const { info, className } = props
  const { isConnected, roomInfo } = info
  const avatarUrl =
    roomInfo?.owner?.avatar_thumb?.url_list[0] || window.defaultAvatar
  const display_id = roomInfo?.owner?.display_id || "tiktok"
  const flv_pull_url = roomInfo?.stream_url?.flv_pull_url || {}
  const stream_url =
    flv_pull_url.FULL_HD1 ||
    flv_pull_url.HD1 ||
    flv_pull_url.SD1 ||
    flv_pull_url.SD2 ||
    "#"
  return (
    <MDBDropdown
      className={className}
      options={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 3],
            },
          },
        ],
      }}
    >
      <MDBDropdownToggle
        tag="section"
        color="light"
        className="p-1 rounded-5 d-flex align-items-center"
        style={{ backgroundColor: "var(--mdb-gray-800)" }}
        role="button"
      >
        <img
          src={window.imageUrlFixing(avatarUrl)}
          onError={window.imageOnError}
          className={
            "rounded-5 border border-2 " +
            (isConnected ? "border-info" : "border-muted")
          }
          width="30"
          height="30"
          alt="avatar"
        />
        <small className="text-nowrap text-start lh-1 mx-2 d-none d-md-flex flex-column">
          <span>{display_id}</span>
          <small className={isConnected ? "text-info" : "text-muted"}>
            {isConnected ? "connected" : "disconnected"}
          </small>
        </small>
      </MDBDropdownToggle>
      <MDBDropdownMenu dark>
        <MDBDropdownItem className="p-1" />
        <MDBDropdownItem link href={"https://tiktok.com/@" + display_id}>
          Xem trang tiktok
        </MDBDropdownItem>
        <MDBDropdownItem
          link
          className={!isConnected && "d-none"}
          href={"https://tiktok.com/@" + display_id + "/live"}
        >
          Xem livestream
        </MDBDropdownItem>
        <MDBDropdownItem
          link
          className={!isConnected && "d-none"}
          href={stream_url}
        >
          Tải xuống
        </MDBDropdownItem>
        <MDBDropdownItem className="p-1" />
      </MDBDropdownMenu>
    </MDBDropdown>
  )
}

function Navbar(props) {
  const { roomInfo, pageName } = props
  const [isNavShow, setNavShow] = useState(false)

  return (
    <MDBNavbar
      dark
      expand="md"
      bgColor="dark"
      style={{ zIndex: "1001" }}
      onMouseOut={() => setNavShow(false)}
      className="position-fixed top-0 w-100"
    >
      <MDBContainer>
        <MDBNavbarBrand className="mb-2" href="#">
          Bigtik
        </MDBNavbarBrand>
        <div className="d-flex align-items-center">
          <div className="d-inline-block d-md-none me-0">
            <StatusAvatar info={roomInfo} className="d-md-none ms-auto" />
          </div>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setNavShow(!isNavShow)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
        </div>
        <MDBCollapse navbar show={isNavShow}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 text-start">
            <MDBNavbarItem>
              <MDBNavbarLink
                className={pageName === "home" && "active"}
                href="#home"
              >
                Giới thiệu
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                className={pageName === "setup" && "active"}
                href="#setup"
              >
                Cài đặt
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                className={pageName === "widgets" && "active"}
                href="#widgets"
              >
                Widgets
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink
                className={pageName === "user-point" && "active"}
                href="#user-point"
              >
                Thành viên
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <StatusAvatar info={roomInfo} className="d-none d-md-inline-block" />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
export default memo(Navbar)
