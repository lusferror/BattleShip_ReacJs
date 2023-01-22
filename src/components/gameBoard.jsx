import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
// import { userBoardInitial, pcBoardInitial } from "../initialValues";

// This is de componet gameboard for both players (user and pc)

const GameBoard = (props) => {

    const { store , actions } = useContext(Context)
    const  [gameBoard,setGameBoard] =useState(props.board);// this state stores value of the board
    const { ships , shipSelected } = store
    const player=props.player;
    const [end,setEnd] =useState(props.end)
    useEffect(()=>{
        if(props.player=="pc"){
            actions.shipsPositionPc()
            console.log(store.arrayPositionPc.length)
            actions.pcGameWin()
        }
    },[])
    //this function is of the fire button
    useEffect(()=>{
        if(Array.isArray(props.position) && props.position.length>0){
            valueChange(props.position[0]-1,props.position[1]-1)
        }
    },[props.position])

    // this function is from the ShowShips 
    useEffect(()=>{
        if(props.showShips===true){
            console.log("muestra barcos: ",props.showShips)
            let matrix=[]
            gameBoard.map((item, index)=>{
                let row=[]
               item.map((i,j)=>{
                    if (i.color==1){
                        row.push({color:4,ship:i.ship})
                    }
                    else{
                        row.push(i)
                    }
               })
               matrix.push(row)
            })
            setGameBoard(matrix)
        }    
        else if(props.showShips==false){
                let matrix=[]
                gameBoard.map((item, index)=>{
                    let row=[]
                   item.map((i,j)=>{
                        if (i.color==4){
                            row.push({color:1,ship:i.ship})
                        }
                        else{
                            row.push(i)
                        }
                   })
                   matrix.push(row)
                })
            setGameBoard(matrix)
        }
    },[props.showShips])

    //this function is from the pc's truns game
    useEffect(()=>{
        if(Array.isArray(props.positionUser) && props.positionUser.length>0 && end){
            if(gameBoard[props.positionUser[0]-1][props.positionUser[1]-1].color==1 || gameBoard[props.positionUser[0]-1][props.positionUser[1]-1].color==0){
                valueChange(props.positionUser[0]-1,props.positionUser[1]-1,true)
            }
            else{
                console.log(props.positionUser)
                props.endTurn()
            }
        }
    },[props.positionUser])

    // this function is from the reset's button
    useEffect(()=>{
        setGameBoard(props.board)
    },[props.game])

    //this function change the values of postion's boards
    function valueChange(i,j,click){
        
        let board=[]
        gameBoard.map(item=>{
            board.push(item)
        })
        if(props.player=="user" ){
            if(board[i][j].color==1 && click){
                board[i][j].color=2
                actions.puntoUser()
                const win = store.arrayPositionUser;
                const puntos = store.hitUser
                console.log("Puntos: ",win.length)
                if(win.length==puntos) {
                    actions.messageModal(true,"SORRY, YOU LOSE","alert-danger")
                    setEnd(false);
                }
            }
            else if(board[i][j].color==0 && click){
                board[i][j].color=3
            }
            else if(board[i][j].color==0 && !click){
                if(ships[shipSelected].unidades>0){
                        let ocupado=false;
                        if(ships[shipSelected].posicion==="horizontal"){
                            for(let k=0 ; k<=(ships[shipSelected].casillas-1) ;k++){
                                if((k+j)>9){
                                    let l=9-(k+j)
                                    if(board[i][j+l].color!==0){
                                        ocupado=true;
                                        console.log(ocupado)
                                    }
                                }
                                else if(board[i][j+k].color!==0){
                                    ocupado=true;
                                    console.log(ocupado)
                                }
                            }
                            if (!ocupado){
                                for(let k=0 ; k<=(ships[shipSelected].casillas-1) ;k++){
                                    if((k+j)>9){
                                        let l=9-(k+j);
                                        board[i][j+l].color=1;
                                        board[i][j+l].ship=ships[shipSelected].cod+"-"+ships[shipSelected].unidades;
                                    }
                                    else{
                                        board[i][j+k].color=1;
                                        board[i][j+k].ship=ships[shipSelected].cod+"-"+ships[shipSelected].unidades
                                    }
                                }

                            }
                        }
                        else{
                            for(let k=0 ; k<=(ships[shipSelected].casillas-1) ;k++){
                                if((k+i)>9){
                                    let l=9-(k+i);
                                    if(board[i+l][j].color!==0){
                                        ocupado=true;
                                    }
                                }
                                else{
                                    if(board[i+k][j].color!==0){
                                        ocupado=true;
                                    }
                                }
                            }
                            if(!ocupado){

                                for(let k=0 ; k<=(ships[shipSelected].casillas-1) ;k++){
                                    if((k+i)>9){
                                        let l=9-(k+i);
                                        console.log("valor i: ",i)
                                        board[i+l][j].color=1;
                                        board[i+l][j].ship=ships[shipSelected].cod+"-"+ships[shipSelected].unidades;
                                    }
                                    else{
                                        board[i+k][j].color=1;
                                        board[i+k][j].ship=ships[shipSelected].cod+"-"+ships[shipSelected].unidades;
                                    }
                                }
                            }
                        }
                        if(!ocupado)actions.substractUnit(shipSelected,"ships");
                        actions.messageModal(ocupado,"The position you choose is occupied","alert-danger")

                }
                
            }

        }
        else if(props.player=="pc"){
            if(board[i][j].color==1 || board[i][j].color==4){
                board[i][j].color=2
                actions.puntoPc()
                const win = store.arrayPositionPc;
                const puntos = store.hitPc
                console.log("Puntos: ",win.length)
                if(win.length==puntos) actions.messageModal(true,"CONGRATULATION, YOU WIN","alert-success")
                
            }
            else if(board[i][j].color==0){
                board[i][j].color=3
            }
        }
        setGameBoard(board)
    }

    //this function change the color position
    function cellColor(value){
          if(value==0 || (value==1 && props.player=="pc")){//sin seleccionar
            return({backgroundColor:"rgb(207, 207, 207)"})
        }
        else if(value==1){//selected
            return({backgroundColor:"gray"})
        }
        else if (value==2){//asert hit
            return({backgroundColor:"red"})
        }
        else if (value==4){//show boats
            return({border:"solid 2px yellow",backgroundColor:"rgb(207, 207, 207)"})
        }
        else if (value==3){//miss
            return({backgroundColor:"green"})
        }
    }

    return (
        <div className="" >
            <table className="table table-bordered">
                <thead style={{backgroundColor:"gray"}}>
                    <tr>
                        <th></th>
                    {gameBoard[0].map((data,index)=>{
                        return(
                         <th className="px-3 py-0" key={index}>{index+1}</th>   
                        )
                    })}
                    </tr>
                </thead>
                <tbody>
                   
                        {gameBoard.map((row,index)=>{
                            return(
                                <> <tr>
                                    <th className="" style={{backgroundColor:"gray"}} key={index}>{index+1}</th>
                                    {row.map((cell,i)=>{
                                        return(
                                            <td style={cellColor(cell.color)} onClick={()=>valueChange(index,i,false)} key={i} role="button">{player=="pc"&&cell.color!=1?cell.ship:player=="user"?cell.ship:<></>}</td>
                                        )
                                    })}
                                    </tr>
                                </>
                            )
                        })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default GameBoard;