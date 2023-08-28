import InputField from "../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "../../components/checkbox";
import FixedPlugin from "../../components/fixedPlugin/FixedPlugin";
import Footer from "../../components/footer/FooterAuthDefault";
import { Link, useNavigate } from "react-router-dom";
import authImg from "../../assets/img/auth/2252808.jpg";
import { useFormik } from "formik";
import { validateSignIn } from "../../utils/validate";
import { genricError } from "../../utils/genricError";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate(null);
  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateSignIn,
    onSubmit: async (values) => {
      try {
        console.log("🚀 ~ file: SignUp.jsx:56 ~ SignUp ~ values:", values);
        const signInUrl = "http://localhost:8080/api/auth/signIn";
        const response = await axios.post(signInUrl, values);
        if ((response.status = 200)) {
          console.log(
            "🚀 ~ file: SignIn.jsx:28 ~ onSubmit: ~ response:",
            response
          );
          toast.success("SignIn successfull, 👍🏻");
          var dataToStore = {
            DET: response.data.accesstoken,
            email: response.data.email
          };
          
          localStorage.setItem('DEPOS', JSON.stringify(dataToStore));
        
          navigate("/admin");
        }
      } catch (error) {
        console.log("🚀 ~ file: SignIn.jsx:30 ~ onSubmit: ~ error:", error);
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
                {/* <Link to="/admin" className="mt-0 w-max lg:pt-10">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                        fill="#A3AED0"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-gray-600">
                      Back to Dashboard
                    </p>
                  </div>
                </Link> */}
                <div className="mt-8 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                  {/* Sign in section */}
                  <div className=" w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                      Sign In
                    </h4>
                    <p className="mb-9 ml-1 text-base text-gray-600">
                      Enter your email and password to sign in!
                    </p>
                    <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
                      <div className="rounded-full text-xl">
                        <FcGoogle />
                      </div>
                      <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                        Sign In with Google
                      </h5>
                    </div>
                    <div className="mb-6 flex items-center  gap-3">
                      <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                      <p className="text-base text-gray-600 dark:text-white">
                        or
                      </p>
                      <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                    </div>
                    <form onSubmit={signInFormik.handleSubmit}>
                      {/* Email */}
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email"
                        placeholder="mail@simmmple.com"
                        id="email"
                        type="text"
                        state={
                          signInFormik.touched.email &&
                          signInFormik.errors.email
                            ? "error"
                            : ""
                        }
                        onChange={signInFormik.handleChange}
                        onBlur={signInFormik.handleBlur}
                        value={signInFormik.values.email}
                      />

                      {/* Password */}
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Password*"
                        placeholder="Min. 8 characters"
                        id="password"
                        type="password"
                        state={
                          signInFormik.touched.password &&
                          signInFormik.errors.password
                            ? "error"
                            : ""
                        }
                        onChange={signInFormik.handleChange}
                        onBlur={signInFormik.handleBlur}
                        value={signInFormik.values.password}
                      />

                      {/* Checkbox */}
                      <div className="mb-4 flex items-center justify-between px-2">
                        <div className="flex items-center">
                          <Checkbox />
                          <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                            Keep me logged In
                          </p>
                        </div>
                        <a
                          className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                          href=" ">
                          Forgot Password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Sign In
                      </button>
                    </form>
                    <div className="mt-4">
                      <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                        Not registered yet?
                      </span>
                      <Link to="/auth/sign-up">
                        <a
                          href=" "
                          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
                          Create an account
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
