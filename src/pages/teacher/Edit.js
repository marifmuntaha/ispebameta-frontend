import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, RSelect} from "../../components";
import {actionType, Dispatch} from "../../reducer";

const Edit = ({open, setOpen, setReload, teacher}) => {
    const [loading, setLoading] = useState(false);
    const [subjectOption, setSubjectOption] = useState([]);
    const [subjectSelected, setSubjectSelected] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
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
    }
    useEffect(() => {
        setFormData({
            id: teacher.id || 0,
            name: teacher.name || '',
            nip: teacher.nip || '',
            subject: teacher.subject || 0,
            phone: teacher.phone || '',
        });
        Dispatch(actionType.SUBJECT_GET, {setData: setSubjectOption}, {type: 'select'}).then(resp => {
            setSubjectSelected(() => {
                return resp.filter((item) => {
                    return teacher.subject ? item.value === teacher.subject.id : []
                });
            });
        })
    }, [teacher]);
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
                    Dispatch(actionType.TEACHER_UPDATE, {
                        formData: formData,
                        setLoading: setLoading,
                        setReload: setReload,
                        toggle: toggle
                    }).then()
                }}>
                    <div className="form-group">
                        <Label for="name" className="form-label">
                            Nama Lengkap
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={formData.name}
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
                                value={formData.nip}
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
                                value={formData.phone}
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
export default Edit;