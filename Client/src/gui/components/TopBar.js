
import { useContext, useState } from "react";
import { NavLink, Redirect, Link, useHistory, useLocation } from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"


import ActionMenuContext from "../../logic/contexts/ActionMenuContext";

export function TopBar( {children, isTop} ) {
  const history = useHistory();
  
  return (
    <div className={ isTop ? "top-menu" : "top-menu top-menu-scrolled" }>
        {children}
    </div>
  );
}


export function StudioMenu( ){

  const [mode, setMode] = useState("lightmode");

  const togglemode = ()=> {
    if(mode === "lightmode"){
      document.getElementById("mixa-app-body").className = "darkmode"
      setMode("darkmode");
    }else{
      document.getElementById("mixa-app-body").className = "lightmode"
      setMode("lightmode");
    }
  }

  return(
    <div className="studio-menu padding-frame max-d-l">
      <div className="left">
          <NavLink to="/" className="mixa-logo btn btn-xxl">
              <div className="logo m-r-xs">
                  <SvgIcons iconName="mixa-logo" />
              </div>
              <span> mixa </span>
          </NavLink>
      </div>
      <div className="center">
          <MainMenu />
      </div>
      <div className="right">
          <Link className="btn btn-plain-tint" onClick={togglemode}>
              <h5 className="go-pro m-r-xs m-l-xs"> Become a Pro </h5>
              <SvgIcons iconName={"crown"}/>
          </Link>
          <Link className="btn btn-l btn-stroke m-l-xs">
              <SvgIcons iconName={"hamburger"}/>
          </Link>
      </div>
    </div>
  );
}


export function MainMenu(){

  const {changeMenu} =useContext(ActionMenuContext);

  return(
      <div className="app-menu">
          <NavLink exact to="/" activeClassName="btn-plain-tint" className="btn btn-grey">
              <SvgIcons iconName={"home-outline"}/>
          </NavLink>
          <NavLink to="/explore" activeClassName="btn-plain-tint" className="btn btn-grey">
              <SvgIcons iconName={"explore-outline"}/>
          </NavLink>
          <Link activeClassName="btn-plain-tint" className="btn btn-grey" onClick={()=>changeMenu(true)}>
              <SvgIcons iconName={"plus-outline"}/>
          </Link>
          <NavLink to="/studio" activeClassName="btn-plain-tint" className="btn btn-grey">
              <SvgIcons iconName={"dashboard-outline"}/>
          </NavLink>
          <NavLink to="/profile" activeClassName="btn-stroke-tint" className="btn btn-profile">
              <img alt="" src="https://images.pexels.com/photos/3117157/pexels-photo-3117157.jpeg" ></img>
          </NavLink>
      </div>
  );
}

export function MobileMenu(){

  return(
      <div className="mobile-menu">
          <MainMenu />
      </div>
  );
}