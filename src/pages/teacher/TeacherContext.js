import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

export const TeacherContext= createContext({});

export const TeacherProvider = () => {
    const [teacher, setTeacher] = useState([]);

    return <TeacherContext.Provider value={{teacher, setTeacher}}>
        <Outlet />
    </TeacherContext.Provider>;
};
