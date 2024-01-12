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
import {useNavigate, useParams} from "react-router-dom";

const Instrument = () => {
    const {aspectID} = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [instruments, setInstruments] = useState([]);
    const [instrument, setInstrument] = useState([]);
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(0);
    const [modal, setModal] = useState({
        add: false,
        edit: false
    });
    const Columns = [
        {
            name: "Kode",
            selector: (row) => row.name,
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
                    <Button
                        color="outline-info"
                        onClick={() => {
                            navigate(`instrumen/${row.id}`)
                        }}
                    >
                        <Icon name="eye"/>
                    </Button>
                    {user.role === '1' && (
                        <>
                            <Button
                                color="outline-warning"
                                onClick={() => {
                                    setInstrument(row);
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
                                    Dispatch(actionType.INSTRUMENT_DELETE, {
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
        reload && Dispatch(actionType.INSTRUMENT_GET, {setData: setInstruments}, {aspect: aspectID})
            .then(() => {
                setReload(false)
            });
    }, [reload]);
    return <>
        <Head title="Instrumen"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BackTo link="/aspek" icon="arrow-left">DATA ASPEK</BackTo>
                </BlockHeadContent>
            </BlockHead>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h4">Data Instrumen</BlockTitle>
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
                <ReactDataTable data={instruments} columns={Columns} pagination className="nk-tb-list"/>
                <Add open={modal.add} setOpen={setModal} setReload={setReload}/>
                <Edit open={modal.edit} setOpen={setModal} setReload={setReload} instrument={instrument}/>
            </PreviewCard>
        </Content>
        <ToastContainer/>
    </>
}

export default Instrument;