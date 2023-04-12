import axios from "axios";
import queryString from "query-string";
const API_URL = "https://bshopbe.onrender.com/api";
// const API_URL = "http://localhost:4000/api";
const getQueryString = (query) => {
  const result = queryString.stringify(query);

  if (!result) return "";
  return `?${result}`;
};

function send({
  method = "get",
  path,
  data = null,
  query = null,
  headers = {},
  newUrl,
  token,
}) {
  return new Promise((resolve) => {
    let url = `${API_URL}${path}${getQueryString(query)}`;

    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`;
    }
    const dataString = window.localStorage.getItem("token");
    if (dataString) {
      const newData = JSON.parse(dataString || "{}");
      headers.authorization = `Bearer ${token ? token : newData}`;
    } else {
      headers.authorization = `Bearer ${token}`;
    }

    axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    })
      .then((result) => {
        const data = result.data;
        return resolve(data);
      })
      .catch((error) => {
        const { response = {} } = error;

        const result = response.data ? response.data : null;

        if (!result) {
        } else {
          const { message: data } = result;

          if (response.status === 401 || data === 403) {
            window.localStorage.removeItem("user_data");
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          } else if (response.status === 505) {
            window.localStorage.removeItem("user_data");
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          } else {
            return resolve(result);
          }
        }
      });
  });
}

export default {
  send,
};
