//export const baseUrl = "http://localhost:8080/api";
export const baseUrl='https://dine-ease-api.onrender.com/api'


export const CLOUDINARY_IMAGE_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dm4djc1b1/image/upload";

export const PRODUCT_ADD_API = "/product/create";

export const GET_ALL_ACTIVE_PRODUCT_API = "/product/getAllActiveProducts";

export const GET_PRODUCT_BY_ID = "/product/getProductById";

export const DELETE_PRODUCT_BY_ID = "/product/deleteProductById";

export const VERIFY_PAYMENT = `${baseUrl}/payment/verify`;

export const ORDER_PAYMENT = `${baseUrl}/payment/orders`;

export const SIGN_IN_API = "/auth/signIn";

export const SIGN_UP_API = "/auth/signUp";

export const UPDATE_PROFILE_API = "/user/updateProfile";

export const GET_PROFILE_API = "/user/getUserData";

export const GET_PRODUCT_BY_CATEGORY_API = "/product/getProductByCategory";

// !customers
export const CUSTOMER_ADD_API = "/customer/create";

export const GET_ALL_ACTIVE_CUSTOMER_API = "/customer/getAllActiveCustomers";

export const GET_CUSTOMER_BY_ID = "/customer/getCustomerById";

export const DELETE_CUSTOMER_BY_ID = "/customer/deleteCustomerById";

//  !order
export const ORDER_CREATE_API = "/order/create";

// !dashboard
export const MONTHLY_SALES_DATA_API = "/dashboard/monthlySales";

export const REWARD_POINT_BYCUSTOMER_ID_API = "/loyalty/pointsByCustomerId";
