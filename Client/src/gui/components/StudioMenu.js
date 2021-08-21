import { useEffect, useRef, useState } from "react";
import { NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"


export default function StudioMenu(){

    const location = useLocation();

    return(
        <div className="studio-menu">
            <StudioMenuDesktop />
            <StudioMenuMobile />
        </div>
    );
}

function StudioMenuDesktop(){

    const location = useLocation();

    return(
        <div className="studio-menu-desktop">
            <div className="icons-group">
                
                <NavLink to="/studio" className={"item logo"}>
                    <SvgIcons iconName={"mixa-logo"} />
                </NavLink>

                <NavLink to="/studio" 
                    activeClassName = "item btn-square-xl-accent4-selected"
                    className = "item btn-square-xl-accent4"
                >
                    <SvgIcons iconName={location.pathname === "/studio" ? "home" : "home-outline"} />
                </NavLink>

                <NavLink to="/explore" 
                    activeClassName = "item btn-square-xl-accent4-selected"
                    className = "item btn-square-xl-accent4"
                >
                    <SvgIcons iconName={location.pathname === "/explore" ? "explore" : "explore-outline"} />
                </NavLink>

                <NavLink to="/notifications"  
                    activeClassName = "item btn-square-xl-accent4-selected"
                    className = "item btn-square-xl-accent4"
                >
                    <SvgIcons iconName={location.pathname === "/notifications" ? "bell" : "bell-outline"} />
                </NavLink>

                <NavLink to="/plans" 
                    activeClassName = "item btn-round-xxl-accent2"
                    className = "item btn-round-xxl-accent2"
                >
                    <div className="image"><img  src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crown.png" /></div>
                </NavLink>

                <NavLink to="/new-project"  
                    className = "item btn-square-xxl-accent2-selected"
                >
                    <SvgIcons iconName={"newProject-outline"} />
                </NavLink>

            </div>

            <div className="icons-group">

                <NavLink to="/studio/dashboard"  
                    activeClassName = "item btn-square-xl-accent4-selected"
                    className = "item btn-square-xl-accent4"
                >
                    <SvgIcons iconName={location.pathname === "/studio/dashboard" ? "dashboard" : "dashboard-outline"} />
                </NavLink>

                <NavLink to="/studio/analytics"  
                    activeClassName = "item btn-square-xl-accent4-selected"
                    className = "item btn-square-xl-accent4"
                >
                    <SvgIcons iconName={location.pathname === "/studio/analytics" ? "analytics" : "analytics-outline"} />
                </NavLink>

                <div className="item btn-round-xxl-accent4">
                    <NavLink to="/profile"
                            activeClassName = "profile-round-xxl-selected"    
                            className = "profile-round-xxl"
                        >
                        <img  src="https://pm1.narvii.com/6715/dcd2c638f85e770af20daefd21e44a027d3f102c_128.jpg" />
                    </NavLink>
                </div>

            </div>
        </div>
    );
}

function StudioMenuMobile(){

    const location = useLocation();

    return(
        <div className="studio-menu-mobile">

            <NavLink to="/studio"   
                    activeClassName = "item btn-round-xl-accent4-selected"
                    className = "item btn-round-xl-accent4"
                >
                <SvgIcons iconName={location.pathname === "/studio" ? "home" : "home-outline"} />
            </NavLink>

            <NavLink to="/explore"    
                    activeClassName = "item btn-round-xl-accent4-selected"
                    className = "item btn-round-xl-accent4"
                >
                <SvgIcons iconName={location.pathname === "/explore" ? "explore" : "explore-outline"} />
            </NavLink>

            <NavLink to="/new-project"
                    className = "item btn-square-xxl-accent2-selected"
                >
                    <SvgIcons iconName={"newProject-outline"} />
            </NavLink>

            <NavLink to="/studio/dashboard"    
                    activeClassName = "item btn-round-xl-accent4-selected"
                    className = "item btn-round-xl-accent4"
                >
                <SvgIcons iconName={location.pathname === "/studio/dashboard" ? "dashboard" : "dashboard-outline"} />
            </NavLink>

            <div className="item btn-round-xl-accent4">
                <NavLink to="/profile"
                        activeClassName = "profile-round-xl-selected"    
                        className = "profile-round-xl"
                    >
                    <img  src="https://pm1.narvii.com/6715/dcd2c638f85e770af20daefd21e44a027d3f102c_128.jpg" />
                </NavLink>
            </div>

        </div>
    );
}