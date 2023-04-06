import React, { useState } from "react";
import DataTable from "./components/DataTable";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddPegawaiModal from "./components/AddPegawaiModal";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddPegawaiModal open={open} setOpen={setOpen} />
      <div style={{ height: "auto", width: "85%", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <p style={{ fontFamily: "Times-Bold", fontSize: "30px", margin: 0 }}>
            Data Pegawai
          </p>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpen(true)}
          >
            Tambah Pegawai
          </Button>
        </div>
        <DataTable />
      </div>
    </>
  );
}

export default App;
