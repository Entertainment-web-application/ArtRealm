import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NotFound from "./Pages/404";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Blog from "./Pages/Blogs";
import ProfilePage from "./Pages/ProfilePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";

function App() {
  const [currentPath, setCurrentPath] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [window.location.pathname]);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        {currentPath !== "/Login" && currentPath !== "/SignUp" && <Navbar />}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {currentPath !== "/Login" && currentPath !== "/SignUp" && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
