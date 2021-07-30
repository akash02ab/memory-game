const Status = ({ time, moves, score, restart }) => {    
    return (
        <div className="status">
            <p>{`Time: ${time}`}</p>
            <p>{`Moves: ${moves}`}</p>
            <p>{`Score: ${score}`}</p>
            <button onClick={restart}>Restart</button>
        </div>
    );
}

export default Status;