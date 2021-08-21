import React, { createContext, useEffect, useState } from "react";
import ActionMenuPortal from "../../gui/portals/ActionMenuPortal.js"
import {NewProject} from "../../gui/components/NewProject.js"
import { DraggerMenu } from "../../gui/components/DraggerMenu.js";

const ActionMenuContext = createContext();

function ActionMenuContextProvider(props) {
    
    const [isOpen, setIsOpen] = useState(false);

    function changeMenu (toggler) {
        setIsOpen(toggler);
    }

    function closeMenu (toggler) {
        setIsOpen(false);
    }

    return (
        <ActionMenuContext.Provider value={{changeMenu, closeMenu}}>
            {props.children}
            { isOpen?          
                <ActionMenuPortal>
                    <DraggerMenu>
                        <NewProject />
                    </DraggerMenu> 
                </ActionMenuPortal>
            : false }
        </ ActionMenuContext.Provider>   
    );
}

export default ActionMenuContext;
export { ActionMenuContextProvider };