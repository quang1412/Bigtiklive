import React, { useState, memo } from 'react';
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
} from 'mdb-react-ui-kit';
import Alertbox from '../widgets/Alertbox';
import LikeRanking from '../widgets/LikeRanking';
import WheelOfFortune from '../widgets/WheelOfFortune';

import AlertboxConfig from '../components/modalAlertboxSettings';
import LikeRankingConfig from '../components/modalLikeRankingSettings';
import WheelOfFortuneSettings from '../components/modalWheelSettings';
import { fakeLikeEvent } from '../modules/fakeData';

const homeUrl = window.location.origin;

function handleCopy(e) {
  const target = e.target;
  const copyTargetId = target.getAttribute('data-copy-target');
  const copyTarget = document.getElementById(copyTargetId);
  const copyValue = copyTarget.value;

  navigator.clipboard.writeText(copyValue).then(function () {
    copyTarget.select();
    window.toast("Đã copy vào bộ nhớ đệm"); 
  }, function (err) {
    window.toast("Đã xảy ra lỗi"); 
  });
}

function Widgets(props) {
  const { settings, handleSettingChange, event, setEvent } = props;
  const [modalShow, setModalShow] = useState(false);
  const [modalSetting, setModalSetting] = useState(false);
  const cid = settings.uid;

  function resetLikeRanking(e) {
    fetch(`http://localhost:3001/api/resetlikeranking?cid=${cid}`)
      .then(() => {
        window.toast("Đã gửi lệnh reset")

        setEvent({ name: 'likerankreset' });
      });
  }

  return (
    <>
      <div className='mb-5'>
        <h4 className='text-info'>Widgets</h4>
        <p>
          <span>Tại đây bạn có thể sử dụng các widget để hiển thị lên Livestream qua OBS (nguồn trình duyệt).</span><br />
          <span>Tất các widget được tách biệt riêng lẻ, giúp bạn dễ dàng căn chỉnh trên giao diện Livestream.</span><br />
          <span>Để thêm widget vào OBS, bạn chỉ cần copy URL.</span><br />
        </p>
        <p>
          <span>Lưu ý: Để thay đổi màu sắc hoặc font chữ, bạn hãy ấn vào "Tuỳ biến" của mỗi widget.</span><br />
          <span>nên đặt chiều rộng của widget tối đa là 1280px.</span><br />
        </p>
      </div>

      <div className='mb-3'>{/* AlertBox */}
        <h5 className='text-info'>AlertBox</h5>
        <p>Tuỳ biến hiệu ứng thông báo cho các sự kiện donate, follow, like, share.</p>
        <div className='p-3'>
          <MDBRow className='mb-2'>
            <MDBCol size="md" lg="11" xl="9">
              <MDBInputGroup>
                <input className='form-control rounded bg-dark text-light border-muted mb-1' id="alertboxWidgetUrl" type='text' style={{ borderStyle: 'dashed', cursor: 'text' }} readOnly value={cid ? `${homeUrl}/widget/alertbox?cid=${cid}` : 'vui lòng đăng nhập'} />
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1' data-copy-target="alertboxWidgetUrl" onClick={handleCopy}>
                  <MDBIcon className='me-1' fas icon="link" /> Copy</MDBBtn>
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1 text-nowrap' onClick={() => { setEvent(fakeLikeEvent()) }}>
                  <MDBIcon className='me-1' fas icon="angle-right" /> Test</MDBBtn>
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1 text-nowrap' onClick={() => { setModalShow(true); setModalSetting('alertbox') }}>
                  <MDBIcon className='me-1' fas icon="tools" /> Tuỳ biến</MDBBtn>
              </MDBInputGroup>
              <MDBCard background='dark' className='text-white position-relative border border-muted'>
                <MDBCardBody style={{ minHeight: "400px", position: "relative", overflow: 'hidden' }}>
                  <Alertbox event={event} settings={settings} isMute={true} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <div className='mb-3'>{/* AlertBox */}
        <h5 className='text-info'>Top Thả tim</h5>
        <p>Mô tả...</p>
        <div className='p-3'>
          <MDBRow className='mb-2'>
            <MDBCol size="md" lg="11" xl="9">
              <MDBInputGroup>
                <input className='form-control rounded bg-dark text-light border-muted mb-1' id="likerankingWidgetUrl" type='text' style={{ borderStyle: 'dashed', cursor: 'text' }} readOnly value={cid ? `${homeUrl}/widget/likeranking?cid=${cid}` : 'vui lòng đăng nhập'} />
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1' data-copy-target="likerankingWidgetUrl" onClick={handleCopy}>
                  <MDBIcon className='me-1' fas icon="link" /> Copy</MDBBtn>
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1 text-nowrap' onClick={resetLikeRanking}>
                  <MDBIcon fas icon="trash" /> Reset</MDBBtn>
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1 text-nowrap' onClick={() => { setModalShow(true); setModalSetting('likeranking') }}>
                  <MDBIcon className='me-1' fas icon="tools" /> Tuỳ biến</MDBBtn>
              </MDBInputGroup>
              <MDBCard background='dark' className='text-white position-relative border border-muted'>
                <MDBCardBody style={{ minHeight: "400px", position: "relative", overflow: 'hidden' }}>
                  <LikeRanking settings={settings} event={event} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <div className='mb-3'>{/* AlertBox */}
        <h5 className='text-info'>Wheel of fortune</h5>
        <p>Mô tả...</p>
        <div className='p-3'>
          <MDBRow className='mb-2'>
            <MDBCol size="md" lg="11" xl="9">
              <MDBInputGroup>
                <input className='form-control rounded bg-dark text-light border-muted mb-1' id="wheelOfFortuneWidgetUrl" type='text' style={{ borderStyle: 'dashed', cursor: 'text' }} readOnly value={cid ? `${homeUrl}/widget/wheeloffortune?cid=${cid}` : 'vui lòng đăng nhập'} />
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1' data-copy-target="wheelOfFortuneWidgetUrl" onClick={handleCopy}>
                  <MDBIcon className='me-1' fas icon="link" /> Copy</MDBBtn>
                <MDBBtn color="dark" className='text-light rounded border border-muted mb-1 ms-1 text-nowrap' onClick={() => { setModalShow(true); setModalSetting('wheel') }}>
                  <MDBIcon className='me-1' fas icon="tools" /> Tuỳ biến</MDBBtn>
              </MDBInputGroup>
              <MDBCard background='dark' className='text-white position-relative border border-muted'>
                <MDBCardBody className="" style={{ minHeight: "440px", position: "relative", overflow: 'hidden' }}>
                  <WheelOfFortune settings={settings} event={event} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <MDBModal show={modalShow} setShow={setModalShow} tabIndex='-1'>
        <MDBModalDialog scrollable size="lg">
          <MDBModalContent className='bg-dark h-100'>
            <MDBModalHeader className='border-1 border-muted'>
              <MDBModalTitle>Cài đặt widget</MDBModalTitle>
              <MDBBtn className='btn-close' color='white' onClick={() => setModalShow(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {modalSetting === 'alertbox' &&
                <AlertboxConfig settings={settings} handleChange={handleSettingChange} />
              }
              {modalSetting === 'likeranking' &&
                <LikeRankingConfig settings={settings} handleChange={handleSettingChange} />
              }
              {modalSetting === 'wheel' &&
                <WheelOfFortuneSettings settings={settings} handleChange={handleSettingChange} />
              }
            </MDBModalBody>
            <MDBModalFooter className='border-1 border-muted'>
              <MDBBtn color='info' onClick={() => setModalShow(false)}>Đóng</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
export default memo(Widgets)