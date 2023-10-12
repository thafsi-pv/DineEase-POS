import { toast } from "react-hot-toast";

export const genricError = (error) => {
  if (error?.response?.status == 401) {
    toast.error(error.response.data.message);
  } else if (error?.response?.status == 409) {
    toast.error(error.response.data.message);
  } else {
    console.log(
      "🚀 ~ file: genricError.js:10 ~ genricError ~ error?.response:",
      error
    );
    toast.error(error?.response);
  }
};
