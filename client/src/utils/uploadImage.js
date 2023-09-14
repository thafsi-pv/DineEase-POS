import { CLOUDINARY_IMAGE_UPLOAD_URL } from "./const";

const handleAddMovie = async (img) => {
  var data = new FormData();
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  data.append("file", img);
  data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  const config = {
    method: "POST",
    body: data,
  };
  const response = await fetch(CLOUDINARY_IMAGE_UPLOAD_URL, config);
  const responseData = await response.json();
  return responseData.url;
};

export default handleAddMovie;
