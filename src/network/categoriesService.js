import Request from "./request";

export const CategoriesService = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/categories/get-all",
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
        path: `/categories/${id}`,
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
        path: "/categories/filter",
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
        path: "/categories",
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
        path: `/categories/find/${id}`,
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
        path: "/categories",
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
