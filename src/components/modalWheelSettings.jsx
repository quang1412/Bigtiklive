import React, { memo } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBRange,
  MDBRadio,
  MDBInputGroup
} from 'mdb-react-ui-kit';

// widget_wof_friend: true,
//   widget_wof_follower: true,
//     widget_wof_unfollower: true,
//       widget_wof_maxPlayer: 10,
//         widget_wof_joinEvent: 'chat',
//           widget_wof_commentKey: 'a',
//             widget_wof_giftName: 'rose',
//               widget_wof_giftCount: 1

function App(props) {
  const { settings, handleChange } = props;
  const sName = (shortName) => `widget_wof_${shortName}`;
  const sValue = (shortName) => settings[`widget_wof_${shortName}`];
  return (
    <div className=" ">
      <MDBRow className='mb-3'>
        <MDBCol size="md" md="4">
          <label>Người chơi</label>
        </MDBCol>
        <MDBCol size="md" md="8" >
          <MDBCheckbox label='Bạn bè' name={sName('friend')} defaultChecked={sValue('friend')} onChange={handleChange} />
          <MDBCheckbox label='Người theo dõi' name={sName('follower')} defaultChecked={sValue('follower')} onChange={handleChange} />
          <MDBCheckbox label='Người chưa theo dõi' name={sName('unfollower')} defaultChecked={sValue('unfollower')} onChange={handleChange} />
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-3'>
        <MDBCol size="md" md="4">
          <label>Số lượng người chơi</label>
        </MDBCol>
        <MDBCol size="md" md="8" >
          <MDBRange name={sName('maxPlayer')} defaultValue={sValue('maxPlayer')} onChange={handleChange} step="1" min='2' max="50" type="range" className="form-range" />
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-3'>
        <MDBCol size="md" md="4">
          <label>Hành động</label>
        </MDBCol>
        <MDBCol size="md" md="8" className='d-flex align-items-center gap-3'>
          <MDBRadio name={sName('joinEvent')} label='Comment' value="chat" defaultChecked={sValue('joinEvent') === 'chat'} onChange={handleChange} />
          <MDBRadio name={sName('joinEvent')} label='Tặng quà' value="gift" defaultChecked={sValue('joinEvent') === 'gift'} onChange={handleChange} />
        </MDBCol>
      </MDBRow>
      {sValue('joinEvent') === 'chat' &&
        <MDBRow className='mb-3'>
          <MDBCol size="md" md="4">
            <label>Từ khoá comment</label>
          </MDBCol>
          <MDBCol size="md" md="8">
            <input name={sName('commentKey')} defaultValue={sValue('commentKey')} onInput={handleChange} type="text" className="form-control" />
          </MDBCol>
        </MDBRow>
      }
      {sValue('joinEvent') === 'gift' &&
        <MDBRow className='mb-3'>
          <MDBCol size="md" md="4">
            <label>Quà tặng</label>
          </MDBCol>
          <MDBCol size="md" md="8" className='d-flex align-items-center'>
            <MDBInputGroup>
              <input name={sName('giftCount')} defaultValue={sValue('giftCount')} onInput={handleChange} className='form-control ' type='number' min='1' step='1' />
              <select name={sName('giftName')} defaultValue={sValue('giftName')} onInput={handleChange} className='form-control w-75'>
                <option value='rose' >Hoa Hồng</option>
                <option value='tiktok'>Tiktok</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
      }
      {/* <MDBRow className='mb-3'>
        <MDBCol size="md" md="4">
          <label>Url hình nền</label>
        </MDBCol>
        <MDBCol size="md" md="8" className='d-flex align-items-center'>
          <MDBCheckbox name={sName('bgImageEnabled')} defaultChecked={sValue('bgImageEnabled')} onChange={handleChange} />
          <input type="text" name={sName('bgImageUrl')} defaultValue={sValue('bgImageUrl')} onChange={handleChange} className="form-control" />
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-3'>
        <MDBCol size="md" md="4">
          <label>Độ tối nền</label>
        </MDBCol>
        <MDBCol size="md" md="8" >
          <MDBRange name={sName('bgOpacity')} defaultValue={sValue('bgOpacity')} onChange={handleChange} step="10" min='0' max="100" type="range" className="form-range" />
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-3'>
        <MDBCol size="md" md="4">
          <label>Tự động reset</label>
        </MDBCol>
        <MDBCol size="md" md="8" className='d-flex gap-3'>
          <MDBRadio name={sName('autoResetEnabled')} label='Bật' value="true" defaultChecked={sValue('autoResetEnabled')} onChange={handleChange} /> 
          <MDBRadio name={sName('autoResetEnabled')} label='Tắt' value="false" defaultChecked={!sValue('autoResetEnabled')} onChange={handleChange} />
        </MDBCol>
      </MDBRow> 
      {sValue('autoResetEnabled') && (
        <MDBRow className='mb-3'>
          <MDBCol size="md" md="4">
            <label>Thời gian tự động reset</label> <small>(phút)</small>
          </MDBCol>
          <MDBCol size="md" md="8">
            <MDBRange name={sName('resetAfterMinute')} defaultValue={sValue('resetAfterMinute')} onChange={handleChange} step="1" min="1" max="100" type="range" className="form-range" />
          </MDBCol>
        </MDBRow>
      )}*/}
    </div>
  )
}
export default memo(App) 