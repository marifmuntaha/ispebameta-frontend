import React, {useLayoutEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";

import Layout from "../layout";
import LayoutNoSidebar from "../layout/NoSidebar"
import Dashboard from "../pages/dashboard";
// import Error404 from "../pages/error/Error404";
// import Error504 from "../pages/error/Error504";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Teacher from "../pages/teacher";
import Aspect from "../pages/aspect";
import Instrument from "../pages/instrument";
import Indicator from "../pages/indicator";
import Evaluation from "../pages/evaluation";
import Add from "../pages/evaluation/Add";
import Result from "../pages/result"
import Setting from "../pages/setting";
import User from "../pages/user";
import Subject from "../pages/subject";

const Router = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path={`${process.env.PUBLIC_URL}`} element={<Layout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="/data-guru" element={<Teacher/>}/>
                <Route path="/aspek" element={<Aspect/>}/>
                <Route path="/mata-pelajaran" element={<Subject/>}/>
                <Route path="/aspek/:aspectID" element={<Instrument/>}/>
                <Route path="/aspek/:aspectID/instrumen/:instrumentID" element={<Indicator/>}/>
                <Route path="/penilaian" element={<Evaluation/>}/>
                <Route path="/penilaian/aspek/:aspectID/guru/:teacherID" element={<Add/>}/>
                <Route path="/hasil-supervisi" element={<Result/>}/>
                <Route path="/pengaturan" element={<Setting/>}/>
                <Route path="/profil" element={<User/>}/>
            </Route>
            <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar/>}>
                {/*<Route path="reset-sandi" element={<ForgotPassword/>}></Route>*/}
                <Route path="pendaftaran" element={<Register/>}></Route>
                <Route path="masuk" element={<Login/>}></Route>
            </Route>
        </Routes>
    );
};
export default Router;
