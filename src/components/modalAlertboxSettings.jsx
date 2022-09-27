import React, { useState, memo } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCollapse,
  MDBInputGroup,
  MDBRange,
} from 'mdb-react-ui-kit';
const introAnimate = ["fade In", "fade In Down", "fade In Down Big", "fade In Left", "fade In Left Big", "fade In Right", "fade In Right Big", "fade In Up", "fade In Up Big", "fade In Top Left", "fade In Top Right", "fade In Bottom Left", "fade In Bottom Right", "back In Down", "back In Left", "back In Right", "back In Up", "bounce In", "bounce In Down", "bounce In Left", "bounce In Right", "bounce In Up", "flip In X", "flip In Y", "light Speed In Right", "light Speed In Left", "rotate In", "rotate In Down Left", "rotate In Down Right", "rotate In Up Left", "rotate In Up Right", "roll In", "zoom In", "zoom In Down", "zoom In Left", "zoom In Right", "zoom In Up", "slide In Down", "slide In Left", "slide In Right", "slide In Up"];
const outroAnimate = ["fade Out", "fade Out Down", "fade Out Down Big", "fade Out Left", "fade Out Left Big", "fade Out Right", "fade Out Right Big", "fade Out Up", "fade Out Up Big", "fade Out Top Left", "fade Out Top Right", "fade Out Bottom Right", "fade Out Bottom Left", "back Out Down", "back Out Left", "back Out Right", "back Out Up", "bounce Out", "bounce Out Down", "bounce Out Left", "bounce Out Right", "bounce Out Up", "flip Out X", "flip Out Y", "light Speed Out Right", "light Speed Out Left", "rotate Out", "rotate Out Down Left", "rotate Out Down Right", "rotate Out Up Left", "rotate Out Up Right", "roll Out", "zoom Out", "zoom Out Down", "zoom Out Left", "zoom Out Right", "zoom Out Up", "slide Out Down", "slide Out Left", "slide Out Right", "slide Out Up"];

const textPlaceholder = {
  gift: '{username} tặng {giftcount} {giftname}',
  follow: '{username} đã theo dõi',
  share: '{username} đã chia sẻ live',
  like: '{username} đã thả {likecount} tim'
}
const keysCommand = {
  gift: '{nickname} / {username} / {giftname} / {giftcount} / {amount}',
  follow: '{nickname} / {username}',
  share: '{nickname} / {username}',
  like: '{nickname} / {username} / {likecount}'
}

