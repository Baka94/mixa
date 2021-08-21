import { useEffect, useState, useRef } from "react";
import ReactDom from "react-dom";
import {useContextMenu} from "../../logic/hooks/useContextMenu.js";
import "../choa/choa.sass"

/* Wrapper to make the context menu appear above everything else.
Wrap context menus in this component to make them appear on top. */

export default function ContextMenuPortal ({ outerRef, triggerRef, children }) {
    const { xPos, yPos, menu } = useContextMenu(outerRef, triggerRef);
    const [leftPos, setLeftPos] = useState(xPos);
    const [topPos, setTopPos] = useState(yPos);
    const innerRef = useRef(null);

    /* Logic for detecting if it's near a border and print the context menu component accordingly.
        Basically doesen't let the context menu go out of the view */
    useEffect( ()=>{
        if(innerRef.current){
            if(xPos > window.innerWidth - innerRef.current?.clientWidth - 5)
                setLeftPos(xPos-innerRef.current.clientWidth);
            else setLeftPos(xPos);
            if(yPos > window.innerHeight - innerRef.current?.clientHeight - 5)
                setTopPos(yPos-innerRef.current.clientHeight);
            else setTopPos(yPos);
        }
    }, [xPos, yPos, menu]);

    if (menu) {            
        return ReactDom.createPortal(
            <div ref={innerRef} className={ topPos !== yPos ? "absolute z2 show-from-top" : "absolute z2 show-from-top"} style={{ top: topPos+"px", left: leftPos+"px", opacity: innerRef.current? "1" : "0" }}> 
                {children}
            </div>,
            document.getElementById("contextMenus")
          );
      }
      return <></>;
  };