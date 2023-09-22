import React, { useEffect, useState } from "react";

function ViewProductsModal() {
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    getProductDetailsById();
  }, []);

  const getProductDetailsById=async()=>{
    const details=await axios.get()
  }

  return <div>ViewProductsModal</div>;
}

export default ViewProductsModal;
