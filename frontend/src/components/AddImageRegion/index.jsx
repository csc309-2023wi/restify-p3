import { useRef } from "react";

import "./add_image_region.css";

// import icons
import imageUploadIcon from "../../assets/icons/upload-white.svg";

function AddImageRegion({ fileHandler }) {
    const filePickerRef = useRef(null);

    const handleDrop = (event) => {
        event.preventDefault();
        let file;
        const DTIL = event.dataTransfer?.items;
        if (DTIL) {
            if (DTIL[0].kind === "file") {
                file = DTIL[0].getAsFile();
            }
        } else {
            file = event.dataTransfer.files[0];
        }
        fileHandler(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFilePicker = (event) => {
        const file = event.target.files[0];
        fileHandler(file);
    };

    const passButtonClickToInput = () => {
        filePickerRef.current.click();
    };

    return (
        <button className="add-image" onDrop={handleDrop} onDragOver={handleDragOver} onClick={passButtonClickToInput}>
            <div className="drag-area">
                <img src={imageUploadIcon} alt="drag and drop here to upload" />
                <h4>Upload Image</h4>
            </div>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFilePicker}
                ref={filePickerRef}
            />
        </button>
    );
}

export default AddImageRegion;
