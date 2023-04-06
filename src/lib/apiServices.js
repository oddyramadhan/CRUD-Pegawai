import axios from "./axios";

const getAll = () => {
  return axios.get("/pegawai");
};

const get = (id) => {
  return axios.get(`/pegawai/${id}`);
};

const create = (data) => {
  return axios.post("/pegawai", data);
};

const update = (id, data) => {
  return axios.put(`/pegawai/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/pegawai/${id}`);
};

const Services = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default Services;
