const Box = ({ svg, visible, correct, index, clickHandler }) => {
    return (
        <div className="box" onClick={(e) => clickHandler(e, index)} >
            <div className={ visible ? correct ? 'box-image correct' : 'box-image' : 'box-image hide' }>
                { svg }
            </div>
        </div>
    );
}

export default Box;