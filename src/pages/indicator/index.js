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
import {ButtonGroup, Spinner} from "reactstrap";
import {actionType, Dispatch} from "../../reducer";
import Add from "./Add";
import Edit from "./Edit";
import {UserContext} from "../user/UserContext";
import {useParams} from "react-router-dom";

const Indicator = () => {
    const {aspectID, instrumentID} = useParams();
    const user = useContext(UserContext);
    const [indicators, setIndicators] = useState([]);
    const [indicator, setIndicator] = useState([]);
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(0);
    const [modal, setModal] = useState({
        add: false,
        edit: false
    });
    const Columns = [
        {
            name: "Kode",
            selector: (row) => row.code,
            sortable: false,
            width: '100px'
        },
        {
            name: "Diskripsi",
            selector: (row) => row.desc,
            sortable: false,
            hide: "sm",
            grow: '2',
            wrap: true
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => (
                <ButtonGroup size="sm">
                    {user.role === '1' && (
                        <>
                            <Button
                                color="outline-warning"
                                onClick={() => {
                                    setIndicator(row);
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
                                    Dispatch(actionType.INDICATOR_DELETE, {
                                        id: row.id,
                                        setLoading: setLoading,
                                        setReload: setReload
                                    }).then();
                                }}
                                disabled={loading === row.id}
                            >
                                {loading === row.id ? <Spinner size="sm" color="light"/> : <Icon name="trash"/>}
                            </Button>
                        </>
                    )}
                </ButtonGroup>
            )
        },
    ]
    useEffect(() => {
        reload && Dispatch(actionType.INDICATOR_GET, {setData: setIndicators}, {instrument: instrumentID})
            .then(() => {
                setReload(false)
            });
    }, [reload]);
    return <>
        <Head title="Indikator"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BackTo link={`/aspek/${aspectID}`} icon="arrow-left">DATA INSTRUMEN</BackTo>
                </BlockHeadContent>
            </BlockHead>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h4">Data Indikator</BlockTitle>
                        <p>
                            Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                            react dashlite.
                        </p>
                    </BlockHeadContent>
                    <BlockHeadContent>
                        <div className="toggle-wrap nk-block-tools-toggle">
                            {user.role === '1' && (
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
                            )}
                        </div>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <PreviewCard>
                <ReactDataTable data={indicators} columns={Columns} pagination className="nk-tb-list"/>
                <Add open={modal.add} setOpen={setModal} setReload={setReload}/>
                <Edit open={modal.edit} setOpen={setModal} setReload={setReload} indicator={indicator}/>
            </PreviewCard>
        </Content>
        <ToastContainer/>
    </>
}

export default Indicator;