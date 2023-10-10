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
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";

const App = () => {
  const token = useSelector((state) => state.persistent.token);
  return (
    <>
      <Loader>
        <Toaster position="top-center" reverseOrder={false} />
        <LockScreen>
          <Routes>
            <Route
              path="admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            />
            {/* <Route path="admin/*" element={<AdminLayout />} /> */}
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
          </Routes>
        </LockScreen>
      </Loader>
    </>
    // <AdminLayout />
  );
};

export default App;
