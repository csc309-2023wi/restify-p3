import React from "react";
import "./modal.css";

// import icons
import xWhite from "../../assets/icons/x-white.svg";
import checkWhite from "../../assets/icons/check-white.svg";

function Modal({
    id,
    modalHeader,
    displayState,
    displayStateSetter,
    mainImageContent,
    mainInfoContent,
    createNewAction,
    actionContent,
}) {
    const displayAttr = displayState ? "flex" : "none";
    const imageSection = mainImageContent ? <div className="image-section">{mainImageContent}</div> : null;
    const infoSection = mainInfoContent ? <div className="info-section">{mainInfoContent}</div> : null;
    const createNewButton = createNewAction ? (
        <button className="action-btn create-listing green-dark" onClick={createNewAction}>
            <img src={checkWhite} alt="+" />
        </button>
    ) : null;
    return (
        <div className="modal-backdrop" id={"modal_" + id} key={id} style={{ display: displayAttr }}>
            <div className="modal-container">
                <section className="modal-content">
                    {imageSection}
                    {infoSection}
                </section>

                <aside className="modal-action">
                    <button className="btn-modal-close clickable-on-dark" onClick={() => displayStateSetter(false)}>
                        <img src={xWhite} alt="X" />
                    </button>
                    {createNewButton}
                    <div className="modal-header">
                        <h3>{modalHeader}</h3>
                    </div>
                    <div className="item-container">{actionContent}</div>
                </aside>
            </div>
        </div>
    );
}

export default Modal;
