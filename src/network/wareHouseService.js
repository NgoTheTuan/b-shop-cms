import Request from "./request";

export const WarehouseService = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/warehouse/get-all",
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
        path: `/warehouse/${id}`,
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
        path: "/warehouse/filter",
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
        path: "/warehouse",
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
        path: `/warehouse/find/${id}`,
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
        path: "/warehouse",
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
  changeQuantity: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/warehouse/quantity",
        method: "POST",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(res);
        }
      });
    });
  },
  editQuantityProduct: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/warehouse/quantity-edit",
        method: "POST",
        data: data,
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(res);
        }
      });
    });
  },
};
