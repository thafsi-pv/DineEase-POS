import * as Yup from "yup";

export const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Not match with password";
  }
  if (!values.tandc) {
    errors.tandc = "Accept terms and condition";
  }

  return errors;
};

export const validateSignIn = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }
  return errors;
};

export const productValidationSchema = Yup.object().shape({
  itemName: Yup.string().required("Item name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  hasPortions: Yup.boolean(),
  portions: Yup.array().when(["hasPortions"], (hasPortions, schema) => {
    if (hasPortions[0] == true) {
      return schema.min(1, "At least one portion is required");
    }
    return schema;
  }),
  // category: Yup.string(),
  // cuisine: Yup.array(),
  // isActive: Yup.boolean(),
  // remarks: Yup.string(),
  imageUrl: Yup.string().required("Select item image"),
});

export const customerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  mobile: Yup.number()
    .required("Mobile is required")
    .positive("Price must be a positive number"),
});
