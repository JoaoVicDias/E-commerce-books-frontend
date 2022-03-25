import axios from "axios";

// const baseUrl = "https://e-commerce-books.herokuapp.com"
const baseUrl = "http://localhost:5000"

export const getApi = (param: string) => {
  return `${baseUrl}${param}`
}

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type":"application/json"
  },
  transformRequest: [
    (data, headers:any) => {
      const token = localStorage.getItem("e-commerce-books-user-token");

      if (token) {
        headers.common.Authorization =`Bearer ${token}`;
      }

      return JSON.stringify(data);
    },
  ],
});
