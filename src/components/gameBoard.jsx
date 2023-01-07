import React, { useEffect } from "react";
import { useState } from "react";
import { userBoardInitial, pcBoardInitial } from "../initialValues";

// This is de componet gameboard for both players (user and pc)

const GameBoard = (props) => {

    const  [gameBoard,setGameBoard] =useState(props.board());// this state stores value of the board
    
    //this function is of the fire button
    useEffect(()=>{
        if(Array.isArray(props.position) && props.position.length>0){
            valueChange(props.position[0]-1,props.position[1]-1)
        }
    },[props.position])

    // this function is from the ShowShips 
    useEffect(()=>{
        if(props.showShips==true){
            let matrix=[]
            gameBoard.map((item, index)=>{
                let row=[]
               item.map((i,j)=>{
                    if (i==1){
                        row.push(4)
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
                        if (i==4){
                            row.push(1)
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
        if(Array.isArray(props.positionUser) && props.positionUser.length>0){
            valueChange(props.positionUser[0]-1,props.positionUser[1]-1,true)
        }
    },[props.positionUser])

    //this function is from the reset's button
    useEffect(()=>{
        setGameBoard(props.board())
    },[props.game])

    //this function change the values of postion's boards
    function valueChange(i,j,click){
      
        let board=[]
        gameBoard.map(item=>{
            board.push(item)
        })
        if(props.player=="user" ){
            if(board[i][j]==1 && click){
                board[i][j]=2
            }
            else if(board[i][j]==0 && click){
                board[i][j]=3
            }
            else if(board[i][j]==0 && !click){
                board[i][j]=1
            }

        }
        else if(props.player=="pc"){
            if(board[i][j]==1 || board[i][j]==4){
                board[i][j]=2
            }
            else if(board[i][j]==0){
                board[i][j]=3
            }
        }
        setGameBoard(board)
    }

    //this function change the color position
    function cellColor(value){
          if(value==0 || (value==1 && props.player=="pc")){
            return({backgroundColor:"rgb(207, 207, 207)"})
        }
        else if(value==1){
            return({backgroundColor:"gray"})
        }
        else if (value==2){
            return({backgroundColor:"red"})
        }
        else if (value==4){
            return({border:"solid 2px yellow",backgroundColor:"rgb(207, 207, 207)"})
        }
        else if (value==3){
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
                         <th className="px-3 py-0" >{index+1}</th>   
                        )
                    })}
                    </tr>
                </thead>
                <tbody>
                   
                        {gameBoard.map((row,index)=>{
                            return(
                                <> <tr>
                                    <th className="" style={{backgroundColor:"gray"}}>{index+1}</th>
                                    {row.map((cell,i)=>{
                                        return(
                                            <td style={cellColor(cell)} onClick={()=>valueChange(index,i,false)}>{}</td>
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