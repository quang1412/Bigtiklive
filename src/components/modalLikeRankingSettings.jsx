import React, { memo } from "react"
import {
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBRange,
  MDBRadio,
} from "mdb-react-ui-kit"

function App(props) {
  const { settings, handleChange } = props
  const sName = (shortName) => `widget_likeranking_${shortName}`
  const sValue = (shortName) => settings[`widget_likeranking_${shortName}`]
  return (
    <div className=" ">
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Tiêu đề</label>
        </MDBCol>
        <MDBCol size="md" md="8">
          <input
            type="text"
            name={sName("title")}
            defaultValue={sValue("title")}
            onChange={handleChange}
            className="form-control"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Màu tiêu đề</label>
        </MDBCol>
        <MDBCol size="md" md="8" className="d-flex align-items-center">
          <input
            name={sName("titleColor")}
            defaultValue={sValue("titleColor")}
            onInput={handleChange}
            type="color"
            className="form-control form-control-color border-0 px-0"
          />
          <span className="ms-2">{sValue("titleColor")}</span>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Màu chữ</label>
        </MDBCol>
        <MDBCol size="md" md="8" className="d-flex align-items-center">
          <input
            name={sName("textColor")}
            defaultValue={sValue("textColor")}
            onInput={handleChange}
            type="color"
            className="form-control form-control-color border-0 px-0"
          />
          <span className="ms-2">{sValue("textColor")}</span>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Màu cột giá trị</label>
        </MDBCol>
        <MDBCol size="md" md="8" className="d-flex align-items-center">
          <input
            name={sName("barBgColor")}
            defaultValue={sValue("barBgColor")}
            onInput={handleChange}
            type="color"
            className="form-control form-control-color border-0 px-0"
          />
          <span className="ms-2">{sValue("barBgColor")}</span>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Màu giá trị</label>
        </MDBCol>
        <MDBCol size="md" md="8" className="d-flex align-items-center">
          <input
            name={sName("barColor")}
            defaultValue={sValue("barColor")}
            onInput={handleChange}
            type="color"
            className="form-control form-control-color border-0 px-0"
          />
          <span className="ms-2">{sValue("barColor")}</span>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Url hình nền</label>
        </MDBCol>
        <MDBCol size="md" md="8" className="d-flex align-items-center">
          <MDBCheckbox
            name={sName("bgImageEnabled")}
            defaultChecked={sValue("bgImageEnabled")}
            onChange={handleChange}
          />
          <input
            type="text"
            name={sName("bgImageUrl")}
            defaultValue={sValue("bgImageUrl")}
            onChange={handleChange}
            className="form-control"
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Độ tối nền</label>
        </MDBCol>
        <MDBCol size="md" md="8">
          <MDBRange
            name={sName("bgOpacity")}
            defaultValue={sValue("bgOpacity")}
            onChange={handleChange}
            step="10"
            min="0"
            max="100"
            type="range"
            className="form-range"
          />
          {/* <input type="number" name={sName('bgOpacity')} defaultValue={sValue('bgOpacity')} onChange={handleChange} className="form-control" step="10" min='0' /> */}
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        <MDBCol size="md" md="4">
          <label>Tự động reset</label>
        </MDBCol>
        <MDBCol size="md" md="8" className="d-flex gap-3">
          <MDBRadio
            name={sName("autoResetEnabled")}
            label="Bật"
            value="true"
            defaultChecked={sValue("autoResetEnabled")}
            onChange={handleChange}
          />
          <MDBRadio
            name={sName("autoResetEnabled")}
            label="Tắt"
            value="false"
            defaultChecked={!sValue("autoResetEnabled")}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      {sValue("autoResetEnabled") && (
        <MDBRow className="mb-3">
          <MDBCol size="md" md="4">
            <label>Thời gian tự động reset</label> <small>(phút)</small>
          </MDBCol>
          <MDBCol size="md" md="8">
            <MDBRange
              name={sName("resetAfterMinute")}
              defaultValue={sValue("resetAfterMinute")}
              onChange={handleChange}
              step="1"
              min="1"
              max="100"
              type="range"
              className="form-range"
            />
          </MDBCol>
        </MDBRow>
      )}
    </div>
  )
}
export default memo(App)
