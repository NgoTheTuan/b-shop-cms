import Request from "./request";

export const CategorySevice = {
  getData: async () => {
    return new Promise((resolve) => {
      Request.send({
        path: "/categoryProduct/get-all",
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
  //   delete: async (id) => {
  //     return new Promise((resolve) => {
  //       Request.send({
  //         path: `/products/${id}`,
  //         method: "DELETE",
  //       }).then((res) => {
  //         if (res.success) {
  //           return resolve(true);
  //         } else {
  //           return resolve(false);
  //         }
  //       });
  //     });
  //   },
  //   filter: async (data) => {
  //     return new Promise((resolve) => {
  //       Request.send({
  //         path: "/products/filter",
  //         method: "POST",
  //         data: data,
  //       }).then((res) => {
  //         if (res.success) {
  //           return resolve(res?.data);
  //         } else {
  //           return resolve(false);
  //         }
  //       });
  //     });
  //   },
};
