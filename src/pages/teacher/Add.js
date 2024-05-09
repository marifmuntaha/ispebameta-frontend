import React, {useContext, useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, RSelect} from "../../components";
import {actionType, Dispatch} from "../../reducer";
import {UserContext} from "../user/UserContext";

const Add = ({open, setOpen, setReload}) => {
    const user = useContext(UserContext);
    const [subjectOption, setSubjectOption] = useState([]);
    const [subjectSelected, setSubjectSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user: user.id,
        name: '',
        nip: '',
        subject: 0,
        phone: '',
    });
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const toggle = () => {
        setOpen({
            add: false,
            edit: false
        });
        setFormData({
            user: user.id,
            name: '',
            nip: '',
            subject: 0,
            phone: '',
        });
        setSubjectSelected([]);
    }
    useEffect(() => {
        Dispatch(actionType.SUBJECT_GET, {setData: setSubjectOption}, {type: 'select'}).then();
    }, []);
    return <>
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader
                toggle={toggle}
                close={
                    <button className="close" onClick={toggle}>
                        <Icon name="cross"/>
                    </button>
                }
            >
                TAMBAH
            </ModalHeader>
            <ModalBody>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    Dispatch(actionType.TEACHER_STORE, {
                        formData: formData,
                        setLoading: setLoading,
                        setReload: setReload,
                        toggle: toggle
                    }).then(resp => {

                    });
                }}>
                    <div className="form-group">
                        <Label htmlFor="name" className="form-label">
                            Nama Lengkap
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Ex. Eka Maftukhatul Khoeryah"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="nip" className="form-label">
                            NIP
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="nip"
                                placeholder="Ex. 12399484938"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="subject" className="form-label">
                            Mata Pelajaran
                        </Label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={subjectOption}
                                value={subjectSelected}
                                onChange={(e) => {
                                    setFormData({...formData, subject: e.value})
                                    setSubjectSelected(e);
                                }}
                                placeholder="Pilih Pelajaran"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="phone" className="form-label">
                            Nomor WA
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="phone"
                                placeholder="Ex. 6282229366500"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button
                            size="lg"
                            className="btn-block"
                            type="submit"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" color="light"/> : 'SIMPAN'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    </>
}
export default Add