import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updatePegawai } from "../redux/slices";

export default function EditPegawaiModal({ open, setOpen, data }) {
  const dispatch = useDispatch();
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [values, setValues] = useState({
    id: "",
    nama: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    jalan: "",
  });

  if (data.id !== values.id) {
    setValues({
      id: data.id,
    });
  }

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
    const idProvinsi = provinsi.find((item) => item.nama === data.provinsi)?.id;
    getKabupaten(idProvinsi);
  }, [data]);

  const getKabupaten = async (id) => {
    const result = await axios(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    setKabupaten(result.data.kota_kabupaten);
    const idKabupaten = result.data.kota_kabupaten.find(
      (item) => item.nama === data.kabupaten
    )?.id;
    getKecamatan(idKabupaten);
  };

  const getKecamatan = async (id) => {
    const result = await axios(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    setKecamatan(result.data.kecamatan);
    const idKecamatan = result.data.kecamatan.find(
      (item) => item.nama === data.kecamatan
    )?.id;
    getKelurahan(idKecamatan);
  };

  const getKelurahan = async (id) => {
    const result = await axios(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
    );
    setKelurahan(result.data.kelurahan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePegawai(values));
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
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
              Edit Data Pegawai
            </Typography>

            <TextField
              id="outlined-basic"
              label="Nama Lengkap"
              variant="outlined"
              defaultValue={data.nama}
              onChange={(e) => setValues({ ...values, nama: e.target.value })}
              sx={{ width: "100%" }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.provinsi}
              options={provinsi.map((option) => ({
                id: option.id,
                label: option.nama,
              }))}
              isOptionEqualToValue={(option, value) =>
                option.nama === value.nama
              }
              onChange={(e, value) => {
                if (value === null) {
                  setValues({ ...values, provinsi: "" });
                } else {
                  setValues({ ...values, provinsi: value.label });
                  getKabupaten(value.id);
                }
              }}
              sx={{ width: "100%", margin: "10px 0" }}
              renderInput={(params) => (
                <TextField {...params} label="Provinsi" />
              )}
            />

            <Autocomplete
              disablePortal
              disableClearable
              id="combo-box-demo"
              defaultValue={data.kabupaten}
              options={kabupaten.map((option) => ({
                id: option.id,
                label: option.nama,
              }))}
              isOptionEqualToValue={(option, value) =>
                option.nama === value.nama
              }
              onChange={(e, value) => {
                setValues({ ...values, kabupaten: value.label });
                getKecamatan(value.id);
              }}
              sx={{ width: "100%", margin: "10px 0" }}
              renderInput={(params) => (
                <TextField {...params} label="Kota/Kabupaten" />
              )}
            />

            <Autocomplete
              disablePortal
              disableClearable
              id="combo-box-demo"
              defaultValue={data.kecamatan}
              options={kecamatan.map((option) => ({
                id: option.id,
                label: option.nama,
              }))}
              isOptionEqualToValue={(option, value) =>
                option.nama === value.nama
              }
              onChange={(e, value) => {
                setValues({ ...values, kecamatan: value.label });
                getKelurahan(value.id);
              }}
              sx={{ width: "100%", margin: "10px 0" }}
              renderInput={(params) => (
                <TextField {...params} label="Kecamatan" />
              )}
            />

            <Autocomplete
              disablePortal
              disableClearable
              id="combo-box-demo"
              defaultValue={data.kelurahan}
              options={kelurahan.map((option) => ({
                id: option.id,
                label: option.nama,
              }))}
              isOptionEqualToValue={(option, value) =>
                option.nama === value.nama
              }
              onChange={(e, value) => {
                setValues({ ...values, kelurahan: value.label });
              }}
              sx={{ width: "100%", margin: "10px 0" }}
              renderInput={(params) => (
                <TextField {...params} label="Kelurahan" />
              )}
            />

            <TextField
              id="outlined-basic"
              label="Alamat"
              variant="outlined"
              defaultValue={data.jalan}
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
                Simpan
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
