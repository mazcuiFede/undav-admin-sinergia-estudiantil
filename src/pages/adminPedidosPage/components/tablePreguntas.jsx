import * as React from "react"
import PropTypes from "prop-types"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import Avatar from "@mui/material/Avatar"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableFooter from "@mui/material/TableFooter"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import LastPageIcon from "@mui/icons-material/LastPage"
import DeleteIcon from "@mui/icons-material/Delete"

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

export default function TablePreguntas({ dudas, deletePregunta }) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  React.useState(() => {
    debugger
    console.log(dudas)
  }, [])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dudas.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableCell colspan={2}>Usuario</TableCell>
          <TableCell component="th" scope="row">
            T??tulo
          </TableCell>
          <TableCell>Tipo de duda</TableCell>
          <TableCell align="center">Comentarios</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell>Fecha de creaci??n</TableCell>
          <TableCell align="center">Acciones</TableCell>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dudas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : dudas
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Avatar alt={row.user.nombre} src={row.user.avatarUrl} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.user.nombre} {row.user.apellido}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.titulo}
              </TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell align="center">{row.comentarios.length}</TableCell>
              <TableCell>{row.tags}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell align="center">
                <DeleteIcon
                  onClick={() => {
                    deletePregunta(row._id)
                  }}
                />
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={8}
              count={dudas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "Filas por p??gina",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
