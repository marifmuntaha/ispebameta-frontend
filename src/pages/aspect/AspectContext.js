import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

export const AspectContext= createContext({});

export const AspectProvider = () => {
    const [aspect, setAspect] = useState([]);

    return <AspectContext.Provider value={{aspect, setAspect}}>
        <Outlet />
    </AspectContext.Provider>;
};
