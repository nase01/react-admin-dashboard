import { Routes, Route } from "react-router-dom";

import "./globals.css";

import { Home, About } from "./_root/pages";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App