
import { useState } from "react";
import { NavLink, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"

export default function WebMenu( ){

  return(
    <div className="web-menu studio-menu padding-frame max-d-l">
      <div className="left">
          <NavLink to="/" className="mixa-logo btn btn-xxl">
              <div className="logo m-r-xs">
                  <SvgIcons iconName="mixa-logo" />
              </div>
              <span> mixa </span>
          </NavLink>
          
      </div>
      <div className="center">
      <WebMenuDesktop />
      </div>
      <div className="right">

        <NavLink to="/login" className="login-btn btn btn-stroke">
          <h5 className="m-l-xs m-r-xs"> Log In </h5>
        </NavLink>
        <NavLink to="/signup" className="btn btn-tinted-tint btn-xs m-l-xs">
          <h5 className="m-l-xs m-r-xs"> Sign up </h5>
        </NavLink>
        <Link className="hamburger btn btn-l btn-stroke m-l-xs">
            <SvgIcons iconName={"hamburger"}/>
        </Link>
      </div>
    </div>
  );
}

function WebMenuDesktop() {

  return (
    <div className="first-menu">
          <NavLink to="/features" activeClassName="btn-plain-tint" className="btn btn-plain">
            <SvgIcons iconName={"dashboard"}/>
            <h5 className="m-l-xs">Features</h5>
          </NavLink>

          <NavLink to="/automations" activeClassName="btn-plain-tint" className="btn btn-plain">
            <SvgIcons iconName={"automation"}/>
            <h5 className="m-l-xs">Automations</h5>
          </NavLink>

          <NavLink to="/explore" activeClassName="btn-plain-tint" className="btn btn-plain">
            <SvgIcons iconName={"explore"}/>
            <h5 className="m-l-xs">Explore</h5>
          </NavLink>

          <NavLink to="/plans" activeClassName="btn-plain-tint" className="btn btn-plain">
            <SvgIcons iconName={"crown"}/>
            <h5 className="m-l-xs">Plans</h5>
          </NavLink>
    </div>
  );
}

function WebMenuMobile( {open, setOpen } ) {

  const location = useLocation();
  const history = useHistory();

  return (
    <div className="web-menu-mobile">
        <div className="head">
          
          <NavLink to="/" className="mixa m-r-m" onClick={()=>setOpen(false)}>
              <div className="logo">
                <SvgIcons iconName="mixa-logo" />
              </div>
              <span className="label" >Mixa</span>

          </NavLink>
          <div className="right">
            <div className="btn-round-s-accent point m-r-s" onClick={()=>history.push("/signup")}>
              <h5 className="fw-5 p-l-xs p-r-xs"> Sign up </h5>
            </div>
            <div className={open? "btn-round-s-accent2" : "btn-round-s-accent2-selected"} onClick={()=>setOpen(!open)}>
              <SvgIcons iconName={open? "x" : "horizontal-dots"} />
            </div>
          </div>
        </div>

        { open? 
        <div className="body show-from-top">

          <NavLink to="/features" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                Features
              </h5>
            </div>
          </NavLink>

          <NavLink to="/automations" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                Automations
              </h5>
            </div>
          </NavLink>

          <NavLink to="/templates" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                Templates
              </h5>
            </div>
          </NavLink>

          <NavLink to="/creators" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                Creators
              </h5>
            </div>
          </NavLink>

          <NavLink to="/plans" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                Plans
              </h5>
            </div>
          </NavLink>

          <NavLink to="/templates" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                Learn
              </h5>
            </div>
          </NavLink>

          <NavLink to="/about-me" onClick={()=>setOpen(false)}>
            <div className="item-container">
              <h5 className="item label">
                About me
              </h5>
            </div>
          </NavLink>

          <div className="item-container" onClick={()=>setOpen(false)}>
            <div className="btn-round-s-grey point" onClick={()=>history.push("/login")}>
              <h5 className="fw-5 p-l-xs p-r-xs"> Log In </h5>
            </div>
          </div>

        </div>

        : null }

    </div>
  );
}
