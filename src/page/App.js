import '../App.css';
import GameBoard from '../components/gameBoard.jsx';
import Buttons from '../components/buttons.jsx'
import { userBoardInitial, pcBoardInitial } from '../store/initialValues'; // value's boards initial
import { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import ModalPosition from '../components/modal';

function App() {
  const { store, actions } = useContext(Context)

  const { positionBoard } = store //this state store the postion of  the button fire 
  const { showPositionShips } = store // this state turn on or trun off position ship pc's gameboard
  const { positionBoardUser } = store // this state saves the position of the pc's game turn
  const { game } = store // this state only works to reset the board
  const { setStore } = actions // this is function set store of context
  const history=useNavigate()

  useEffect(()=>{
    if(!store.gameStart){
      // setStore({gameStart:true})
      history('/selecction')
    }
  },[])

  // This function manually enters the position of the PC board
  function fire() {
    let position = prompt("Enter a position, remember to write values ​​from 1 to 10 separated by a ','. Example: 8,2")
    let result = position.split(",")
    console.log(result)
    let positionFinal = []
    result.map(i => {
      positionFinal.push(parseInt(i))
    })
    console.log(positionFinal)
    if (positionFinal[0] >= 1 && positionFinal[0] <= 10 && positionFinal[1] >= 1 && positionFinal[1] <= 10) {
      setStore({positionBoard:positionFinal})
    }
    else {
      alert("La posicion ingresada es Incorrecta!!!")
    }
  }

  // this function show the ship in de board pc
  function showShips() {
    if (showPositionShips == true) {
      setStore({showPositionShips:false})
    }
    else {
      setStore({showPositionShips:true})
    }
  }

  // This function passes the turn to the PC
  function endTurn() {
    let x = Math.floor((Math.random() * 10) + 1)
    let y = Math.floor((Math.random() * 10) + 1)
    setStore({positionBoardUser:[x, y]})
  }

  // This function reset both boardgames
  function reset() {
    showShips()
    actions.reset()
    setStore({game:game + 1})
  }

  function prueba(){
    console.log("mensaje")
  }


  return (
    <div className=" bg-white">
      <div className='d-flex'>
      <h1 className='col-11 text-center mt-3 fst-italic text-primary text-decoration-underline'>BATTLE SHIP</h1>
      </div>
      <div className='mt-3 d-flex justify-content-center'>
        <div className='me-5' >
          {/* ------------------------- BOARD PC ---------------------------------------------------------------- */}
          <h2 className='text-center'> Board PC </h2>
          <GameBoard board={store.gameBoardPc} player={"pc"} position={positionBoard} showShips={showPositionShips}
            reset={pcBoardInitial} game={game} />
        </div>
        <div className='justify-content-center'>
          {/* -------------------------- BOARD USER ------------------------------------------------------------------------------------ */}
          <h2 className='text-center'> Board User </h2>
          <GameBoard board={store.gameBoardUser} player={"user"} positionUser={positionBoardUser} reset={userBoardInitial} game={game} endTurn={endTurn} end={true}/>
        </div>
        <div className='col-1 ms-3 my-auto'>
          <Buttons fire={fire} showShips={showShips} showShipsState={showPositionShips} endTurn={endTurn} reset={reset} />
        </div>
      </div>
      <div className='d-flex justify-content-center mt-1 border border-secondary col-5 mx-auto p-2 rounded-4 border-2'>
        <div className='border bg-secondary ' style={{ width: "20px", height: "20px" }}></div> Position selected
        <div className='border bg-success ms-3' style={{ width: "20px", height: "20px" }}></div> Miss
        <div className='border bg-danger ms-3' style={{ width: "20px", height: "20px" }}></div> Hit
      </div>
      <ModalPosition/>
    </div>
  );
}

export default App;
