import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import AuthLayout from "@/_auth/AuthLayout";
import SigninForm from "@/_auth/forms/SigninForm";
import ForgotPasswordForm from "@/_auth/forms/ForgotPasswordForm";

import PanelLayout from "@/_panel/PanelLayout";
import Dashboard from "@/_panel/pages/Dashboard/Dashboard";
import Users from "@/_panel/pages/User/Users";
import AccountSettings from "@/_panel/pages/Settings/AccountSettings";
import UserLogs from "@/_panel/pages/Reports/UserLog/UserLogs";
import AccountPWChange from "@/_panel/pages/Settings/AccountPWChange";

import ErrorLayout from "@/_error/ErrorLayout";
import Unauthorized from "@/_error/pages/Unauthorized";
import NotFound from "@/_error/pages/NotFound";

import "@/globals.css";

const App = () => {
  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<SigninForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>
        <Route element={<PanelLayout />}>
          <Route path="/panel/dashboard" element={<Dashboard />} />
          <Route path="/panel/users" element={<Users />} />
          <Route path="/panel/reports/user-logs" element={<UserLogs />} />
          <Route path="/panel/settings/account" element={<AccountSettings />} />
          <Route path="/panel/settings/pwchange" element={<AccountPWChange />} />
        </Route>
        <Route element={<ErrorLayout />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App