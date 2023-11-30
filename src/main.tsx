import React from "react";
import ReactDOM from "react-dom/client";
import Signin from "./screens/Signin.tsx";
import Dashboard from "./screens/Dashboard.tsx";
import Assets from "./screens/Assets.js";

import Chat from "./screens/Chat.tsx";
import Order from "./screens/Order.tsx";
import Settings from "./screens/Settings.tsx";
import Review from "./screens/Review.tsx";
import Comments from "./screens/Comments.tsx";
import "./App.css";
import { UserProvider } from "../src/helper/userContext.tsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import SideNav from "./components/SideNav.tsx";
import { colorCodes } from "./helper/contant.ts";
import Navbar from "./components/Navbar.tsx";

type MyComponentProps = {
  // Define your props here
  Component: React.ComponentType;
};

const WithSideBar: React.FC<MyComponentProps> = ({ Component }) => {
  return (
    <>
      <div className="wrapper">
        <SideNav />
        <Component />
      </div>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signin />} />
      <Route path="dashboard" element={<WithSideBar Component={Dashboard} />} />
      <Route path="assets" element={<WithSideBar Component={Assets} />} />
      <Route path="chat" element={<WithSideBar Component={Chat} />} />
      <Route path="order" element={<WithSideBar Component={Order} />} />
      <Route path="settings" element={<WithSideBar Component={Settings} />} />
      <Route path="review" element={<WithSideBar Component={Review} />} />
      <Route path="comments" element={<WithSideBar Component={Comments} />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
