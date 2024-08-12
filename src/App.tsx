import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import AuthLayout from "@/_auth/AuthLayout";
import SigninForm from "@/_auth/forms/SigninForm";
import ForgotPasswordForm from "@/_auth/forms/ForgotPasswordForm";

import PanelLayout from "@/_panel/PanelLayout";
import Dashboard from "@/_panel/pages/Dashboard";
import Users from "@/_panel/pages/Users";

import Unauthorized from "./_error/pages/Unauthorized";

import "@/globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<SigninForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>
        <Route element={<PanelLayout />}>
          <Route path="/panel/dashboard" element={<Dashboard />} />
          <Route path="/panel/users" element={<Users />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

      <Toaster />
    </main>
  )
}

export default App