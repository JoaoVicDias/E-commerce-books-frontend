import axios from "axios";

const baseUrl = "https://e-commerce-books.herokuapp.com"
// const baseUrl = "http://localhost:5000"

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type":"application/json"
  },
  transformRequest: [
    (data, headers:any) => {
      const token = localStorage.getItem("userToken");

      if (token) {
        headers.common.Authorization = token;
      }

      return JSON.stringify(data);
    },
  ],
});
