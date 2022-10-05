import "./style.scss"
export default function startScreen(props) {
  const { title, text } = props
  const isError = props.title === "Xảy ra lỗi"

  return (
    <>
      <div className={isError ? "loader stop" : "loader"}>
        <ul className="hexagon-container">
          <li className="hexagon hex_1"></li>
          <li className="hexagon hex_2"></li>
          <li className="hexagon hex_3"></li>
          <li className="hexagon hex_4"></li>
          <li className="hexagon hex_5"></li>
          <li className="hexagon hex_6"></li>
          <li className="hexagon hex_7"></li>
        </ul>
        <div
          className="fs-6 text-center"
          style={{ width: "500px", marginTop: "170px", marginLeft: "-170px" }}
        >
          <h5 className="mb-0 text-info">{title}</h5>
          <small>{text}</small>
        </div>
      </div>
    </>
  )
}
