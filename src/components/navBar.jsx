import React, { useState, memo } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

const avatar = '/assets/images/default-avatar.webp'

const StatusAvatar = props => {
  const { info, className } = props;
  const { isConnected, roomInfo } = info;
  return (
    <div className={'d-inline-block p-1 position-relative ' + className} role="button">
      <MDBIcon fas icon="circle" className='position-absolute top-0 end-0' size="xs" color={isConnected ? 'success' : 'muted'} style={{ 'zIndex': '4' }} />
      <MDBDropdown className='Avatar-dropdown'>
        <MDBDropdownToggle tag='div' className='' role='button'>
          <img
            src={roomInfo ? roomInfo.owner.avatar_thumb.url_list[0] : avatar}
            className='rounded-circle'
            alt='Livestream cover' width="30" height="30" onError={window.imageOnError}
          />
        </MDBDropdownToggle>
        {roomInfo &&
          <MDBDropdownMenu>
            <MDBDropdownItem link href={`https://tiktok.com/@${roomInfo.owner.display_id}`}>
              {`Xem hồ sơ ${roomInfo.owner.display_id}`}
            </MDBDropdownItem>
            <MDBDropdownItem link href={`https://tiktok.com/@${roomInfo.owner.display_id}/live`} target="_blank">
              Xem livestream
            </MDBDropdownItem>
          </MDBDropdownMenu>
        }
      </MDBDropdown>
    </div>
  )
}

function Navbar(props) {
  const { roomInfo, pageName } = props;
  const [_showBasic, setShowBasic] = useState(false);

  return <MDBNavbar expand='md' dark bgColor='dark' className='position-fixed top-0 w-100' style={{ zIndex: '3' }}>
    <MDBContainer>
      <MDBNavbarBrand href='#' className="fw-bold text-light">Bigtik</MDBNavbarBrand>
      <StatusAvatar info={roomInfo} className="d-md-none ms-auto" />
      <MDBNavbarToggler
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setShowBasic(!_showBasic)}
      >
        <MDBIcon icon='bars' fas className='ms-0' />
      </MDBNavbarToggler>
      <MDBCollapse navbar show={_showBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 text-start'>
          <MDBNavbarItem>
            <MDBNavbarLink className={pageName === 'home' && 'active'} href='#home'>
              Giới thiệu
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink className={pageName === 'setup' && 'active'} href='#setup'>Cài đặt</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink className={pageName === 'widgets' && 'active'} href='#widgets'>Widgets</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink className={pageName === 'user-point' && 'active'} href='#user-point'>Thành viên</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>

          </MDBNavbarItem>
        </MDBNavbarNav>
        <StatusAvatar info={roomInfo} className="d-none d-md-inline-block" />
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
}
export default memo(Navbar);