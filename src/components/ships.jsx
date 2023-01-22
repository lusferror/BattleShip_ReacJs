import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Ships = ({ship}) =>{
    const {store, actions}=useContext(Context)
    const {changeColor} = actions 
    return(
        <div className={"border border-2 text-center rounded-4 p-3 border-info  fw-bold w-75 mx-auto my-3 d-flex "+ship.color}  
        id={ship.id} role="button" onClick={()=>changeColor(ship.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className=" col-10">{ship.tipo}</div> 
            <div><span className="badge rounded-pill text-bg-dark">{ship.unidades}</span></div>
        </div>
    )
}

export default Ships;