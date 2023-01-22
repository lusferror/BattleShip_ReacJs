import React from "react";
import { Button } from "react-bootstrap";

const ButtonsPosition = ({actions,store}) => {
    return (
        <>
            <Button variant="success" onClick={e => actions.handleClose(e.target.value, store.shipSelected)} value="horizontal">
                Horizontal
            </Button>
            <Button variant="primary" onClick={e => actions.handleClose(e.target.value, store.shipSelected)} className="ms-5" value="vertical">
                Vertical
            </Button>
        </>
    )
}

export default ButtonsPosition;