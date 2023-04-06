import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createPegawai } from "../redux/slices";

export default function AddPegawaiModal({ open, setOpen }) {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [values, setValues] = useState({
    nama: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    jalan: "",
  });
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
      );
      setProvinsi(result.data.provinsi);
    };
    fetchData();
  }, []);

  const getKabupaten = async (id) => {
    const result = await axios(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    setKabupaten(result.data.kota_kabupaten);
  };

  const getKecamatan = async (id) => {
    const result = await axios(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    setKecamatan(result.data.kecamatan);
  };

  const getKelurahan = async (id) => {
    const result = await axios(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
    );
    setKelurahan(result.data.kelurahan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPegawai(values));
    setOpen(false);
    setKabupaten([]);
    setKecamatan([]);
    setKelurahan([]);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
          setKabupaten([]);
          setKecamatan([]);
          setKelurahan([]);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h1"
              sx={{ my: 2 }}
            >
              Tambah Pegawai
            </Typography>

            <TextField
              id="outlined-basic"
              label="Nama Lengkap"
              variant="outlined"
              onChange={(e) => setValues({ ...values, nama: e.target.value })}
              sx={{ width: "100%" }}
            />
            <Autocomplete
              disableClearable
              disablePortal
              id="combo-box-demo"
              options={provinsi.map((option) => ({
                id: option.id,
                label: option.nama,
              }))}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                setValues({ ...values, provinsi: value.label });
                getKabupaten(value.id);
              }}
              sx={{ width: "100%", margin: "10px 0" }}
              renderInput={(params) => (
                <TextField {...params} label="Provinsi" />
              )}
            />
            <TextField
              id="outlined-basic"
              select
              label="Kota/Kabupaten"
              variant="outlined"
              defaultValue=""
              onChange={(e, value) => {
                setValues({ ...values, kabupaten: e.target.value.nama });
                getKecamatan(e.target.value.id);
              }}
              sx={{ width: "100%" }}
            >
              {kabupaten.map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option.nama}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              select
              label="Kecamatan"
              variant="outlined"
              defaultValue=""
              onChange={(e) => {
                setValues({ ...values, kecamatan: e.target.value.nama });
                getKelurahan(e.target.value.id);
              }}
              sx={{ width: "100%", marginTop: "10px" }}
            >
              {kecamatan.map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option.nama}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              select
              label="Kelurahan"
              variant="outlined"
              defaultValue=""
              onChange={(e) => {
                setValues({ ...values, kelurahan: e.target.value });
              }}
              sx={{ width: "100%", marginTop: "10px" }}
            >
              {kelurahan.map((option) => (
                <MenuItem key={option.id} value={option.nama}>
                  {option.nama}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-basic"
              label="Alamat"
              variant="outlined"
              sx={{ width: "100%", marginTop: "10px" }}
              onChange={(e) => {
                setValues({ ...values, jalan: e.target.value });
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Tambah
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
