import React, { useState, memo, useRef, useEffect } from 'react';
import {
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import { login, logout } from '../modules/fireBase';

function BasicSetting(props) {
  const { settings, handleSettingChange, updateSettings, setUserData } = props;
  const [showInput, setShow] = useState(false);
  const [secondLeft, setSecondLeft] = useState(3600);
  const [countDown, setCountDown] = useState('--:--');
  const tiktokId = useRef();

  async function resetChannelUser() {
    if (window.confirm('Bạn có chắc chắn xoá thông tin toàn bộ thành viên trên kênh của bạn?')) {
      setUserData(new Object());
      window.toast.success('Đã reset dữ liệu thành viên');
    }
  }

  // đồng hồ đếm ngược tới thời gian sửa ID tiktok
  useEffect(() => {
    function counter() {
      const now = (new Date().getTime() / 1000).toFixed();
      const timeLeft = Math.max(0, window.idEditDelay - (now - settings.basic_updateidat))
      setSecondLeft(timeLeft);
      setCountDown(timeLeft.toMMSS());
    }
    counter();
    const interval = setInterval(counter, 1000);
    return () => { clearTimeout(interval) }
  }, [settings])

  function saveTiktokId() {
    const usernameRegex = /^[a-zA-Z\_\.\d]+$/
    const id = tiktokId.current.value.trim();
    if (!id) {
      return window.toast.warn('vui lòng điền đầy đủ ID Tiktok');
    } else if (!usernameRegex.test(id)) {
      return window.toast.warn('id không hợp lệ');
    }
    else if (id === settings.basic_tiktokid) {
      return setShow(false);
    } else {
      const now = (new Date().getTime() / 1000).toFixed();
      updateSettings(current => ({ ...current, 'basic_tiktokid': id, 'basic_updateidat': parseInt(now) }));
      setShow(false);
    }
  }

  function cancelEdit(e) {
    setShow(false);
    tiktokId.current.value = settings.basic_tiktokid;
  }

  function editTiktokId() {
    if (secondLeft <= 0) {
      setShow(true);
      return setTimeout(() => { tiktokId.current.select() }, 100)
    };
    window.toast.warn(`Chỉ có thể sửa ID 1 lần trong ${window.idEditDelay / 60} phút`, {});
    return setShow(false);
  }

  return (
    <div className="">
      <div className='mb-3 '>
        <h4 className='text-info'>Cài đặt</h4>
        <p>Tuỳ biến các cài đặt cơ bản tại đây</p>
        <div className='p-3'>
          <div className='mb-3'>
            {!window.authData ?
              <div>
                <p><small>Vui lòng đăng nhập tài khoản trước khi có thể sử dụng ứng dụng!</small></p>
                <MDBBtn disabled onClick={() => login('facebook')} className="px-5 my-2 text-nowrap d-block">Đăng nhập bằng Facebook</MDBBtn>
                <MDBBtn onClick={() => login('google')} className="px-5 my-2 text-nowrap d-block">Đăng nhập bằng Google</MDBBtn>
              </div>
              :
              <MDBRow>
                <MDBCol size="sm" md="4" lg="3" xl="2">
                  <span>ID Tiktok</span> <small className='text-danger'>(bắt buộc)</small>
                </MDBCol>
                <MDBCol size="sm" md="5" lg="4" xl="3">
                  <MDBInputGroup textBefore='@'>
                    <input
                      readOnly={!showInput}
                      disabled={!showInput}
                      ref={tiktokId} type='text'
                      className={`form-control text-white bg-dark`}
                      placeholder='Id tài khoản Tiktok'
                      defaultValue={settings.basic_tiktokid || ''}
                    />
                  </MDBInputGroup>
                  {showInput ?
                    <small>
                      <span className='link-danger' role='button' onClick={cancelEdit}>huỷ bỏ</span>
                      <span className='link-info ms-2' role='button' onClick={saveTiktokId}>lưu lại</span>
                    </small>
                    : secondLeft ?
                      <small className='text-muted'>có thể sửa sau {countDown}</small>
                      : <>
                        <small className='link-info' role='button' onClick={editTiktokId}>thay đổi</small>
                        <small className='text-muted ms-2'>giới hạn 1 lần trong 60 phút</small>
                      </>
                  }
                </MDBCol>
              </MDBRow>
            }
          </div>
        </div>
      </div>
      <div className='mb-3'>{/* Tính điểm */}
        <h5 className='text-info'>Tính điểm</h5>
        <div className='p-3'>
          <MDBRow className='mb-4'>{/*Tên đồng coin của bạn*/}
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Tên đồng coin của bạn</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className='form-control text-white bg-dark'
                defaultValue={settings.basic_nameofcoin} placeholder='Xu'
                type='text' name='basic_nameofcoin'
                onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className='mb-2'>{/*Số coin cho 1 k.cương*/}
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <MDBCheckbox name='basic_coinperdiamondenabled'
                defaultChecked={settings.basic_coinperdiamondenabled}
                onChange={handleSettingChange}
                value='' label='Số coin cho 1 k.cương' />
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className='form-control text-white bg-dark'
                defaultValue={settings.basic_coinperdiamond} placeholder="1" min="1"
                type='number' name='basic_coinperdiamond' onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className='mb-2'>{/*Số coin cho 1 share*/}
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <MDBCheckbox name='basic_coinpershareenabled'
                defaultChecked={settings.basic_coinpershareenabled}
                onChange={handleSettingChange} label='Số coin cho 1 share' />
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className='form-control text-white bg-dark'
                defaultValue={settings.basic_coinpershare} placeholder='1' min="1"
                type='number' name='basic_coinpershare' onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          {/* <MDBRow className='mb-2'>  
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <MDBCheckbox name='basic_coinper100likeenabled' onChange={handleSettingChange}
                defaultChecked={settings.basic_coinper100likeenabled}
                value='' label='Số coin cho 100 like' />
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className='form-control text-white bg-dark'
                defaultValue={settings.basic_coinper100like} placeholder='1' min="1"
                type='number' name='basic_coinper100like' onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow> */}
          {/* <MDBRow className='mb-2'>  
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <MDBCheckbox name='basic_coinpercommentenabled' onChange={handleSettingChange}
                defaultChecked={settings.basic_coinpercommentenabled}
                value='' label='Số coin cho 1 comment' />
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className='form-control text-white bg-dark'
                defaultValue={settings.basic_coinpercomment} placeholder='1' min="1"
                type='number' name='basic_coinpercomment' onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow> */}
        </div>
      </div>
      <div className='mb-3'>{/* Ưu đãi cho Follower */}
        <h5 className='text-info'>Ưu đãi cho Follower</h5>
        <p>Bạn có thể đặt hệ số bonus cho follower, giúp họ nhận nhiều coin hơn cho mỗi tương tác.</p>
        <div className='p-3'>
          <MDBRow className='mb-2'>
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Tỷ lệ ưu đãi follower</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <MDBInputGroup textAfter={<span className='text-white'>%</span>}>
                <input
                  className='form-control text-white bg-dark'
                  defaultValue={settings.basic_followerbonus} placeholder='0' min='0'
                  type='number' name='basic_followerbonus' onChange={handleSettingChange}
                />
              </MDBInputGroup>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <div className='mb-3'>{/* Tuỳ chọn Level */}
        <h5 className='text-info'>Tuỳ chọn Level</h5>
        <p>Viewers can increase their level by collecting points. In Level Points you set how many points are required to reach the next level. Furthermore, there is a level multiplier, which increases the number of points required with each level. As a result, the number of points required to reach the next level increases exponentially.</p>
        <div className='p-3'>
          <MDBRow className='mb-2'>
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Số điểm cho mỗi level</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <input
                className='form-control text-white bg-dark'
                defaultValue={settings.basic_levelcoin} placeholder='1' min="1"
                type='number' name='basic_levelcoin' onChange={handleSettingChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className='mb-2'>
            <MDBCol size="sm" md="4" lg="3" xl="2">
              <label>Hệ số tăng sau mỗi level</label>
            </MDBCol>
            <MDBCol size="sm" md="5" lg="4" xl="3">
              <MDBInputGroup textAfter={<span className='text-white'>%</span>}>
                <input
                  className='form-control text-white bg-dark'
                  defaultValue={settings.basic_levelmultiplier} placeholder='1' min='1' step="0.1"
                  type='number' name='basic_levelmultiplier' onChange={handleSettingChange}
                />
              </MDBInputGroup>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      {window.authData &&
        <>
          <div className='mb-3'>{/* Reset coin & level */}
            <h5 className='text-info'>Reset coin & level</h5>
            <p>Use the following button to reset all Points and Levels.</p>
            <div className='mb-3 p-3'>
              <div className='mb-3'>
                <MDBBtn onClick={resetChannelUser} color="danger" className="px-5 text-nowrap ">Reset</MDBBtn>
              </div>
            </div>
          </div>

          <div className='mb-3'>{/* Tài khoản */}
            <h5 className='text-info'>Tài khoản</h5>
            <p>Nếu có vấn đề gì với kết nối, bạn hãy thử đăng xuất và đăng nhập lại, dữ liệu của bạn đã được lưu trữ an toàn.</p>
            <div className='mb-3 p-3'>
              <div className='mb-3'>
                <MDBBtn onClick={logout} color="dark" className="px-5 text-nowrap border border-1">Đăng xuất</MDBBtn>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}
export default memo(BasicSetting);