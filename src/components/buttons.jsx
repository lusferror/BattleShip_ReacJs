import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// These are the play buttons
const Buttons = (props) => {
    const {actions} = useContext(Context)

    return (
        <div className=''>
            <div>
                <button className='btn btn-danger w-100 mb-3' type='button' onClick={()=>props.fire()}>Fire</button>
            </div>
            <div>
                <button className='btn btn-warning w-100 mb-3' type='button' onClick={()=>props.showShips()}>{!props.showShipsState? <>Show Ships</>:<>Hide Ships</>}</button>
            </div>
            <div>
                <button className='btn btn-primary w-100 mb-3' type='button' onClick={()=>props.endTurn()}>End Turn</button>
            </div>
            <div>
                <Link to='/selecction'><button className='btn btn-success w-100 mb-3' type='button' onClick={()=>props.reset()}>Restar</button></Link>
            </div>
        </div>
    )
}

export default Buttons;