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
      {/* <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        <div className="sidebar">
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
        </div>
      </aside> */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="#" className="brand-link txt_center border-bottom-0">
          <img src="dist/img/tilted_logo.png" alt="Tilted" />
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar_drpdwn my-3">
            <img
              src="dist/img/qglobe_logo.png"
              alt="QGlobe"
              className="sidebar_img"
            />
            <select className="form-control">
              <option>QGlobe Studio</option>
            </select>
          </div>
          <div className="dropdown-divider mb-3" />
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="f_sz14 mb-3">Admin Panel</li>
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
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="material-icons material-symbols-outlined md-18 mr-1">
                    assignment
                  </span>
                  <p>Activity</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="material-icons md-18 mr-1">settings</span>
                  <p>Settings</p>
                </a>
              </li>
              <li>
                <div className="dropdown-divider mb-3 mt-2" />
              </li>
              <li className="f_sz14 mb-3">Insight</li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="material-icons material-symbols-outlined md-18 mr-1">
                    grade
                  </span>
                  <p>
                    Review <span className="right badge badge-danger">99+</span>
                  </p>
                </a>
              </li>
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
