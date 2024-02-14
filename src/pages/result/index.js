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

const Teacher = () => {
    const user = useContext(UserContext)
    const [teachers, setTeachers] = useState([]);
    const [loadingPrint, setLoadingPrint] = useState({
        id: 0,
        aspect: 0,
        state: false
    });
    const [evaluations, setEvaluations] = useState([]);
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
            name: "Perencanaan",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => {
                let state = evaluations.filter((value) => {
                    return value.aspect === 1 && value.teacher === row.id
                });
                return state[0] && (
                    <ButtonGroup size="sm">
                        <Button
                            color="outline-success" onClick={() => handleSendButton(state[0])} disabled={state.length !== 1}>
                            <Icon name="whatsapp"/>
                        </Button>
                        <Button
                            color="outline-info"
                            onClick={() => handlePrintButton(state[0])}
                            disabled={handleStateButton(state)}
                        >
                            {
                                loadingPrint.id === state[0].id && loadingPrint.aspect === 1 && loadingPrint.state === true
                                ? <Spinner color="light" size="sm"/>
                                : <Icon name="printer"/>
                            }
                        </Button>
                    </ButtonGroup>
                )
            }
        },
        {
            name: "Pelaksanaan",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => {
                let state = evaluations.filter((value) => {
                    return value.aspect === 2 && value.teacher === row.id
                });
                return state[0] && (
                    <ButtonGroup size="sm">
                        <Button color="outline-success" onClick={() => handleSendButton(state[0])} disabled={state.length !== 1}>
                            <Icon name="whatsapp"/>
                        </Button>
                        <Button
                            color="outline-info"
                            onClick={() => handlePrintButton(state[0])}
                            disabled={handleStateButton(state)}
                        >
                            {
                                loadingPrint.id === state[0].id && loadingPrint.aspect === 2 && loadingPrint.state === true
                                    ? <Spinner color="light" size="sm"/>
                                    : <Icon name="printer"/>
                            }
                        </Button>
                    </ButtonGroup>
                )
            }
        },
        {
            name: "Evaluasi",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => {
                let state = evaluations.filter((value) => {
                    return value.aspect === 3 && value.teacher === row.id
                });
                return state[0] && (
                    <ButtonGroup size="sm">
                        <Button color="outline-success" onClick={() => handleSendButton(state[0])} disabled={state.length !== 1}>
                            <Icon name="whatsapp"/>
                        </Button>
                        <Button
                            color="outline-info"
                            onClick={() => handlePrintButton(state[0])}
                            disabled={handleStateButton(state)}
                        >
                            {
                                loadingPrint.id === state[0].id && loadingPrint.aspect === 3 && loadingPrint.state === true
                                    ? <Spinner color="light" size="sm"/>
                                    : <Icon name="printer"/>
                            }
                        </Button>
                    </ButtonGroup>
                )
            }
        },
    ];
    const handleSendButton = (evaluation) => {
        alert('Fitur masih dalam pengembangan.')
    }
    const handlePrintButton = (evaluation) => {
        setLoadingPrint({
            id: evaluation.id,
            aspect: evaluation.aspect,
            state: true
        });
        Dispatch(actionType.EVALUATION_PRINT, {
            formData: evaluation
        }).then(resp => {
            window.open(resp, '_blank', 'noreferrer');
            setLoadingPrint({
                id: 0,
                aspect: 0,
                state: false
            })
        });
    }
    const handleStateButton = (evaluation) => {
        return evaluation.length !== 1
            || loadingPrint.id === evaluation[0].id
            && loadingPrint.aspect === 1
            && loadingPrint.state === true
    }
    useEffect(() => {
        Dispatch(actionType.TEACHER_GET, {setData: setTeachers}, {user: user.id}).then();
        Dispatch(actionType.EVALUATION_GET, {setData: setEvaluations}, {user: user.id}).then();
    }, []);
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
                        <BlockTitle tag="h4">Hasil Supervisi</BlockTitle>
                        <p>
                            Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                            react dashlite.
                        </p>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <PreviewCard>
                <ReactDataTable data={teachers} columns={Columns} pagination className="nk-tb-list"/>
            </PreviewCard>
        </Content>
        <ToastContainer/>
    </>
}

export default Teacher;