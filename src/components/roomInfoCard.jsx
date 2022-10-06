import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit"

const RoomInfoCard = ({ info, className }) => {
  const { isConnected, roomInfo } = info
  const avatarUrl =
    roomInfo?.owner?.avatar_thumb?.url_list[0] || window.defaultAvatar
  const display_id = roomInfo?.owner?.display_id || "tiktok"
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
        <MDBDropdownItem
          link
          onClick={() => window.open("https://tiktok.com/@" + display_id)}
        >
          Xem hồ sơ
        </MDBDropdownItem>
        <MDBDropdownItem
          link
          className={!isConnected && "d-none"}
          onClick={() => window.open(`https://tiktok.com/@${display_id}/live`)}
        >
          Xem livestream
        </MDBDropdownItem>
        <MDBDropdownItem className="p-1" />
      </MDBDropdownMenu>
    </MDBDropdown>
  )
}
export default RoomInfoCard
