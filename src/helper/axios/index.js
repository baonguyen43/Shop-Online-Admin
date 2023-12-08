

import axios from 'axios';

const axiosAdminMan = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});



export {
  axiosAdminMan
}