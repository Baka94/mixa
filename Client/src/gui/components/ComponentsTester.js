import { useEffect, useRef, useState } from "react";
import { NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"

import { ModularSearch } from "./serchbar/ModularSearch";
import {TopBar, MainMenu, MobileMenu} from "./TopBar.js";

export function ComponentsTester(props) {

    const searchOptionsList = [
        {
            id: "socialmedia-selection-1",
            title: "Socials",
            type: "circlesList",
            multiSelect: true,
            views: ["fast-edit", "full-edit"],
            values: ["tiktok", "instagram", "facebook", "youtube"],
            defaultValue: "youtube"
        },
        {
            id: "random-selection-2",
            title: "Sources",
            type: "categoriesList",
            multiSelect: true,
            primarySearch: true,
            views: ["initial", "fast-edit", "full-edit"],
            values: ["home", "settings", "back", "forward", "play"],
            defaultValue: "home"
        },
        {
            id: "search-main-1",
            title: "Search",
            type: "searchBar",
            multiSelect: true,
            views: ["search", "fast-edit", "full-edit"],
            values: ["home", "settings", "back", "forward", "play"],
            defaultValue: ""
        },
          
    ]

  return (
        <div className="full-vw full-vh testContainer scroll-y">
            <div className="full-w full-h lightmode flex-v p-a-m bc-test-img">
                <ModularSearch searchOptionsList={searchOptionsList} />
            </div>
            <div className=" full-w full-h flex-v p-a-m bc-test-img">
                <Test />
            </div>
        </div>
  );
}


const Test = () =>{

    return(
        <div className="">
        </div>
    );
}

