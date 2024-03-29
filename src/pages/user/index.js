import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import {Block, BlockHead, BlockHeadContent, BlockTitle, Button, Col, PreviewCard, Row} from "../../components";
import Content from "../../layout/content";
import {actionType, Dispatch} from "../../reducer";
import {Spinner} from "reactstrap";
import {ToastContainer} from "react-toastify";

const User = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        nip: '',
        position: '',
        institution: '',
        address: '',
        nsm: '',
        npsn: '',
        foundation: '',
    });
    const [auth, setAuth] = useState(false);
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
                password_confirmation: resp.password ? resp.password : '',
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
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return <>
        <Head title="Profil"/>
        <Content page="component">
            <Block size="lg">
                <BlockHead>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Profil</BlockTitle>
                        <p>You can make style out your setting related form as per below example.</p>
                    </BlockHeadContent>
                </BlockHead>
                <PreviewCard>
                    <div className="card-head">
                        <h5 className="card-title">Profil Pengguna</h5>
                    </div>
                    <form className="gy-3" onSubmit={(e) => {
                        e.preventDefault();
                        Dispatch(actionType.USER_UPDATE, {
                            formData: formData,
                            setLoading: setLoading,
                        }).then()
                    }}>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">
                                        Nama Lengkap
                                    </label>
                                    <span className="form-note">Nama Lengkap pengguna beserta gelar</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={(e) => handleFormInput(e)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">
                                        Alamat Email
                                    </label>
                                    <span className="form-note">Alamat email pengguna</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => handleFormInput(e)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">
                                        Kata Sandi
                                    </label>
                                    <span className="form-note">Kata Sandi pengguna</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={(e) => handleFormInput(e)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password_confirmation">
                                        Ulangi Sandi
                                    </label>
                                    <span className="form-note">Konfirmasi Kata Sandi</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="password_confirmation"
                                            className="form-control"
                                            value={formData.password_confirmation}
                                            onChange={(e) => handleFormInput(e)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="nip">
                                        NIP
                                    </label>
                                    <span className="form-note">Nomor Induk Kepegawaian</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="nip"
                                            className="form-control"
                                            value={formData.nip}
                                            onChange={(e) => handleFormInput(e)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="position">
                                        Jabatan
                                    </label>
                                    <span className="form-note">Jabatan</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="position"
                                            className="form-control"
                                            value={formData.position}
                                            onChange={(e) => handleFormInput(e)}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Row className="g-3">
                                <Col lg="7" className="offset-lg-5">
                                    <div className="form-group mt-2">
                                        <Button type="submit" color="primary" size="md" disabled={loading}>
                                            {loading ? <Spinner color="light" size="sm"/> : "SIMPAN"}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </form>
                </PreviewCard>
            </Block>
        </Content>
        <ToastContainer/>
    </>
}
export default User