import Request from "./request";

export const UserService = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/users/get-all",
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
        path: `/users/${id}`,
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
        path: "/users/filter",
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
        path: "/users",
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
        path: `/users/find/${id}`,
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
        path: "/users",
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
