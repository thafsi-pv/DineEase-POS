import InputField from "../../components/fields/InputField";
import Checkbox from "../../components/checkbox";
import FixedPlugin from "../../components/fixedPlugin/FixedPlugin";
import Footer from "../../components/footer/FooterAuthDefault";
import { Link, useNavigate } from "react-router-dom";
import authImg from "../../assets/img/auth/2252808.jpg";
import { useFormik } from "formik";
import { validate } from "../../utils/validate";
import { genricError } from "../../utils/genricError";
import { toast } from "react-hot-toast";
import { SIGN_UP_API } from "../../utils/const";
import axiosInstance from "../../utils/axiosInterceptor";

function SignUp() {
  const navigate = useNavigate(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
      tandc: false,
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(SIGN_UP_API, values);
        if ((response.status = 200)) {
          toast.success("Successfully registered, SignIn now 🤝");
          navigate("/auth/sign-in");
        }
      } catch (error) {
        genricError(error);
      }
    },
  });

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
                      Enter your details to sign up!
                    </p>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="flex gap-2 mb-3">
                        {/* First Name */}
                        <div className="flex flex-col flex-1">
                          <InputField
                            variant="auth"
                            extra=" "
                            state={
                              formik.touched.firstName &&
                              formik.errors.firstName
                                ? "error"
                                : ""
                            }
                            label="First Name"
                            placeholder="First Name"
                            id="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
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
                        </div>
                      </div>
                      {/* Email */}
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email"
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
                        label="Password"
                        placeholder="Min. 8 characters"
                        id="password"
                        type="password"
                        state={
                          formik.touched.password && formik.errors.password
                            ? "error"
                            : ""
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {/* Confirm Password */}
                      <div className="mb-3">
                        <InputField
                          variant="auth"
                          extra=""
                          label="Confirm Password"
                          placeholder="Confirm password"
                          id="cpassword"
                          type="text"
                          state={
                            formik.touched.cpassword && formik.errors.cpassword
                              ? "error"
                              : ""
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.cpassword}
                        />
                        {formik.touched.cpassword && formik.errors.cpassword ? (
                          <div className="pl-3">
                            <span className="text-red-500 text-xs">
                              {formik.errors.cpassword}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      {/* Checkbox */}
                      <div className="mb-4 flex items-center justify-between px-2">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Checkbox
                              state="error"
                              name="tandc"
                              value={formik.values.tandc}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                              Accept terms and conditions
                            </p>
                          </div>
                          {formik.touched.tandc && formik.errors.tandc ? (
                            <div>
                              <span className="text-red-500 text-xs">
                                {formik.errors.tandc}
                              </span>
                            </div>
                          ) : null}
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
