import InputField from "../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "../../components/checkbox";
import FixedPlugin from "../../components/fixedPlugin/FixedPlugin";
import Footer from "../../components/footer/FooterAuthDefault";
import { Link } from "react-router-dom";
import authImg from "../../assets/img/auth/2252808.jpg";
import { useFormik } from "formik";

const validate = (values) => {
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
  console.log("🚀 ~ file: SignUp.jsx:35 ~ validate ~ errors:", errors);

  return errors;
};

function SignUp() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log("🚀 ~ file: SignUp.jsx:53 ~ SignUp ~ formik:", formik);

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <div className="mt-14 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                  {/* Sign in section */}
                  <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                      Sign Up
                    </h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                      Enter your email your details to sign up!
                    </p>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="flex gap-2">
                        {/* First Name */}
                        <div className="flex flex-col flex-1">
                          <InputField
                            variant="auth"
                            extra=" "
                            state={
                                formik.touched.firstName && formik.errors.firstName
                                  ? "error"
                                  : ""
                              }
                            label="First Name*"
                            placeholder="First Name"
                            id="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                          {formik.touched.firstName &&
                          formik.errors.firstName ? (
                            <div>
                              <span className="text-xs text-red-500">
                                {formik.errors.firstName}
                              </span>
                            </div>
                          ) : null}
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col flex-1">
                          <InputField
                            variant="auth"
                            state={
                              formik.touched.lastName && formik.errors.lastName
                                ? "error"
                                : ""
                            }
                            extra=""
                            label="Last Name"
                            placeholder="Last Name"
                            id="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div>
                              <span className="text-xs text-red-500">
                                {formik.errors.lastName}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {/* Email */}
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email*"
                        state={
                            formik.touched.email && formik.errors.email
                              ? "error"
                              : ""
                          }
                        placeholder="mail@simmmple.com"
                        id="email"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />

                      {/* Password */}
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Password*"
                        placeholder="Min. 8 characters"
                        id="password"
                        type="password"
                      />
                      {/* Confirm Password */}
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Password*"
                        placeholder="Confirm password"
                        id="password"
                        type="password"
                      />
                      {/* Checkbox */}
                      <div className="mb-4 flex items-center justify-between px-2">
                        <div className="flex items-center">
                          <Checkbox />
                          <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                            Accept terms and conditions
                          </p>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Sign Up
                      </button>
                    </form>
                    <div className="mt-4">
                      <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                        Already registered?
                      </span>
                      <Link to="/auth/sign-in">
                        <a
                          href=" "
                          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
                          SignIn
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignUp;
