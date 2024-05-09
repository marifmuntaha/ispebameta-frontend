import React, {useContext, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../components";
import {actionType, Dispatch} from "../../reducer";
import {UserContext} from "../user/UserContext";

const Add = ({open, setOpen, setReload}) => {
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
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
        setFormData({
            name: '',
            code: '',
            description: '',
        });
    }
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
                    Dispatch(actionType.SUBJECT_STORE, {
                        formData: formData,
                        setLoading: setLoading,
                        setReload: setReload,
                        toggle: toggle
                    }).then(resp => {

                    });
                }}>
                    <div className="form-group">
                        <Label htmlFor="name" className="form-label">
                            Nama Pelajaran
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Ex. Ilmu Pengetahuan Alam"
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
                                placeholder="Ex. IPA"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="desciption" className="form-label">
                            Diskripsi
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="description"
                                placeholder="Ex. Mata Pelajaran IPA"
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
export default Add