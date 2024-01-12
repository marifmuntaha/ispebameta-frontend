import React, {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../components";
import {actionType, Dispatch} from "../../reducer";

const Add = ({open, setOpen, setReload}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        number: 0,
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
        setFormData({
            number: 0,
            name: '',
            desc: ''
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
                    Dispatch(actionType.ASPECT_STORE, {
                        formData: formData,
                        setLoading: setLoading,
                        setReload: setReload,
                        toggle: toggle
                    }).then();
                }}>
                    <div className="form-group">
                        <Label htmlFor="number" className="form-label">
                            Nomor Urut
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="number"
                                placeholder="Ex. 1, 2, 3"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="name" className="form-label">
                            Nama
                        </Label>
                        <div className="form-control-wrap">
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Ex. RENCANA PEMBELAJARAN"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="desc" className="form-label">Diskripsi</Label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                name="desc"
                                placeholder="Ex. ASPEK RENCANA PEMBELAJARAN"
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