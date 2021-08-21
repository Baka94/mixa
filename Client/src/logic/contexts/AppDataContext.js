import React, { createContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {loadUserData, loadAppData, loadProject, deleteProject} from "../../linkers/DirectoryFunctions.js"

const AppDataContext = createContext();

function AppDataContextProvider(props) {

    const history = useHistory();

    const [appData, setAppData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [recentData, setRecentData] = useState(null);

    const [loadedProject, setloadedProject] = useState(null);

    /* Start-Up function to load everything up*/
    useEffect(async ()=>{
        /* Control if i have a recent version of projects json saved in local storage 
            if not, goese ahead and requests it from the server.
        */
        loadUserData(setUserData, setRecentData, "Infinito");
    },[]);

    function loadEditor(id){
        loadProject(id, "infinito", setloadedProject);
        history.push("/editor");
    }

    function deleteP(id){
        deleteProject(id, "Infinito", setRecentData);
    }

    /* Functions to update the context and load extra contents */
    /*function updateLoadedProject(projectName){
        setLoadedProject(null);
        setTimeout(()=>{
            loadProject(projectName, setLoadedProject);
        }, 1000);
    }*/

    return (
        <AppDataContext.Provider value={{
            recentData, userData, appData,
            loadedProject, setloadedProject, loadEditor, deleteP
            }}>
            {props.children}
        </ AppDataContext.Provider>   
    );
}

export default AppDataContext;
export { AppDataContextProvider };


