import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../components";
import {actionType, Dispatch} from "../../reducer";

const Edit = ({open, setOpen, setReload, subject}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        code: '',
        description: '',
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
            id: subject.id || 0,
            name: subject.name || '',
            code: subject.code || '',
            description: subject.description || '',
        })
    }, [subject]);
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
                    Dispatch(actionType.SUBJECT_UPDATE, {
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
                        <Label htmlFor="code" className="form-label">
                            Kode
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="description" className="form-label">
                            Diskripsi
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="description"
                                value={formData.description}
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
                            {loading ? <Spinner size="sm" color="light" /> : 'SIMPAN' }
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    </>
}
export default Edit;