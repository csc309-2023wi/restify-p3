import "./price_input.css";

function PriceInput({ onChangeHandler }) {
    return (
        <>
            <button className="btn-price"></button>
            <input
                style={{ padding: "unset" }}
                type="number"
                step="0.01"
                className="rounded-r"
                onChange={onChangeHandler}
            />
        </>
    );
}

export default PriceInput;
