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
import Print from "../pages/result/print"

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
                <Route path="/aspek/:aspectID" element={<Instrument/>}/>
                <Route path="/aspek/:aspectID/instrumen/:instrumentID" element={<Indicator/>}/>
                <Route path="/penilaian" element={<Evaluation/>}/>
                <Route path="/penilaian/aspek/:aspectID/guru/:teacherID" element={<Add/>}/>
                <Route path="/hasil-supervisi" element={<Result/>}/>

                {/*<Route path="/produk" element={<Product/>}></Route>*/}
                {/*<Route element={<MemberProvider/>}>*/}
                {/*    <Route element={<InvoiceProvider/>}>*/}
                {/*        <Route path="/pelanggan" element={<Member/>}></Route>*/}
                {/*        <Route path="/pelanggan/detail" element={<MemberDetail/>}></Route>*/}
                {/*    </Route>*/}
                {/*</Route>*/}
                {/*<Route path="/tagihan" element={<Invoice/>}></Route>*/}
                {/*<Route path="/tagihan/:invoiceID" element={<InvoiceDetail/>}></Route>*/}
                {/*<Route path="/laporan/pembayaran" element={<Payment />}></Route>*/}
                {/*<Route path="/laporan/tagihan" element={<InvoiceReport />}></Route>*/}
                {/*<Route path="/arus-kas" element={<Cashflow/>}></Route>*/}
                {/*<Route path="/pengaturan" element={<Setting/>}></Route>*/}
            </Route>
            <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar/>}>
                {/*<Route path="/tagihan/:invoiceID/cetak" element={<InvoicePrint/>}></Route>*/}
                {/*<Route path="reset-sandi" element={<ForgotPassword/>}></Route>*/}
                <Route path="pendaftaran" element={<Register/>}></Route>
                <Route path="masuk" element={<Login/>}></Route>
                <Route path="/hasil-supervisi/cetak" element={<Print/>}/>

                {/*<Route path="errors">*/}
                {/*    <Route path="404" element={<Error404/>}></Route>*/}
                {/*    <Route path="504" element={<Error504/>}></Route>*/}
                {/*</Route>*/}
                {/*<Route path="*" element={<Error404/>}></Route>*/}

            </Route>
        </Routes>
    );
};
export default Router;
