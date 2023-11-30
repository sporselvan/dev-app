import React, { useState } from "react";
import store_inactive from "../assets/icons/store_inactive.svg";
import { useNavigate } from "react-router-dom";
import SidenavButton from "./SidenavButton";

const SideNav = () => {
  const navigate = useNavigate();

  type NavState = {
    home: boolean;
    assets: boolean;
    chat: boolean;
    order: boolean;
    settings: boolean;
    review: boolean;
    comments: boolean;
  };

  const [navState, setNavState] = useState<NavState>({
    home: true,
    assets: false,
    chat: false,
    order: false,
    settings: false,
    review: false,
    comments: false,
  });

  const changeNavStatus = (param: string) => {
    console.log({ param });

    const initialstate = {
      home: false,
      assets: false,
      chat: false,
      order: false,
      settings: false,
      review: false,
      comments: false,
    };

    const navigation: { [key: string]: string } = {
      home: "dashboard",
      assets: "assets",
      chat: "chat",
      order: "order",
      settings: "settings",
      review: "review",
      comments: "comments",
    };

    setNavState({ ...initialstate, [param]: true });
    navigate(`/${navigation[param]}`);
  };
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Alexander Pierce
              </a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <SidenavButton
                buttonName="home"
                isActive={navState["home"]}
                logo={store_inactive}
                changeState={(section: string) => changeNavStatus(section)}
              />
              <SidenavButton
                buttonName="assets"
                isActive={navState["assets"]}
                logo={store_inactive}
                changeState={(section: string) => changeNavStatus(section)}
              />
              <SidenavButton
                buttonName="chat"
                isActive={navState["chat"]}
                logo={store_inactive}
                changeState={(section: string) => changeNavStatus(section)}
              />
              <SidenavButton
                buttonName="assets"
                isActive={navState["assets"]}
                logo={store_inactive}
                changeState={(section: string) => changeNavStatus(section)}
              />
              <SidenavButton
                buttonName="assets"
                isActive={navState["assets"]}
                logo={store_inactive}
                changeState={(section: string) => changeNavStatus(section)}
              />
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default SideNav;
