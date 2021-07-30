import { useState, useEffect } from "react";
import Board from "./Board";
import Status from "./Status";

let stack = [];
let guess = [];
let interval = null;

const Game = () => {
	const [visible, setVisible] = useState(Array(16).fill(false));
    const [correct, setCorrect] = useState(Array(16).fill(false));
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const restart = () => {
        window.location.reload(false);
    }

	const handleWrongGuess = (thisIndex, previousIndex) => {
        let visibleCopy = [...visible];
		visibleCopy[thisIndex] = false;
		visibleCopy[previousIndex] = false;
		setVisible(visibleCopy);
        setMoves(moves + 1);
	};

    const handleCorrectGuess = (thisIndex, previousIndex) => {
        let correctCopy = [...correct];
        correctCopy[thisIndex] = true;
        correctCopy[previousIndex] = true;
        setCorrect(() => {
            if(correctCopy.every(item => item)) {
                setCompleted(true);
                clearInterval(interval);
            }
            return correctCopy;
        });
        setMoves(moves + 1);
        setScore(score + 1);
    }

	const clickHandler = (event, thisIndex) => {
        if(visible[thisIndex]) return;

        guess.push(thisIndex);
        if(guess.length > 2) return;
		
        let visibleCopy = [...visible];
		visibleCopy[thisIndex] = true;
		setVisible(visibleCopy);
		
		if (stack.length === 0) {
			stack.push(thisIndex);
		} 
        else {
			let previousIndex = stack.pop();
			if ((thisIndex % 2 === 0 && thisIndex !== previousIndex - 1) || 
                (thisIndex % 2 === 1 && thisIndex !== previousIndex + 1)) {
				setTimeout(() => {
                    handleWrongGuess(thisIndex, previousIndex);
                }, 500);
			}
            else {
                setTimeout(() => {
                    handleCorrectGuess(thisIndex, previousIndex);
                }, 100);
            }
            setTimeout(() => {
                guess = [];
            }, 500);
		}
	};

    
	return (
		<div className="container">
            <h1>Memory Game</h1>
            <Status time={time} score={score} moves={moves} restart={restart}/>
			{completed ? <p>{`Congratulation! You won in ${moves} and took ${time} seconds.`}</p> : 
                        <Board clickHandler={clickHandler} visible={visible} correct={correct}/>}
		</div>
	);
};

export default Game;
