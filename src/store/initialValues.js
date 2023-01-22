// This contain all initial value's gameboards


//This board's user
export function userBoardInitial(){
    let board=[]
    for ( let i=0; i<10;i++){
        let row=[]
        for (let j=0;j<10;j++){
            row.push({color:0,ship:""})
        }
        board.push(row)
    }
    return board
}

//This board's PC
export function pcBoardInitial(){
    let board=[]
    let pcShips=[];
    let duplicate=[]
    for ( let i=0; i<10;i++){
        if(i<9){
            let position = {x:Math.floor(Math.random()*10),y:Math.floor(Math.random()*10)}
            duplicate = pcShips.filter(pos=>pos==position)
            if (duplicate.length===0)pcShips.push(position)
        }
        let row=[]
        for (let j=0;j<10;j++){
            row.push({color:0,ship:""})
        }
        board.push(row)
    }
    // pcShips.forEach(position=>{
    //     board[position.x][position.y].color=1
    // })
    return {board:board,pcShips:pcShips}
}