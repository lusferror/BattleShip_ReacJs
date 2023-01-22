import React, { useEffect } from "react";
import GameBoard from "../components/gameBoard.jsx";
import { useContext } from "react";
import { Context } from "../store/appContext";
import {  userBoardInitial } from "../store/initialValues.js";
import { Link } from "react-router-dom";
import Ships from "../components/ships.jsx";
import ModalPosition from "../components/modal.jsx";
import { ButtonGroup } from "react-bootstrap";
import Instrucctions from "../components/instrucctions.jsx";



//This page let selecction ships of player
export const ShipsSelecctions = ()=>{
    const {store , actions} = useContext(Context)
    const {positionBoardUser} = store
    const {game} = store
    const {ships} = store
    const {portaAviones} = ships
    const {acorazados} = ships
    const {destructores} = ships
    const {fragatas} = ships

    useEffect(()=>{
        if(!store.gameStart){
            actions.messageModal(true,<Instrucctions/>,"",true)
            actions.setStore({gameStart:true})
        }
    },[])

    // const [color,setColor]=useState({portaAviones:})

    return(
        <div className="container bg-white mt-3 shadow-lg p-2">
            <div className="text-center my-4"><h1 >Chose the position of your Ships</h1></div>
            <div className="d-flex justify-content-center ">
                <div className=" col my-auto">
                    <Ships ship={portaAviones} />
                    <Ships ship={acorazados}/>
                    <Ships ship={destructores}/>
                    <Ships ship={fragatas}/>
                    <ModalPosition/>
                </div>
                <div className="col-8 me-5">
                    <GameBoard board={store.gameBoardUser} player={"user"} positionUser={positionBoardUser} reset={userBoardInitial} game={game} end={false}/>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="col-2 btn btn-success me-3" onClick={e=>{actions.reset();actions.setStore({game:game+1});console.log(store.game)}}>Reset</button>
                <Link to='/' className="col-2"><button  className="btn btn-primary col w-100" onClick={e=>actions.userGameWin()}> Next</button></Link>
            </div>
            
        </div>
    )
}