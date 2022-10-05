import React, { useState, useEffect, memo } from "react"
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit"
import DataTable, { createTheme } from "react-data-table-component"

createTheme("transparent", {
  background: {
    default: "transparent",
  },
  text: {
    primary: "#ffffff",
  },
  divider: {
    default: "var(--mdb-gray-800)",
  },
})

const getTimeAgo = (t) => {
  const secondsAgo = ((new Date().getTime() - t) / 1000).toFixed()
  const minutesAgo = (secondsAgo / 60).toFixed()
  const hoursAgo = (minutesAgo / 60).toFixed()
  const daysAgo = (hoursAgo / 24).toFixed()
  return secondsAgo < 60
    ? `mới đây`
    : minutesAgo < 60
    ? `${minutesAgo} phút trước`
    : hoursAgo < 24
    ? `${hoursAgo} giờ trước`
    : `${daysAgo} ngày trước`
}

const columns = [
  {
    name: "Thành viên",
    cell: (row) => (
      <>
        <img
          height="30px"
          width="30px"
          className="rounded-circle"
          // onError={window.imageOnError}
          alt={row.username}
          src="/assets/images/default-avatar.webp"
          data-url={row.thumbnailUrl}
          onLoad={window.imageOnLoad}
        />
        <span className="ms-2">{row.username}</span>
      </>
    ),
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Tổng số điểm",
    selector: (row) => row.totalAmount,
    sortable: true,
  },
  {
    name: "Điểm hoạt động",
    selector: (row) => row.totalRewardAmount,
    sortable: true,
  },
  {
    name: "Cập nhật cuối",
    cell: (row) => getTimeAgo(row.updateAt),
    selector: (row) => row.updateAt,
    sortable: true,
  },
]

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
    },
  },
  cells: {
    style: {
      fontSize: ".8rem",
    },
  },
  pagination: {
    style: {
      color: "#ffffff",
      fontSize: ".8rem",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: "#ffffff",
      fill: "#ffffff",

      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: "var(--mdb-gray-800)",
        fill: "var(--mdb-gray-800)",
      },
      "&:hover:not(:disabled)": {
        backgroundColor: "var(--mdb-primary)",
      },
      "&:focus": {
        outline: "none",
        // backgroundColor: 'var(--mdb-primary)',
      },
    },
  },
}

function UserAndPoint({ authData, users }) {
  const totalUser = Object.keys(users).length
  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUsers = async (page) => {
    page = page - 1
    const start = page * perPage
    const end = start + perPage
    const response = Object.values(users).slice(start, end)
    setData(response)
  }

  const handlePageChange = (page) => {
    fetchUsers(page)
    setCurrentPage(page)
  }

  const handlePerRowsChange = (newPerPage, page) => {
    page = page - 1
    const start = page * newPerPage
    const end = start + newPerPage
    const response = Object.values(users).slice(start, end)

    setData(response)
    setPerPage(newPerPage)
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [users])

  useEffect(() => {
    fetchUsers(1)
  }, [])

  return (
    <div className="mb-3 ">
      <h4 className="text-info">Thành viên</h4>
      <p className="mb-0">
        Danh sách thành viên cùng điểm số, level và một số thông tin khác
      </p>
      {authData && (
        <p>
          bạn đang có {totalUser} / tối đa {window.limitTotalUser} thành viên
        </p>
      )}
      <small>
        Lưu ý: dữ liệu thành viên chỉ được lưu cục bộ trên máy của bạn, vì vậy
        bạn nên truy cập trên cùng 1 máy mỗi khi live để giữ liệu thành viên
        được đồng bộ.
      </small>
      {!authData ? (
        <></>
      ) : (
        <div className="p-3">
          <div className="mb-3">
            <MDBRow>
              <MDBCol size="sm" md="4" lg="3" xl="2"></MDBCol>
              <MDBCol size="sm" md="5" lg="4" xl="3"></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBCard background="dark" className="text-white">
                  <MDBCardBody>
                    <DataTable
                      columns={columns}
                      data={data}
                      // progressPending={loading}
                      pagination
                      paginationServer
                      paginationTotalRows={totalUser}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      // sortFunction={customSort}
                      theme="transparent"
                      paginationComponentOptions={{
                        noRowsPerPage: false,
                      }}
                      customStyles={customStyles}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      )}
    </div>
  )
}
export default memo(UserAndPoint)
