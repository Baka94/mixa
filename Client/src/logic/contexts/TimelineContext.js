import React, { createContext, useEffect, useMemo, useState } from "react";

const TimelineContext = createContext();

function TimelineContextProvider(props) {

    return (
        <TimelineContext.Provider value={{}}>
            {props.children}
        </ TimelineContext.Provider>   
    );
}

export default TimelineContext;
export { TimelineContextProvider };


