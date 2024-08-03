import { Routes, Route } from "react-router-dom";

import "@/globals.css";

import { Dashboard, Users, Home } from "@/_root/pages";
import RootLayout from "@/_root/RootLayout";

import { Toaster } from "@/components/ui/toaster";
import SigninForm from "@/_auth/forms/SigninForm";
import ForgotPasswordForm from "@/_auth/forms/ForgotPasswordForm";
import AuthLayout from "@/_auth/AuthLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App