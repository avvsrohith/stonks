import { lazy } from "react";
import { Navigate } from "react-router-dom";
import StocksPage from "../views/ui/Stocks.js";
import MyStocksPage from "../views/ui/MyStocks.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/stocks", exact: true, element: <StocksPage /> },
      { path: "/mystocks", exact: true, element: <MyStocksPage /> },

    ],
  },
];

export default ThemeRoutes;
