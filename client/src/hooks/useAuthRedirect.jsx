// useAuthRedirect.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const token = useSelector((state) => state.persistent.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);
};

export default useAuthRedirect;
