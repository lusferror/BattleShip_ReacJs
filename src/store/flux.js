import { pcBoardInitial, userBoardInitial } from "./initialValues";

const getState = ({getStore,getActions,setStore})=>{
    return {
        store:{
            positionBoard:[],
            showPositionShips:false,
            positionBoardUser:[],
            game:0,

            // these variables inidcate the ships on the board
            ships:{
            portaAviones:{tipo:"PORTA AVIONES",unidades:1,casillas:4,posicion:"horizontal",id:"portaAviones",color:"bg-white text-primary",status:false,cod:"PA"},
            acorazados:{tipo:"ACORAZADOS",unidades:3,casillas:3,posicion:"horizontal",id:"acorazados",color:"bg-white text-primary",status:false,cod:"AC"},
            destructores:{tipo:"DESTRUCTOR",unidades:3,casillas:2,posicion:"horizontal",id:"destructores",color:"bg-white text-primary",status:false,cod:"DE"},
            fragatas:{tipo:"FRAGATA",unidades:2,casillas:1, posicion:"horizontal",id:"fragatas",color:"bg-white text-primary",status:false,cod:"FR"}
            },
            shipsPc:{
                portaAviones:{tipo:"PORTA AVIONES",unidades:1,casillas:4,posicion:"horizontal",id:"portaAviones",color:"bg-white text-primary",status:false,cod:"PA"},
                acorazados:{tipo:"ACORAZADOS",unidades:3,casillas:3,posicion:"horizontal",id:"acorazados",color:"bg-white text-primary",status:false,cod:"AC"},
                destructores:{tipo:"DESTRUCTOR",unidades:3,casillas:2,posicion:"horizontal",id:"destructores",color:"bg-white text-primary",status:false,cod:"DE"},
                fragatas:{tipo:"FRAGATA",unidades:2,casillas:1, posicion:"horizontal",id:"fragatas",color:"bg-white text-primary",status:false,cod:"FR"}
                },
            //these variable indicate the functional states
            shipSelected:"",
            show:false,
            messageModal:false,
            messageModalText:"",
            typeModal:"",
            
            //gameBoard
            gameBoardUser:userBoardInitial(),
            gameBoardPc:pcBoardInitial().board,
            positioShipsPc:pcBoardInitial().pcShips,

            //win
            arrayPositionPc:[],
            arrayPositionUser:[],
            hitUser:0,
            hitPc:0,

        },

        actions:{
            setStore:(store)=>setStore(store),

            changeColor:(ship)=>{
                let ships = getStore().ships;
                ships[ship].color="bg-primary text-white";
                ships[ship].status=true;
                setStore({shipSelected:ships[ship].id})
                for (let boat in ships){
                    if (boat!==ship){
                        ships[boat].color="bg-white text-primary";
                        ships[boat].status=false;
                    }
                }
                setStore({ships:ships});
                getActions().handleShow()
            },

            substractUnit(ship,type){
                let ships=getStore()[type];
                ships[ship].unidades--;
            },

            handleShow: () => setStore({show:true}),

            handleClose: (value,id) => {
                let ships = getStore().ships;
                ships[id].posicion=value;
                setStore({show:false,ships:ships})  
            },

            buttonModalClose(){
                setStore({show:false,messageModal:false})
            },

            messageModal(validation,message,type){
                setStore({messageModal:validation, messageModalText:message,typeModal:type,show:validation});
            },

            shipsPositionPc(){
                let board = [] 
                const init = getStore().gameBoardPc;
                init.map(element=>{
                    board.push(element)
                })
                let ships = getStore().shipsPc;
                let positioShipsPc = getStore().positioShipsPc;
                positioShipsPc.forEach(element => {
                    const i = element.x;
                    const j = element.y;
                    const shipSelected = getActions().selectShipPc()
                    const alignShipsPc = getActions().positionShipPc()
                    if(board[i][j].color==0 ){
                        if(ships[shipSelected].unidades>0){
                                let ocupado=false;
                                if(alignShipsPc==="horizontal"){
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
                                if(!ocupado)getActions().substractUnit(shipSelected,'shipsPc');
                                // actions.messageModal(ocupado,"La posicion que quieres elegir se encuentra ocupada")
        
                                setStore({gameBoardPc:board})
                                
                        }

                    }
                    
                });
            },
            pcGameWin(){
                let gamePositionWin=[]
                                let gamePosition = getStore().gameBoardPc
                                gamePosition.map((element,index)=>{
                                    element.map((e,i)=>{
                                        if (e.color==1)gamePositionWin.push({x:index,y:i})
                                    })
                                })
                                setStore({arrayPositionPc:gamePositionWin})
            },
            selectShipPc(){
                let shipType=""
                const option = Math.floor(Math.random()*4)
                switch ( option){
                    case 0:
                        shipType="portaAviones";
                        break;
                    case 1:
                        shipType="acorazados";
                        break;
                    case 2:
                        shipType="destructores";
                        break;
                    case 3:
                        shipType="fragatas";
                        break;
                };
                return shipType;
            },

            positionShipPc(){
                let position=""
                const option = Math.floor(Math.random()*2)
                switch ( option){
                    case 0:
                        position="horizontal";
                        break;
                    case 1:
                        position="vertical";
                        break;
                };
                return position;
            },

            userGameWin(){
                let gamePositionWin=[]
                const {gameBoardUser} = getStore()
                gameBoardUser.map((element,index)=>{
                    element.map((e,i)=>{
                        if (e.color==1)gamePositionWin.push({x:index,y:i})
                    })
                })
                setStore({arrayPositionUser:gamePositionWin})
            },

            puntoPc:()=>{
                const {hitPc} = getStore()
                setStore({hitPc:hitPc+1})
                console.log(getStore().hitPc)
            },

            puntoUser(){
                const {hitUser} = getStore()
                setStore({hitUser:hitUser+1})
                console.log(getStore().hitUser)
            },

            reset(){
                console.log("Esta en el reset")
                setStore({
                  
                    
                        positionBoard:[],
                        showPositionShips:false,
                        positionBoardUser:[],
                        game:0,
                        gameStart:false,
            
                        // these variables inidcate the ships on the board
                        ships:{
                        portaAviones:{tipo:"PORTA AVIONES",unidades:1,casillas:4,posicion:"horizontal",id:"portaAviones",color:"bg-white text-primary",status:false,cod:"PA"},
                        acorazados:{tipo:"ACORAZADOS",unidades:3,casillas:3,posicion:"horizontal",id:"acorazados",color:"bg-white text-primary",status:false,cod:"AC"},
                        destructores:{tipo:"DESTRUCTOR",unidades:3,casillas:2,posicion:"horizontal",id:"destructores",color:"bg-white text-primary",status:false,cod:"DE"},
                        fragatas:{tipo:"FRAGATA",unidades:2,casillas:1, posicion:"horizontal",id:"fragatas",color:"bg-white text-primary",status:false,cod:"FR"}
                        },
                        shipsPc:{
                            portaAviones:{tipo:"PORTA AVIONES",unidades:1,casillas:4,posicion:"horizontal",id:"portaAviones",color:"bg-white text-primary",status:false,cod:"PA"},
                            acorazados:{tipo:"ACORAZADOS",unidades:3,casillas:3,posicion:"horizontal",id:"acorazados",color:"bg-white text-primary",status:false,cod:"AC"},
                            destructores:{tipo:"DESTRUCTOR",unidades:3,casillas:2,posicion:"horizontal",id:"destructores",color:"bg-white text-primary",status:false,cod:"DE"},
                            fragatas:{tipo:"FRAGATA",unidades:2,casillas:1, posicion:"horizontal",id:"fragatas",color:"bg-white text-primary",status:false,cod:"FR"}
                            },
                        //these variable indicate the functional states
                        shipSelected:"",
                        show:false,
                        messageModal:false,
                        messageModalText:"",
                        
                        //gameBoard
                        gameBoardUser:userBoardInitial(),
                        gameBoardPc:pcBoardInitial().board,
                        positioShipsPc:pcBoardInitial().pcShips,
            
                        //win
                        arrayPositionPc:[],
                        arrayPositionUser:[],
                        hitUser:0,
                        hitPc:0,
            
                    
                })

                console.log(getStore().gameBoardPc)
            }

        }
    }
}

export default getState