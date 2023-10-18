import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import axios from "axios";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "./Pagination";
import { useMediaQuery } from "@mui/material";

// function for the selectAll checkbox
function EnhancedTableSelectAll(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableCell className="select-all" style={{ paddingLeft: "0.25rem" }}>
      <Tooltip
        title={
          rowCount > 0 && numSelected === rowCount
            ? "Deselect all"
            : "Select all"
        }
      >
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all names",
            name: "select all names",
          }}
        />
      </Tooltip>
    </TableCell>
  );
}

EnhancedTableSelectAll.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AdminUi() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selected, setSelected] = useState([]);
  let [edit, setEdit] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  let { enqueueSnackbar } = useSnackbar();
  const isScreenWideEnough = useMediaQuery("(min-width: 22.1875rem)");
  let loadData = () => {
    setLoading(true);
    let res = axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((resData) => {
        setData(resData.data);
      })
      .catch((err) => {
        console.log("error");
        enqueueSnackbar("Something went wrong, Please try again", {
          variant: "error",
        });
      });
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log("dataArray", data);

  let createData = (id, name, email, role) => {
    return { id, name, email, role };
  };

  let rows = data.map((val) => {
    return createData(val.id, val.name, val.email, val.role);
  });

  console.log("rows", rows);

  // function for handling selectAll checkbox
  const handleSelectAllClick = (event) => {
    // if selectAll checkbox is checked
    if (event.target.checked) {
      const newSelected = displayedRows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  // function for handling individual checkbox
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];
    // if name not present in the selected array
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    }
    // if one name is present is the selected array, and you remove it or, if all names are prsent and you remove the first one
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    }
    // if more than one name is present in the selected array, and you remove one
    else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    }
    // if all names are present in the selected array, and you remove any one except the first one
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  console.log("selectedArray", selected);

  if (search !== "") {
    rows = data.filter(
      (obj) =>
        obj.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        obj.email.toLowerCase().includes(search.trim().toLowerCase()) ||
        obj.role.toLowerCase().includes(search.trim().toLowerCase())
    );
    if (search !== "" && rows.length === 0) {
      setTimeout(() => {
        enqueueSnackbar("No matching results found", { variant: "warning" });
      }, 700);
    }
  }

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = rows.slice(startIndex, endIndex);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const emptyRows =
    page === totalPages
      ? rowsPerPage -
        Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage)
      : 0;
  const editTooltipTitle = (name) => {
    if (!isSelected(name)) {
      return "Select the row to enable";
    } else {
      return "Edit";
    }
  };
  const deleteTooltipTitle = (name) => {
    if (!isSelected(name)) {
      return "Select the row to enable";
    } else {
      return "Delete";
    }
  };
  let validateEdit = (obj) => {
    return Object.values(obj).every((val) => ![""].includes(val));
  };
  // Function to check if the screen width is greater than or equal to 355px
  // Convert the px value to rem value first then write
  // const isWideEnough = () => {
  //   return window.innerWidth >= 22.1875 * 16;
  // };

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              border: "0.125rem solid #000",
              boxShadow: 24,
              p: 5,
            }}
          >
            <TextField
              sx={{ margin: "0.125rem" }}
              value={edit.name}
              onChange={(e) => {
                setEdit({ ...edit, name: e.target.value });
                // console.log("edited name",e.target.value)
              }}
              // placeholder = "Name"
              inputProps={{
                placeholder: "Name",
              }}
            />
            <TextField
              sx={{ margin: "0.125rem" }}
              value={edit.email}
              onChange={(e) => {
                setEdit({ ...edit, email: e.target.value });
                // console.log("edited email",e.target.value)
              }}
              // placeholder = "Email"
              inputProps={{
                placeholder: "Email",
              }}
            />
            <TextField
              sx={{ margin: "0.125rem" }}
              value={edit.role}
              onChange={(e) => {
                setEdit({ ...edit, role: e.target.value });
                // console.log("edited role",e.target.value)
              }}
              // placeholder = "Role"
              inputProps={{
                placeholder: "Role",
              }}
            />
            <Tooltip title="Update entries in row">
              <Button
                style={{ margin: "0.25rem", color: "#2e7d32" }}
                variant="outlined"
                className="update-button"
                color="success"
                onClick={() => {
                  if (!validateEdit(edit)) {
                    enqueueSnackbar(
                      "Row can't have blank entries, Please specify value(s)",
                      { variant: "error" }
                    );
                  } else {
                    console.log("edited row", edit);
                    let temp = data.map((obj) => {
                      if (obj.id === edit.id) {
                        return edit;
                      } else {
                        return obj;
                      }
                    });
                    setData(temp);
                    // setSearch("");
                    handleClose();
                    enqueueSnackbar("Selected row edited successfully", {
                      variant: "success",
                    });
                  }
                }}
              >
                Update
              </Button>
            </Tooltip>
          </Box>
        </Modal>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "skyblue" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ marginTop: "1rem", textAlign: "center" }}
          >
            Admin UI
          </Typography>
        </AppBar>
      </Box>
      <TextField
        className="searchBox"
        sx={{ m: 3, minWidth: "85%" }}
        id="outlined-read-only-input"
        label="Search by Name, Email or Role"
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        InputProps={{
          endAdornment: isScreenWideEnough ? (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ) : null,
        }}

        // InputProps={{
        //   endAdornment: isWideEnough() ? (
        //     <InputAdornment position="end">
        //       <SearchIcon />
        //     </InputAdornment>
        //   ) : null,
        // }}
      />
      {loading === true ? (
        <div className="loading">
          <CircularProgress />
          <h5>Loading Data...</h5>
        </div>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="tableTitle">
                <TableHead>
                  <TableRow>
                    <EnhancedTableSelectAll
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={displayedRows.length}
                    />
                    {/* <TableCell
                      className="select-all"
                      style={{ paddingLeft: "0.25rem" }}
                    >
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < displayedRows.length
                        }
                        checked={
                          displayedRows.length > 0 &&
                          selected.length === displayedRows.length
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{
                          "aria-label": "select all names",
                          name: "select all names",
                        }}
                      />
                    </TableCell> */}
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Email
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Role
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => {
                   */}
                  {displayedRows.map((row) => {
                    let isItemSelected = isSelected(row.name);

                    let labelId = `enhanced-table-checkbox-${row.id}`;
                    return (
                      <TableRow
                        // key={row.name}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{
                          cursor: "pointer",
                          "&:nth-of-type(odd)": {
                            background: "#faf9f6",
                          },
                        }}
                        // className={isItemSelected === true && "selected"}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                              id: labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" id={labelId}>
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.role}</TableCell>
                        <TableCell align="center">
                          <Tooltip title={editTooltipTitle(row.name)}>
                            <button
                              disabled={
                                // enable the edit button if something is selected
                                !isItemSelected
                                  ? // disable the edit button if more than one row is selected
                                    // || selected.length>1

                                    true
                                  : false
                              }
                              style={{ marginRight: 2, cursor: "pointer" }}
                              onClick={(e) => {
                                console.log("row to be edited", row);
                                setEdit(row);
                                handleOpen();
                                // e.stopPropagation();
                              }}
                            >
                              <BorderColorOutlinedIcon />
                            </button>
                          </Tooltip>
                          <Tooltip title={deleteTooltipTitle(row.name)}>
                            <button
                              disabled={
                                // enable the delete button if something is selected
                                !isItemSelected
                                  ? // disable the delete button if more than one row is selected
                                    // || selected.length>1

                                    true
                                  : false
                              }
                              style={{ marginLeft: 2, cursor: "pointer" }}
                              onClick={(e) => {
                                console.log("row to be deleted", row);
                                // rows.splice(rows.indexOf(row), 1);
                                // console.log("after deleting selected row", rows);
                                let temp = data.filter(
                                  (obj) => obj.id !== row.id
                                );
                                console.log(
                                  "after deleting selected row",
                                  temp
                                );
                                // e.stopPropagation();
                                // setData(rows);
                                setData(temp);
                                // setSearch("");
                                enqueueSnackbar(
                                  "Selected row deleted successfully",
                                  {
                                    variant: "success",
                                  }
                                );
                              }}
                            >
                              <DeleteOutlineOutlinedIcon />
                            </button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{ height: 66 * emptyRows, background: "#fff5ee" }}
                    >
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                  {displayedRows.length === 0 && (
                    <TableRow
                      style={{
                        height: 66 * rowsPerPage,
                        background: "#fff5ee",
                      }}
                    >
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
      <br />

      {
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          {
            // show the delete selected button if something is selected
            selected.length > 0 && (
              // show the delete selected button if more than one row is selected
              // selected.length>1 && (

              <Button
                variant="outlined"
                color="error"
                className="delete-multiple"
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "#d32f2f" }}
                >
                  {selected.length} selected
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={(e) => {
                      let temp = data.filter(
                        (obj) => !selected.includes(obj.name)
                      );
                      setData(temp);
                      enqueueSnackbar("Selected row(s) deleted successfully", {
                        variant: "success",
                      });
                      setSelected([]);
                      // e.stopPropagation()
                      setSearch("");
                    }}
                  >
                    <DeleteIcon sx={{ color: "#d32f2f" }} />
                  </IconButton>
                </Tooltip>
              </Button>
            )
          }
        </Toolbar>
      }
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <Footer />
    </>
  );
}
