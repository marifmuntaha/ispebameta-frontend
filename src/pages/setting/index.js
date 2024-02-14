import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {Block, BlockHead, BlockHeadContent, BlockTitle, Button, Col, PreviewCard, Row} from "../../components";
import {actionType, Dispatch} from "../../reducer";
import {ToastContainer} from "react-toastify";
import {Spinner} from "reactstrap";

const Setting = () => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingLogo, setLoadingLogo] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        role: '',
        nip: '',
        position: '',
        institution: '',
        address: '',
        nsm: '',
        npsn: '',
        foundation: '',
    });
    const [formLogo, setFormLogo] = useState(null);
    const [auth, setAuth] = useState(false);
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        Dispatch(actionType.AUTH_INFO, {
            setData: setFormData,
            setAuth: setAuth
        }).then(resp => {
            setFormData({
                id: resp.id ? resp.id : 0,
                name: resp.name ? resp.name : '',
                email: resp.email ? resp.email : '',
                password: resp.password ? resp.password : '',
                role: resp.role ? resp.role : '',
                nip: resp.nip ? resp.nip : '',
                position: resp.position ? resp.position : '',
                institution: resp.institution ? resp.institution : '',
                address: resp.address ? resp.address : '',
                nsm: resp.nsm ? resp.nsm : '',
                npsn: resp.npsn ? resp.npsn : '',
                foundation: resp.foundation ? resp.foundation : '',
            });
        });
    }, []);
    return <>
        <Head title="Pengarturan"/>
        <Content page="component">
            <Block size="lg">
                <BlockHead>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Pengaturan</BlockTitle>
                        <p>You can make style out your setting related form as per below example.</p>
                    </BlockHeadContent>
                </BlockHead>
                <PreviewCard>
                    <div className="card-head">
                        <h5 className="card-title">Informasi Madrasah</h5>
                    </div>
                    <form className="gy-3" onSubmit={(e) => {
                        e.preventDefault();
                        Dispatch(actionType.USER_UPDATE, {
                            formData: {
                                id: formData.id,
                                image: formLogo
                            },
                            setLoading: setLoadingLogo,
                        }).then()
                    }}>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label">Logo Madrasah</label>
                                    <span className="form-note">Logo madrasah akan ditampilkan dihalaman cetak</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => {
                                                    setFormLogo(e.target.files[0]);
                                                }}
                                            />
                                            <div className="input-group-append">
                                                <Button type="submit" outline color="primary" className="btn-dim" disabled={loadingLogo}>
                                                    {loadingLogo ? <Spinner color="light" size="sm"/> : "SIMPAN"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>
                    <form className="gy-3" onSubmit={(e) => {
                        e.preventDefault();
                        Dispatch(actionType.USER_UPDATE, {
                            formData: formData,
                            setLoading: setLoadingSubmit,
                        }).then()
                    }}>
                            <Row className="g-3 align-center">
                                <Col lg="5">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="foundation">
                                            Nama Yayasan
                                        </label>
                                        <span className="form-note">Nama yayasan akan ditampilkan dihalaman cetak</span>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                name="foundation"
                                                className="form-control"
                                                value={formData.foundation}
                                                onChange={(e) => handleFormInput(e)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3 align-center">
                                <Col lg="5">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="institution">
                                            Nama Madrasah
                                        </label>
                                        <span
                                            className="form-note">Nama madrasah akan ditampilkan dihalaman cetak</span>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                name="institution"
                                                className="form-control"
                                                value={formData.institution}
                                                onChange={(e) => handleFormInput(e)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3 align-center">
                                <Col lg="5">
                                    <div className="form-group">
                                        <label className="form-label">NSM</label>
                                        <span className="form-note">Nomor Statistik Madrasah.</span>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                name="nsm"
                                                className="form-control"
                                                value={formData.nsm}
                                                onChange={(e) => handleFormInput(e)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3 align-center">
                                <Col lg="5">
                                    <div className="form-group">
                                        <label className="form-label">NPSN</label>
                                        <span className="form-note">Nomor Pokok Sekolah Nasional</span>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                name="npsn"
                                                className="form-control"
                                                value={formData.npsn}
                                                onChange={(e) => handleFormInput(e)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3 align-center">
                                <Col lg="5">
                                    <div className="form-group">
                                        <label className="form-label">Alamat</label>
                                        <span
                                            className="form-note">Alamat madrasah akan ditampilkan dihalaman cetak</span>
                                    </div>
                                </Col>
                                <Col lg="7">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={(e) => handleFormInput(e)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="g-3">
                                <Col lg="7" className="offset-lg-5">
                                    <div className="form-group mt-2">
                                        <Button type="submit" color="primary" size="md" disabled={loadingSubmit}>
                                            {loadingSubmit ? <Spinner color="light" size="sm"/> : "SIMPAN"}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                </PreviewCard>
            </Block>
        </Content>
        <ToastContainer/>
    </>
}
export default Setting