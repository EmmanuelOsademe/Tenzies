import { useState, useEffect} from 'react'
import Die from "./components/Die"
import {nanoid} from 'nanoid'
import Confetti from "react-confetti";

export default function App(){
    const allNewDice = () =>{
        const newDie = [];
        for(let i = 0; i < 10; i++){
            newDie.push({key: nanoid(), value: Math.ceil(Math.random() * 6), isHeld:false})
        }
        return newDie
    }

    const [dice, setDice] = useState(() =>allNewDice());
    const [tenzies, setTenzies] = useState(false);
    
    useEffect(()=> {
        const firstValue = dice[0].value;
        if(dice.every(die => die.isHeld && die.value === firstValue)){
            setTenzies(true);
            console.log("You won!");
        }
    }, [dice]
    );

    const dieElements = dice.map(die =>{
        return <Die 
            key={die.key} 
            value={die.value} 
            isHeld={die.isHeld}
            holdDice={() =>holdDice(die.key)}
        />
    })

    function rollDice(){
        if(tenzies){
            setDice(allNewDice());
            setTenzies(false);
        }else{
            setDice(prevDice => prevDice.map(die => {
                return !die.isHeld ? {...die, value: Math.ceil(Math.random() *6)} : die;
            }));
        }
    }

    function holdDice(id){
        setDice(prevDice => prevDice.map(die => {
                return die.key === id ? {...die, isHeld: !die.isHeld} : die;
            })
        )
    }


    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='die--container'>
                {dieElements}
            </div>
            <button onClick={rollDice} className='roll--dice'>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}