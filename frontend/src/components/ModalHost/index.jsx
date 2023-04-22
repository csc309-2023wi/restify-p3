import React, { useState, useEffect } from "react";
import "./modal_host.css";

// import icons
import xSmallWhite from "../../assets/icons/x-white-small.svg";

// import components
import Modal from "../Modal";
import AddImageRegion from "../AddImageRegion";

export function ModalHostCreate({ displayState, displayStateSetter }) {
    const actionContent = "action";

    return (
        <Modal
            id={"modal_new"}
            modalHeader={"Create new listing"}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={<PropertyImageUploader />} // content to put inside the image section on the left; put null to disable
            mainInfoContent={null} // content to put inside the info section on the left; put null to disable
            createNewAction={(event) => console.log("Host create!", event.currentTarget)} // what happens when you click the green submit button; put null to disable
            actionContent={actionContent} // content to put inside the action column on the right; put null to disable
        />
    );
}

function PropertyImageUploader() {
    const [images, setImages] = useState([]);

    const fileHandler = (file) => {
        const localPreviewURL = URL.createObjectURL(file);
        const fileExtension = file.name.match(/^.+(\.[^\.]+)$/)[1].split(".")[1];
        fileToDataURL(file).then((dataURL) => {
            const base64Rep = dataURL.split(",")[1];
            const newImageObject = {
                file: file,
                fileExtension: fileExtension,
                base64Rep: base64Rep,
                previewURL: localPreviewURL,
            };
            // console.log(newImageObject);
            setImages((prevImages) => [...prevImages, newImageObject]);
        });
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const imagePreviews = (
        <>
            {images.map((image, index) => (
                <div className="pos-relative" key={"upload_" + index}>
                    <button className="del-img clickable-on-dark" onClick={() => handleDeleteImage(index)}>
                        <img src={xSmallWhite} alt="x" />
                    </button>
                    <img className="propery-img" src={image.previewURL} alt={`property image ${index}`} />
                </div>
            ))}
        </>
    );

    return (
        <div className="image-selector">
            {imagePreviews}
            <AddImageRegion fileHandler={fileHandler} />
        </div>
    );
}

function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function ModalHostExisting({ property_id, displayState, displayStateSetter }) {
    const modalHeader = "address";
    const mainImageContent = "images";
    const mainInfoContent = "info";
    const actionContent = "action";
    return (
        <Modal
            id={"host_" + property_id}
            modalHeader={modalHeader}
            displayState={displayState} // bool: whether the modal should be shown
            displayStateSetter={displayStateSetter} // function that sets whether the modal should be shown
            mainImageContent={mainImageContent} // content to put inside the image section on the left; put null to disable
            mainInfoContent={mainInfoContent} // content to put inside the info section on the left; put null to disable
            createNewAction={null} // what happens when you click the green submit button; put null to disable
            actionContent={actionContent} // content to put inside the action column on the right; put null to disable
        />
    );
}
