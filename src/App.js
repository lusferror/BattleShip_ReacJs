import './App.css';
import GameBoard from './components/gameBoard.jsx';
import Buttons from './components/buttons.jsx'
import { userBoardInitial, pcBoardInitial } from './initialValues'; // value's boards initial
import { useState } from 'react';

function App() {
  const [positionBoard,setPositionBoard]=useState([]) //this state store the postion of  the button fire 
  const [showPositionShips,setShowPositionShips]= useState(false) // this state turn on or trun off position ship pc's gameboard
  const [positionBoardUser, setPositionBoardUser] = useState([]) // this state saves the position of the pc's game turn
  const [game, setGame] = useState(0) // this state only works to reset the board
  
// This function manually enters the position of the PC board
  function fire(){
    let position=prompt("Ingresa una posicion, recuerda escribir valores del 1 al 10 separados por una ','. Ejemplo: 8,2")
    let result=position.split(",")
    console.log(result)
    let positionFinal=[]
    result.map(i=>{
      positionFinal.push(parseInt(i))
    })
    console.log(positionFinal)
    if(positionFinal[0]>=1 && positionFinal[0]<=10 && positionFinal[1]>=1 && positionFinal[1]<=10){
      setPositionBoard(positionFinal)
    }
    else{
      alert("La posicion ingresada es Incorrecta!!!")
    }
}

// this function show the ship in de board pc
function showShips(){
  if(showPositionShips==true){
    setShowPositionShips(false)
  }
  else{
    setShowPositionShips(true)
  }
}

// This function passes the turn to the PC
function endTurn() {
    let x=Math.floor((Math.random()*10)+1)
    let y=Math.floor((Math.random()*10)+1)
    setPositionBoardUser([x,y])
}

// This function reset both boardgames
function reset(){
      showShips()
      setGame(game+1)
      console.log(game)
    }

  return (
    <div className="">
      <h1 className='text-center mt-3 fst-italic text-primary text-decoration-underline'>BATTLE SHIP</h1>
      <div className='mt-3 d-flex justify-content-center'>
        <div className='me-5' >
          <h2 className='text-center'> Board PC </h2>
          <GameBoard board={pcBoardInitial} player={"pc"} position={positionBoard} showShips={showPositionShips}
          reset={pcBoardInitial} game={game}/>
        </div>
        <div className='justify-content-center'>
          <h2 className='text-center'> Board User </h2>
          <GameBoard board={userBoardInitial} player={"user"} positionUser={positionBoardUser} reset={userBoardInitial} game={game}/>
        </div>
        <div className='col-1 ms-3 my-auto'>
          <Buttons fire={fire} showShips={showShips} showShipsState={showPositionShips} endTurn={endTurn} reset={reset}/>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-4 border border-secondary col-3 mx-auto p-4 rounded-4 border-2'>
        <div className='border bg-secondary ' style={{width:"20px",height:"20px"}}></div> Position selected
        <div className='border bg-success ms-3' style={{width:"20px",height:"20px"}}></div> Miss
        <div className='border bg-danger ms-3' style={{width:"20px",height:"20px"}}></div> Hit
      </div>
    </div>
  );
}

export default App;
