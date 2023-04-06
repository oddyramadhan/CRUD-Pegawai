import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, CircularProgress, Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { retrievePegawai, deletePegawai } from "../redux/slices";
import EditPegawaiModal from "./EditPegawaiModal";

function DataTable() {
  const dispatch = useDispatch();
  const pegawai = useSelector((state) => state.pegawai);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(retrievePegawai());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deletePegawai(id));
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nama", headerName: "Nama", width: 180 },
    { field: "provinsi", headerName: "Provinsi", width: 150 },
    { field: "kabupaten", headerName: "Kota/Kabupaten", width: 180 },
    { field: "kecamatan", headerName: "Kecamatan", width: 150 },
    { field: "kelurahan", headerName: "Kelurahan", width: 150 },
    { field: "jalan", headerName: "Alamat", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (item) => (
        <div>
          <IconButton
            aria-label="edit"
            sx={{ background: "#ffff00", mr: "5px" }}
            onClick={() => {
              setOpen(true);
              setData(item.row);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ background: "#F44336" }}
            onClick={() => handleDelete(item.row.id)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <EditPegawaiModal
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
      />
      <div style={{ height: 500, width: "100%" }}>
        {pegawai.loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid rows={pegawai.data} columns={columns} pageSize={5} />
        )}
      </div>
    </>
  );
}

export default DataTable;
