// This contain all initial value's gameboards

import { Collapse } from "bootstrap"

//This board's user
export function userBoardInitial(){
    let board=[]
    for ( let i=0; i<10;i++){
        let row=[]
        for (let j=0;j<10;j++){
            row.push(0)
        }
        board.push(row)
    }
    return board
}

//This board's PC
export function pcBoardInitial(){
    let board=[]
    for ( let i=0; i<10;i++){
        let row=[]
        for (let j=0;j<10;j++){
            row.push(Math.floor(Math.random()*2))
        }
        board.push(row)
    }
    return board
}