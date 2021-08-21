import { useEffect, useMemo, useRef, useState } from "react";
import {Route, useHistory, useLocation, Link} from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"
import WebMenu from "../components/WebMenu.js"

function FeaturesPage({children}) {

    const history = useHistory();

    const mainScroll = useRef();

    const [scroll, setScroll] = useState(0);
    const [menuMode, setMenuMode] = useState("none");

    function updateScroll(){
        setScroll(mainScroll.current.scrollTop);
        if(mainScroll.current.scrollTop > 10) setMenuMode("white");
        else setMenuMode("none");
    };

    return (
        <div className="full-vw full-vh no-over">
            <WebMenu mode={"white"} />
            <div className="full-w full-h flex-v flex-ai-c scroll-y no-over-x z2" 
                ref={mainScroll} 
                onScroll={updateScroll}
            >
            </div>
        </div>
    );
}

export default FeaturesPage;