export const errorMessage = (error: any) => {
  if (typeof error === "string") {
    return error;
  } else if (error.response.data.message) {
    return error.response.data.message;
  } else if (typeof error.response.data === "string") {
    return error.response.data;
  } else {
    return "Error";
  }
};
