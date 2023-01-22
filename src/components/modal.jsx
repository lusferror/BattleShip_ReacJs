import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import ButtonsPosition from "./buttonsPosition";

const ModalPosition = () => {
    const { store, actions } = useContext(Context)
    return (
        <Modal show={store.show} onHide={actions.buttonModalClose} backdrop="static"
        keyboard={false}>
            <Modal.Header closeButton={actions.handleClose}>
                <Modal.Title className="text-center">{store.messageModal?<></>:"Choose the postion"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-auto">
                {store.messageModal?<div className={"alert "+store.typeModal} >{store.messageModalText}</div>:<ButtonsPosition actions={actions} store={store}/>}
            </Modal.Body>
            <Modal.Header className="d-flex justify-contetn-center">
                {store.messageModal?<></>:"If you want to change again postion, press ship type"}
            </Modal.Header>
        </Modal>
    )
}

export default ModalPosition;