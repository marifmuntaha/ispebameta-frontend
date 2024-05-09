import React, {useContext, useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard, ReactDataTable
} from "../../components";
import {ToastContainer} from "react-toastify";
import {UserContext} from "../user/UserContext";
import {ButtonGroup, Spinner} from "reactstrap";
import {actionType, Dispatch} from "../../reducer";
import Add from "./Add";
import Edit from "./Edit";

const Subject = () => {
    const user = useContext(UserContext);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState([]);
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(0);
    const [modal, setModal] = useState({
        add: false,
        edit: false
    });
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            wrap: true,
            grow: 2
        },
        {
            name: "KOde",
            selector: (row) => row.code,
            sortable: false,
            hide: "sm"
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button
                        color="outline-info"
                        onClick={() => {
                            setSubject(row);
                            setModal({
                                add: false, edit: true
                            });
                        }}
                    >
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            Dispatch(actionType.SUBJECT_DELETE, {
                                id: row.id,
                                setLoading: setLoading,
                                setReload: setReload
                            }).then();
                        }}
                        disabled={loading === row.id}
                    >
                        {loading === row.id ? <Spinner size="sm" color="light"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ]
    useEffect(() => {
        reload && Dispatch(actionType.SUBJECT_GET, {setData: setSubjects}).then(() => {setReload(false)});
    }, [reload]);
    return <>
        <Head title="Data Guru"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BackTo link="/" icon="arrow-left">DASHBOARD</BackTo>
                </BlockHeadContent>
            </BlockHead>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h4">Data Pelajaran</BlockTitle>
                        <p>
                            Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                            react dashlite.
                        </p>
                    </BlockHeadContent>
                    <BlockHeadContent>
                        <div className="toggle-wrap nk-block-tools-toggle">
                            <Button
                                color="secondary"
                                onClick={() => setModal({
                                    add: true,
                                    edit: false
                                })}
                            >
                                <Icon name="plus"/>
                                <span>Tambah</span>
                            </Button>
                        </div>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <PreviewCard>
                <ReactDataTable data={subjects} columns={Columns} pagination className="nk-tb-list"/>
                <Add open={modal.add} setOpen={setModal} setReload={setReload}/>
                <Edit open={modal.edit} setOpen={setModal} setReload={setReload} subject={subject}/>
            </PreviewCard>
        </Content>
        <ToastContainer/>
    </>
}

export default Subject;