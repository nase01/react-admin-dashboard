import { Routes, Route } from "react-router-dom";

import "@/globals.css";

import { Home, About } from "@/_root/pages";
import RootLayout from "@/_root/RootLayout";

import { Toaster } from "@/components/ui/toaster";
import SigninForm from "@/_auth/forms/SigninForm";
import AuthLayout from "@/_auth/AuthLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App