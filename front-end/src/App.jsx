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

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
export const UpdateContext = createContext();

function App() {
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(true);

  // const ScrollToTop = () => {
  //   const { pathname } = useLocation();

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [pathname]);

  //   return null;
  // };

  return (
    <>
      <BrowserRouter>
        {/* <ScrollToTop /> */}

        <Navbar />
        <UpdateContext.Provider
          value={{ update, setUpdate, deleted, setDeleted }}
        >
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
        </UpdateContext.Provider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
