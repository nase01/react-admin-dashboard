import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import AuthLayout from "@/_auth/AuthLayout";
import SigninForm from "@/_auth/forms/SigninForm";
import ForgotPasswordForm from "@/_auth/forms/ForgotPasswordForm";

import PanelLayout from "@/_panel/PanelLayout";
import Dashboard from "@/_panel/pages/Dashboard";
import Users from "@/_panel/pages/Users";
import UserCreate from "@/_panel/pages/UserCreate";
import UserEdit from "@/_panel/pages/UserEdit";
import AccountSettings from "@/_panel/pages/AccountSettings";
import AccountPWChange from "@/_panel/pages/AccountPWChange";

import Unauthorized from "@/_error/pages/Unauthorized";
import NotFound from "@/_error/pages/NotFound";

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
          <Route path="/panel/users/create" element={<UserCreate />} />
          <Route path="/panel/users/edit/:id" element={<UserEdit />} />
          <Route path="/panel/account-settings" element={<AccountSettings />} />
          <Route path="/panel/account-pwchange" element={<AccountPWChange />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </main>
  )
}

export default App