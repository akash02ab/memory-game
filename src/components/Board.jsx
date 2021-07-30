import Box from './Box';
import Icon from './Icons';

const boardSize = 16;
let index = [];

for(let i=0; i<boardSize; i++) {
    index.push(i);
}

index.sort(() => 0.5 - Math.random());

let board = Array(boardSize).fill('');

const Board = ({ clickHandler, visible, correct }) => {
    const getBoard = () => {
        for(let i=0; i<boardSize; i+=2) {
            let svg = <Icon svgNo={i / 2 + 1} />
            
            board[index[i]] = <Box svg={svg} visible={visible[i]} correct={correct[i]} index={i} clickHandler={clickHandler} key={i}/>;
            
            board[index[i + 1]] = <Box svg={svg} visible={visible[i + 1]} correct={correct[i+1]} index={i+1} clickHandler={clickHandler} key={i + 1}/>;
        }

        return board;
    }

    return (
        <div className="board">
            { getBoard() }
        </div>
    );
}

export default Board;