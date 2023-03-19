import Request from "./request";

export const AuthService = {
  login: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/auth/login",
        data: data,
        method: "POST",
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(false);
        }
      });
    });
  },
  register: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/auth/register",
        data: data,
        method: "POST",
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(false);
        }
      });
    });
  },
  changePassword: async (data) => {
    return new Promise((resolve) => {
      Request.send({
        path: "/users/change-password",
        data: data,
        method: "POST",
      }).then((res) => {
        if (res.success) {
          return resolve(res);
        } else {
          return resolve(false);
        }
      });
    });
  },
};
