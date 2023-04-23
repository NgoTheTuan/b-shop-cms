import Request from "./request";

export const SupplierService = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/supplier/get-all",
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
        path: `/supplier/${id}`,
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
        path: "/supplier/filter",
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
        path: "/supplier",
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
        path: `/supplier/find/${id}`,
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
        path: "/supplier",
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
