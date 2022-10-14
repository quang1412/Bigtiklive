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
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-react-ui-kit"
import RoomInfoCard from "./roomInfoCard"

function Navbar({ roomInfo, pageName, isProChannel }) {
  const [isNavShow, setNavShow] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <MDBNavbar
        dark
        expand="md"
        // bgColor="dark"
        style={{ zIndex: "1001", backgroundColor: "#03033f" }}
        className="position-fixed top-0 start-0 w-100"
      >
        <MDBContainer>
          <MDBNavbarBrand className="mb-2" href="#">
            Bigtik{" "}
            {isProChannel ? <small className="text-info ms-1">pro</small> : ""}
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
              {/* <MDBNavbarItem>
              <MDBNavbarLink
                className={pageName === "text-to-speech" && "active"}
                href="#text-to-speech"
              >
                Đọc comment
              </MDBNavbarLink>
            </MDBNavbarItem> */}
              <MDBNavbarItem>
                <MDBNavbarLink
                  className={pageName === "user-point" && "active"}
                  href="#user-point"
                >
                  Thành viên
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Hỗ trợ
                  </MDBDropdownToggle>
                  <MDBDropdownMenu
                    dark
                    style={{ backgroundColor: "rgb(3, 3, 63)" }}
                  >
                    <MDBDropdownItem
                      link
                      childTag="li"
                      role="button"
                      onClick={() =>
                        window.open("https://fb.com/groups/tiktokbanhang/")
                      }
                    >
                      Cộng đồng Tiktok Shop
                    </MDBDropdownItem>
                    <MDBDropdownItem link disabled>
                      Mở giới hạn đơn hàng
                    </MDBDropdownItem>
                    <MDBDropdownItem link disabled>
                      Mở tính năng Live PC
                    </MDBDropdownItem>
                    <MDBDropdownItem link disabled>
                      Buff tương tác Livestream
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      link
                      childTag="li"
                      role="button"
                      onClick={() => setModalShow(true)}
                    >
                      Nâng cấp Bigtik Pro
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <RoomInfoCard
              info={roomInfo}
              className="d-none d-md-inline-block"
            />
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <MDBModal show={modalShow} setShow={setModalShow} tabIndex="-1">
        <MDBModalDialog size="md">
          <MDBModalContent>
            <MDBModalHeader className="">
              <MDBModalTitle>Nâng cấp Bigtik Pro</MDBModalTitle>
              <a
                tag="a"
                className="btn-close"
                role="button"
                onClick={() => setModalShow(false)}
              ></a>
            </MDBModalHeader>
            <MDBModalBody>
              <p className="text-center">updateing...</p>
              Vui lòng liên hệ FB:{" "}
              <a
                href="https://www.messenger.com/t/100003132051815"
                target="_blank"
              >
                Phan Đức Nho
              </a>
            </MDBModalBody>
            <MDBModalFooter className="">
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
export default memo(Navbar)