function AlertboxOpts(props) {
  const { settings, handleChange } = props;
  const [tabActive, setTabActive] = useState('tab-general');
  const [showShow, setShowShow] = useState({ gift: false, like: false, follow: false, share: false });

  const handleTabChange = (value = 'tab-general') => {
    value !== tabActive && setTabActive(value);
  };

  return (
    <div className=" ">
      <MDBTabs fill className='mb-3'>
        {['general', 'like', 'share', 'follow', 'gift'].map((type, index) => (
          <MDBTabsItem key={index} className="flex-nowrap">
            <MDBTabsLink onClick={() => handleTabChange(`tab-${type}`)} active={tabActive === `tab-${type}`} color="dark" className={'mb-1 text-nowrap text-light' + (tabActive !== `tab-${type}` && ' border-bottom border-muted')}>
              {type.replace('general', 'chung').replace('gift', 'quà tặng').replace('like', 'lượt thích')
                .replace('share', 'chia sẻ').replace('follow', 'theo dõi').toUpperCase()}
            </MDBTabsLink>
          </MDBTabsItem>
        ))}
      </MDBTabs>
      <MDBTabsContent className="text-start pt-5">
        <MDBTabsPane show={tabActive === 'tab-general'}>
          <form name="general">
            <div className="row mb-3">
              <div className="col-4">
                <label className="text-light form-label mb-0">Độ chễ thông báo</label>
              </div>
              <div className="col-8">
                <div className="range">
                  <MDBRange name="widget_alertbox_general_alertdelay" defaultValue={settings.widget_alertbox_general_alertdelay} onChange={handleChange} type="range" className="form-range" min="1" max="30" step="1" />
                </div>
              </div>
            </div> 
            <div className="row mb-3">
              <div className="col-4">
                <label className="text-light form-label mb-0">Thông báo liên tục</label>
              </div>
              <div className="col-8">
                <div className="form-check d-inline-block">
                  <input name="widget_alertbox_general_alertparries" defaultValue="true" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={settings.widget_alertbox_general_alertparries} />
                  <label className="text-light form-check-label">Bật</label>
                </div>
                <div className="form-check d-inline-block ms-3">
                  <input name="widget_alertbox_general_alertparries" defaultValue="false" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={!settings.widget_alertbox_general_alertparries} />
                  <label className="text-light form-check-label">Tắt</label>
                </div>
              </div>
            </div>
            {settings.widget_alertbox_general_alertparries &&
              <div className="row mb-3 parry_alert_delay d-flex">
                <div className="col-4">
                  <label className="text-light form-label mb-0">Thời lượng thông báo</label>
                </div>
                <div className="col-8">
                  <div className="range">
                    <MDBRange name="widget_alertbox_general_parryalertdelay" defaultValue={settings.widget_alertbox_general_parryalertdelay} onChange={handleChange} type="range" className="form-range" min="2" max="20" step="1" />
                  </div>
                </div>
              </div>
            }
            {/* <div className="row mt-5 mb-3 parry_alert_delay d-flex">
              <div className="col-4">
                <label className="text-light form-label mb-0">Đặt lại mặc định:</label>
              </div>
              <div className="col-8">
                <div className="range">
                  <MDBBtn tag="a" color='danger' onClick={() => window.alert('reset setting')}>Đặt lại mặc định</MDBBtn>
                </div>
              </div>
            </div> */}
          </form>
        </MDBTabsPane>
        {['gift', 'like', 'share', 'follow'].map((type, index) => {
          const sName = (shortName) => `widget_alertbox_${type}_${shortName}`;
          const sValue = (shortName) => settings[`widget_alertbox_${type}_${shortName}`];
          const toggleShow = () => {
            setShowShow(current => ({ ...current, [type]: !showShow[type] }))
          }
          return (
            <MDBTabsPane key={index} show={tabActive === `tab-${type}`}>
              <form name={type}>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Kích hoạt</label>
                  </div>
                  <div className="col-8">
                    <div className="form-check form-check-inline">
                      <input name={sName('active')} defaultValue="true" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={sValue('active')} />
                      <label className="text-light form-check-label">Bật</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input name={sName('active')} defaultValue="false" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={!sValue('active')} />
                      <label className="text-light form-check-label">Tắt</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Bố cục</label>
                  </div>
                  <div className="col-8">
                    <div className="form-check form-check-inline">
                      <input name={sName('layout')} defaultValue="above" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={sValue('layout') === "above"} />
                      <label className="text-light form-check-label">Trên dưới</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input name={sName('layout')} defaultValue="banner" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={sValue('layout') === "banner"} />
                      <label className="text-light form-check-label">Trung tâm</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input name={sName('layout')} defaultValue="side" onChange={handleChange} className="form-check-input" type="radio" defaultChecked={sValue('layout') === "side"} />
                      <label className="text-light form-check-label">Hai bên</label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Hiệu ứng</label>
                  </div>
                  <div className="col-8 d-flex">
                    <select name={sName('alertanimationin')} defaultValue={sValue('alertanimationin')} onChange={handleChange} className="form-select me-1 ">{
                      introAnimate.map((name, index) => {
                        return (<option key={`in${index}`} value={name.replaceAll(' ', '')}>{name}</option>)
                      })
                    }</select>
                    <select name={sName('alertanimationout')} defaultValue={sValue('alertanimationout')} onChange={handleChange} className="form-select ms-1 ">{
                      outroAnimate.map((name, index) => {
                        return (<option key={`out${index}`} value={name.replaceAll(" ", "")}>{name}</option>)
                      })
                    }</select>
                  </div>
                </div>
                {type === "gift" && (
                  <div className="row mb-3">
                    <div className="col-4">
                      <label className="text-light form-label mb-0">Min. donate</label>
                    </div>
                    <div className="col-8">
                      <div className="input-group w-50">
                        <input name={sName('alertminamount')} min='1' type='number' defaultValue={sValue('alertminamount')} onChange={handleChange} className="form-control " placeholder="1" />
                      </div>
                    </div>
                  </div>)}
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Mẫu lời nhắn</label>
                  </div>
                  <div className="col-8">
                    <div className="input-group">
                      <input name={sName('messagetemplate')} defaultValue={sValue('messagetemplate')}
                        onChange={handleChange} type="text" className="form-control " placeholder={textPlaceholder[type]} />
                    </div>
                    <small style={{opacity:'30%'}}>Từ khoá: {keysCommand[type]}</small>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Hiệu ứng chữ</label>
                  </div>
                  <div className="col-8 d-sm-flex align-items-center text-end">

                    <select name={sName('textanimation')} defaultValue={sValue('textanimation')} onChange={handleChange} className="form-select me-2 ">
                      <option value='wiggle'>Wiggle</option>
                      <option value="wave">Wave</option>
                      <option value="wobble">Wobble</option>
                      <option value="rubberband">Rubberband</option>
                      <option value="bounce">Bounce</option>
                      <option value="tada">Tada</option>
                    </select>

                    <div className="fw-bold text-nowrap text-info">
                      <span className={`animated-letter ${sValue('textanimation')}`}>S</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>A</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>M</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>P</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>L</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>E</span>
                      <span> </span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>T</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>E</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>X</span>
                      <span className={`animated-letter ${sValue('textanimation')}`}>T</span>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Hình ảnh</label>
                  </div>
                  <div className="col-8">
                    <div className="input-group">
                      <span className="input-group-text p-0" style={{ "backgroundImage": `url(${sValue('imageurl')})`, "backgroundSize": "contain", "backgroundPosition": "center", "backgroundRepeat": "no-repeat" }}><div style={{ "width": "3rem", "height": "100%" }}></div></span>
                      <input name={sName('imageurl')} defaultValue={sValue('imageurl')} onChange={handleChange} type="text" className="form-control " placeholder="Image URL" />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Âm thanh</label>
                  </div>
                  <div className="col-8">
                    <div className="input-group">
                      <span className="input-group-text text-light p-0"><div className="d-flex justify-content-center align-items-center" style={{ "width": "3rem", "height": "100%" }}><i className="fas fa-music mauto" aria-hidden="true"></i></div></span>
                      <input name={sName('soundurl')} defaultValue={sValue('soundurl')} onChange={handleChange} type="text" className="form-control " placeholder="Sound URL" />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Âm lượng</label>
                  </div>
                  <div className="col-8">
                    <div className="range">
                      <MDBRange name={sName('soundvolume')} defaultValue={sValue('soundvolume')} onChange={handleChange} type="range" className="form-range" min="0" max="100" step="1" data-before="1" data-before-subfix="%" />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Thời lượng</label>
                  </div>
                  <div className="col-8">
                    <div className="range">
                      <MDBRange name={sName('alertduration')} defaultValue={sValue('alertduration')} onChange={handleChange} type="range" className="form-range" min="2" max="300" step="1" data-before="1" data-before-subfix="s" />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label className="text-light form-label mb-0">Độ chễ hiển thị chữ</label>
                  </div>
                  <div className="col-8">
                    <div className="range">
                      <MDBRange name={sName('alerttextdelay')} defaultValue={sValue('alerttextdelay')} onChange={handleChange} type="range" className="form-range" min="0" max="60" step="1" data-before="1" data-before-subfix="s" />
                    </div>
                  </div>
                </div>
                <div className="card card-body p-3 bg-dark border border-muted">
                  <a className='text-info' onClick={toggleShow} href='#widgets' role="button">
                    <i className="fas fa-plus-square me-1"></i> Tuỳ chỉnh chữ
                  </a>
                  <MDBCollapse show={showShow[type]}>
                    <p></p>
                    <div className="row mb-3">
                      <div className="col-4">
                        <label className="text-light form-label mb-0">Cỡ chữ</label>
                      </div>
                      <div className="col-8">
                        <div className="range">
                          <MDBRange name={sName('fontsize')} defaultValue={sValue('fontsize')} onChange={handleChange} type="range" className="form-range" min="12" max="80" step="2" data-before="1" data-before-subfix="" />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4">
                        <label className="text-light form-label mb-0">Độ đậm phông chữ</label>
                      </div>
                      <div className="col-8">
                        <div className="range">
                          <MDBRange name={sName('fontweight')} defaultValue={sValue('fontweight')} onChange={handleChange} type="range" className="form-range" min="300" max="900" step="100" data-before="1" data-before-subfix="" />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4">
                        <label className="text-light form-label mb-0">Màu chữ</label>
                      </div>
                      <div className="col-8">
                        <MDBInputGroup noBorder textBefore={
                          <input name={sName('textcolor')} defaultValue={sValue('textcolor')} onChange={handleChange} type="color" className="form-control form-control-color bg-dark border-0" />
                        }
                          className='mb-3'>
                          <input value={sValue('textcolor')} className='form-control rounded' type='text' disabled />
                        </MDBInputGroup>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-4">
                        <label className="text-light form-label mb-0">Màu chữ nổi bật</label>
                      </div>
                      <div className="col-8">
                        <MDBInputGroup noBorder textBefore={
                          <input name={sName('texthighlightcolor')} defaultValue={sValue('texthighlightcolor')} onInput={handleChange} type="color" className="form-control form-control-color bg-dark border-0" />
                        }
                          className='mb-3'>
                          <input value={sValue('texthighlightcolor')} className='form-control rounded' type='text' disabled />
                        </MDBInputGroup>
                      </div>
                    </div>
                  </MDBCollapse>
                </div><br />
              </form>
            </MDBTabsPane>
          )
        })}
      </MDBTabsContent>
    </div>
  )
}
export default memo(AlertboxOpts)



  // async function handleOptionsChange(e) {
  //   let target = e.target;
  //   let type = target.type;
  //   let optType = target.closest("form").name;
  //   let optName = target.name;
  //   var value = target.value;

  //   switch (type) {
  //     case 'number':
  //       value = parseInt(value.replace('e', '') || options[optType][optName]);
  //       target.value = value;
  //       break;
  //     case 'range':
  //       value = parseInt(value);
  //       break;
  //     case 'radio':
  //       (value === "true" || value === "false") && (value = (value === 'true'));
  //       break;
  //     default:
  //       break;
  //   }

  //   switch (optName) {
  //     case "image_url":
  //       if (!await checkImage(value)) {
  //         target.value = options[optType][optName];
  //         return;
  //       }
  //       break;
  //     case "sound_url":
  //       if (!await checkAudio(value)) {
  //         target.value = options[optType][optName];
  //         return;
  //       }
  //       break;
  //     case "text_color":
  //       if (!colorValid(value)) {
  //         // target.value = options[optType][optName];
  //         value = "#000000";
  //         // return;
  //       }
  //       break;
  //     case "text_highlight_color":
  //       if (!colorValid(value)) {
  //         // target.value = options[optType][optName];
  //         value = "#000000";
  //         // return;
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   options[optType][optName] = value;
  //   // props.onChangeOptions(options);
  // }

  // async function checkImage(url) {
  //   return new Promise((resolve) => {
  //     var image = new Image();
  //     image.addEventListener('load', () => resolve(true));
  //     image.addEventListener('error', () => resolve(false));
  //     image.src = url;
  //   });
  // }

  // async function checkAudio(url) {
  //   return new Promise((resolve) => {
  //     var audio = new Audio();
  //     audio.addEventListener('load', () => resolve(true));
  //     audio.addEventListener('error', () => resolve(false));
  //     audio.src = url;
  //   });
  // }

  // function colorValid(code) {
  //   return (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(code));
  // }
