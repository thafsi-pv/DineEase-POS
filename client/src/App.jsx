import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/Default.jsx";
import LockScreen from "./pages/lockscreen/LockScreen.jsx";
import store from "./redux/store.js";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Loader from "./components/loader";

const App = () => {
  const token = useSelector((state) => state.persistent.token);
  console.log("🚀 ~ file: App.jsx:15 ~ App ~ token:", token);
  return (
    <>
      <Loader>
        <Toaster position="top-center" reverseOrder={false} />
        <LockScreen>
          <Routes>
            {token && (
              <>
                <Route path="admin/*" element={<AdminLayout />} />
              </>
            )}

            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/auth/sign-in" replace />
                )
              }
            />
            {!token && (
              <>
                <Route path="/auth/sign-in" element={<SignIn />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
              </>
            )}
          </Routes>
        </LockScreen>
      </Loader>
    </>
    // <AdminLayout />
  );
};

export default App;
