import React from "react";

type MyFunctionType = (buttonName: string) => void;

type MyComponentProps = {
  logo: string;
  buttonName: string;
  isActive: boolean;
  notification?: string;
  changeState: MyFunctionType;
};

const capitalizedString = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const SidenavButton: React.FC<MyComponentProps> = ({
  logo,
  buttonName,
  isActive,
  notification = "",
  changeState,
}) => {
  return (
    // <div className="container" style={{ width: '100%', height: '45px', backgroundColor: isActive ? '#6f4ff8' : 'transparent', display: 'flex', alignItems: 'center', borderRadius: 8,paddingLeft:15,paddingRight:15 }} onClick={()=>changeState(buttonName)}>
    //   <div className="logo" style={{ width: '25px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //     <img className="img" src={logo} style={{ height: '20px', width: '20px', display: 'block', margin: 'auto' }} alt="Logo" />
    //   </div>
    //   <div className="text" style={{ flex: 1, padding: '0 10px', display: 'flex', alignItems: 'center', color: isActive ? 'white' : "#9fa1ad" }}>
    //     {capitalizedString(buttonName)}
    //   </div>
    //   {notification &&
    //     <div style={{ width: 'auto', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red',borderRadius:4,padding:5 }}>
    //       <p style={{ fontSize: 10, textAlign: 'center', margin: 0 }}>{notification}</p>
    //     </div>
    //   }
    // </div>
    <>
      {/* <li className="nav-item" onClick={() => changeState(buttonName)}>
        <a className="nav-link">
          <i className="nav-icon fas fa-th" />
          <p>
            {capitalizedString(buttonName)}
            {notification && (
              <span className="right badge badge-danger">99+</span>
            )}
          </p>
        </a>
      </li> */}

      <li className="nav-item" onClick={() => changeState(buttonName)}>
        <a className="nav-link">
          <span className="material-icons md-18 mr-1">storefront</span>
          <p>
            {capitalizedString(buttonName)}{" "}
            {notification && (
              <span className="right badge badge-danger">99+</span>
            )}
          </p>
        </a>
      </li>
    </>
  );
};

export default SidenavButton;
