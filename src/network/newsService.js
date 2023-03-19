import Request from "./request";

export const NewsService = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/news/get-all",
        method: "GET",
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
  delete: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/news/${id}`,
        method: "DELETE",
      }).then((res) => {
        if (res.success) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
    });
  },
  filter: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/news/filter",
        method: "POST",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
  create: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/news",
        method: "POST",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
  getDetail: async (id) => {
    return new Promise((resolve) => {
      Request.send({
        path: `/news/find/${id}`,
        method: "GET",
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
  edit: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/news",
        method: "PUT",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res?.data);
        } else {
          return resolve(false);
        }
      });
    });
  },
};
