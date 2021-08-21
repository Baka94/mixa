import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {Route, useHistory, useLocation, Link} from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"
import WebMenu from "../components/WebMenu.js"
import {TopBar, StudioMenu, MobileMenu} from "../components/TopBar.js";
import { ModularSearch } from "../components/serchbar/ModularSearch.js";
import {ProjectBox} from "../components/ProjectBox.js"
import AppDataContext from "../../logic/contexts/AppDataContext.js";



export default function StudioPage( {loggedin} ) {

    const history = useHistory();

    const mainScroll = useRef();
    const [scroll, setScroll] = useState(0);
    const [isTop, setIsTop] = useState(true);

    function updateScroll(){
        let currentScroll = mainScroll.current.scrollTop;
        setScroll(currentScroll);

        if(currentScroll > 30) setIsTop(false);
        else setIsTop(true);
    };

    const searchOptionsList = [
        {
            id: "studio-selection-1",
            title: "Types",
            type: "categoriesList",
            multiSelect: false,
            primarySearch: true,
            views: ["initial", "fast-edit", "full-edit"],
            values: ["Projects", "Brands", "Templates", "Library", "Automations"],
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
        <div className="relative scroll-y full-w full-vh" ref={mainScroll} onScroll={updateScroll}>
            <TopBar isTop={false} > {loggedin ? <StudioMenu />  : <WebMenu /> } </TopBar>
            {loggedin && <MobileMenu /> }

            <div className="full-w top-page-padding flex-c">
                <div className="padding-frame max-d-l">
                    <h2 className="m-t-s m-b-s text-c">Studio</h2>
                </div>
            </div>

            <div className="sticky-search flex-c z4">
                <div className="max-d-l">
                    <div className="padding-frame">
                        <ModularSearch searchOptionsList={searchOptionsList} />
                    </div>
                </div>
            </div>

            <p>{}</p>

            <div className="full-w flex-c m-t-s">
                <div className="max-d-l">
                    <div className="padding-frame">
                        <Toast />
                    </div>
                </div>
            </div>


        </div>
    );
}

function Toast(){

    const { recentData } = useContext(AppDataContext);

    return(
        <div className="grid-3-2-1 full-w" >
            {recentData?.projects?.map((project)=>{
                return(
                    <ProjectBox key={project.id} id={project.id} lastEdit={project.lastEdit} name={project.name} thumbnail={project.thumbnail} type={"Project Type"} />
                );
            })}      
        </div>
    );
}