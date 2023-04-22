import "./price_input.css";

function PriceInput({ onChangeHandler }) {
    return (
        <>
            <button className="btn-price"></button>
            <input type="number" className="rounded-r" onChange={onChangeHandler} />
        </>
    );
}

export default PriceInput;
