import React, { useState } from "react";
import loaderfile from "../../assets/gif/DEloader.gif";
import { useDispatch, useSelector } from "react-redux";

function index({ children }) {
  // const [showLoader, setShowLoader] = useState(true);

  const showLoader = useSelector((store) => store.loader);

  return (
    <div>
      {showLoader && (
        <div className="absolute flex justify-center items-center z-[9999999] bg-[#494848] bg-opacity-50 h-screen w-screen">
          <img src={loaderfile} alt="" className="h-14 w-18" />
        </div>
      )}
      {children}
    </div>
  );
}

export default index;
