import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../components";
import {actionType, Dispatch} from "../../reducer";
import {useParams} from "react-router-dom";

const Edit = ({open, setOpen, setReload, instrument}) => {
    const {aspectID} = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        aspect: aspectID,
        name: '',
        desc: ''
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
            id: instrument.id || 0,
            aspect: aspectID || 0,
            name: instrument.name || '',
            desc: instrument.desc || ''
        })
    }, [instrument]);
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
                    Dispatch(actionType.INSTRUMENT_UPDATE, {
                        formData: formData,
                        setLoading: setLoading,
                        setReload: setReload,
                        toggle: toggle
                    }).then()
                }}>
                    <div className="form-group">
                        <Label for="name" className="form-label">
                            Kode Instrumen
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
                        <Label htmlFor="desc" className="form-label">
                            Diskripsi
                        </Label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                name="desc"
                                value={formData.desc}
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