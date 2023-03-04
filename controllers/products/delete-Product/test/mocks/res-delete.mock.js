export const resMock = {
  status: (statusCode) => ({
    json: (data) => ({
      data,
    }),
  }),
};
