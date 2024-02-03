import React, {useContext, useEffect, useState} from "react";
import Head from "../../layout/head";
import {
    BackTo,
    BlockHead,
    BlockHeadContent,
    BlockTitle, PreviewCard,
    ReactDataTable
} from "../../components";
import Content from "../../layout/content";
import {actionType, Dispatch} from "../../reducer";
import {UserContext} from "../user/UserContext";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {useNavigate} from "react-router-dom";

const Evaluation = () => {
    const user = useContext(UserContext);
    const navigation = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [aspects, setAspects] = useState([]);
    const Columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.name,
            sortable: false,
            wrap: true,
            grow: 2
        },
        {
            name: "Mata Pelajaran",
            selector: (row) => row.subject,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Penilaian",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => (
                <UncontrolledDropdown>
                    <DropdownToggle className="dropdown-toggle btn btn-light">Pilih Aspek</DropdownToggle>
                    <DropdownMenu>
                        <ul className="link-list-opt">
                            {aspects.map((aspect) => (
                                <li key={aspect.id}>
                                    <DropdownItem tag="a" style={{cursor: "pointer"}} onClick={() => {
                                        navigation(`aspek/${aspect.id}/guru/${row.id}`);
                                    }}>
                                        <span>{aspect.name}</span>
                                    </DropdownItem>
                                </li>
                            ))}
                        </ul>
                    </DropdownMenu>
                </UncontrolledDropdown>
            )
        },
    ]
    useEffect(() => {
        Dispatch(actionType.TEACHER_GET, {setData: setTeachers}, {user: user}).then();
        Dispatch(actionType.ASPECT_GET, {setData: setAspects}).then();
    }, []);
    return <>
        <Head title="Penilaian"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BackTo link="/" icon="arrow-left">DASHBOARD</BackTo>
                </BlockHeadContent>
            </BlockHead>
            <BlockHead>
                <BlockHeadContent>
                    <BlockTitle tag="h4">Penilaian</BlockTitle>
                    <p>
                        Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                        react dashlite.
                    </p>
                </BlockHeadContent>
            </BlockHead>
            <PreviewCard>
                <ReactDataTable data={teachers} columns={Columns} pagination className="nk-tb-list"/>
            </PreviewCard>
        </Content>
    </>
}
export default Evaluation;