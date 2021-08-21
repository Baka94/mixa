import React from "react";
import { useEffect, useRef, useState } from "react";
import {BrowserRouter, Switch, Route, Redirect, useHistory, useLocation} from "react-router-dom";
import {ActionMenuContextProvider} from "./logic/contexts/ActionMenuContext.js";
import {AppDataContextProvider} from "./logic/contexts/AppDataContext.js"

//import AuthContext from "./context/AuthContext";

import EditorsPage from "./gui/pages/EditorsPage.js";
import LandingPage from "./gui/pages/LandingPage.js"
import FeaturesPage from "./gui/pages/FeaturesPage.js"

import StudioPage from "./gui/pages/StudioPage.js"
import {ComponentsTester} from "./gui/components/ComponentsTester.js"


function Router() {

    //const { loggedin } = useContext(AuthContext);
    const loggedin = true;

    const mainScroll = useRef();
    const [scroll, setScroll] = useState(0);
    function updateScroll(){
        setScroll(mainScroll.current.scrollTop);
        if(mainScroll.current.scrollTop > 10) return null;
        else return null;
    };

    return (
        <BrowserRouter>
                <ActionMenuContextProvider>
                    <AppDataContextProvider>
                        <div className="mixa-container">
                        
                            <Switch>
                                <Route exact path="/">
                                    <LandingPage loggedin={loggedin} />
                                </Route>

                                <Route path="/features">
                                    <FeaturesPage loggedin={loggedin} />
                                </Route>

                                <Route path="/templates">
                                    
                                </Route>

                                <Route path="/automations">
                                    
                                </Route>

                                <Route path="/creators">

                                </Route>

                                <Route path="/plans">

                                </Route>

                                <Route path="/learn">

                                </Route>

                                <Route path="/aboutme">

                                </Route>

                                <Route path="/login">
                                    <h2>Log In</h2>
                                </Route>

                                <Route path="/signup">

                                </Route>

                                <Route path="/studio">
                                    {loggedin? <StudioPage loggedin={loggedin} /> : <Redirect to={"/login"} /> }
                                </Route>

                                <Route path="/explore">
                                    <StudioPage loggedin={loggedin} />
                                </Route>

                                <Route path="/profile">
                                    {loggedin? <StudioPage loggedin={loggedin} /> : <Redirect to={"/login"} /> }
                                </Route>

                                <Route path="/editor">
                                    <EditorsPage />
                                </Route>

                                <Route path="/tester">
                                    <ComponentsTester />
                                </Route>

                            </Switch>

                        </div>
                    </AppDataContextProvider>
                </ActionMenuContextProvider>
        </BrowserRouter>
    );
};

export default Router;