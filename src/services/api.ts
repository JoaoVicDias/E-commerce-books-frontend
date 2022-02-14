import axios from "axios";

export default axios.create({
  baseURL: "https://e-commerce-books.herokuapp.com",
  transformRequest: [
    (headers, data) => {
      const token = localStorage.getItem("userToken");

      if (token) {
        headers.authorization = token;
      }

      return data;
    },
  ],
});
