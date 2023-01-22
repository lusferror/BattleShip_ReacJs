import React from "react";

const Instrucctions = ()=>{
    return(
        <div className="container">
            <h3 className="mb-4 text-primary">WELCOME TO BATTLE SHIP</h3>
            <div>
                <p>Instrucctions:</p>
                <ol>
                    <li>There are 9 ships types</li>
                    <li>Select one type ship</li>
                    <li>You must to choose the positon of your ship</li>
                    <li>When finished positioning press the next button</li>
                    <li>In the gamboard there are four buttons</li>
                    <li>The "Fire" button  you can choose a position by coordinates</li>
                    <li>The "Show Ships" button  show the ships of pc</li>
                    <li>The "End turn" button  ends your turn and pc does play</li>
                    <li>The "Restart" button restarts game </li>
                </ol>
            </div>
        </div>
    )
}

export default Instrucctions;