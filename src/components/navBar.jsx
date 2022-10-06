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
  MDBCollapse,
} from "mdb-react-ui-kit"
import RoomInfoCard from "./roomInfoCard"

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
            <RoomInfoCard info={roomInfo} className="d-md-none ms-auto" />
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
          <RoomInfoCard info={roomInfo} className="d-none d-md-inline-block" />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
export default memo(Navbar)
