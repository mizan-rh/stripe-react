// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about", 
    element: <About />,
  },
  {
    path: "/test",
    element: <Test/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;