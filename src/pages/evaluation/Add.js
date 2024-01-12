import React, {useContext, useEffect, useState} from "react";
import Head from "../../layout/head";
import {
    BackTo, Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Button, Col,
    PreviewCard, Row,
} from "../../components";
import Content from "../../layout/content";
import {useParams} from "react-router-dom";
import {actionType, Dispatch} from "../../reducer";
import {ToastContainer} from "react-toastify";
import {UserContext} from "../user/UserContext";

const Add = () => {
    const user = useContext(UserContext);
    const {aspectID, teacherID} = useParams();
    const [aspect, setAspect] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [instrument, setInstrument] = useState([]);
    const [instrumentKeys, setInstrumentKeys] = useState([]);
    const [buttonState, setButtonState] = useState(0);
    const [result, setResult] = useState([]);
    useEffect(() => {
        Dispatch(actionType.ASPECT_SHOW, {setData: setAspect}, {id: aspectID}).then();
        Dispatch(actionType.TEACHER_SHOW, {setData: setTeacher}, {id: teacherID}).then();
        Dispatch(actionType.INSTRUMENT_GET,
            {setData: setInstruments},
            {aspect: aspectID, with: 'indicator'}).then();
    }, []);
    return <>
        <Head title="Penilaian"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BackTo link="/penilaian" icon="arrow-left">PENILAIAN</BackTo>
                </BlockHeadContent>
            </BlockHead>
            <BlockHead>
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h4">PENILAIAN : {aspect.name}</BlockTitle>
                        <p>Nama Guru: {teacher.name} | NIP: {teacher.nip} | Mata Pelajaran: {teacher.subject}</p>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <Block>
                <Row className="g-gs">
                    <Col md="9">
                        <PreviewCard className="ps-3 pe-3">
                            <h6 className="title">{aspect.name} - {instrument ? instrument.name : ""}</h6>
                            <hr/>
                            <p style={{
                                fontWeight: "bold",
                                textAlign: "justify"
                            }}>{instrument ? instrument.desc : ""}</p>
                            {instrument.indicators && instrument.indicators.map((indicator) => {
                                let checked = result.filter((value) => {
                                    return value.instrument === instrument.id && value.indicator.id === indicator.id
                                })
                                return (
                                    <div className="preview-block" key={indicator.id}>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id={indicator.id}
                                                name={instrument.name}
                                                value={indicator.id}
                                                className="custom-control-input"
                                                checked={checked.length === 1}
                                                onChange={() => {
                                                    let value = result.filter((value) => {
                                                        return value.instrument !== instrument.id
                                                    });
                                                    value.push({
                                                        instrument: instrument.id,
                                                        indicator: indicator
                                                    })
                                                    setResult(value);
                                                }}
                                            />
                                            <label className="custom-control-label" style={{textAlign: "justify"}}
                                                   htmlFor={indicator.id}>
                                                {indicator.desc}
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                        </PreviewCard>
                    </Col>
                    <Col md="3">
                        <PreviewCard className="align-items-center">
                            {instruments.map((instrument, key) => (
                                <Button
                                    key={key}
                                    color="primary"
                                    className="m-1"
                                    outline={instrument.id !== buttonState}
                                    onClick={() => {
                                        setInstrument(instrument);
                                        setButtonState(instrument.id);
                                    }}
                                >
                                    {instrument.name}
                                </Button>
                            ))}
                            <Button
                                color="success"
                                className="mb-auto col-12"
                                outline
                                onClick={() => Dispatch(actionType.EVALUATION_STORE, {
                                    formData: {
                                        user: user.id,
                                        teacher: teacherID,
                                        aspect: aspectID,
                                        finish: 0,
                                        result: JSON.stringify(result)
                                    }
                                })}
                            >
                                <span className="align-items-center">SIMPAN</span>
                            </Button>
                        </PreviewCard>
                    </Col>
                </Row>
            </Block>
        </Content>
        <ToastContainer />
    </>
}
export default Add;