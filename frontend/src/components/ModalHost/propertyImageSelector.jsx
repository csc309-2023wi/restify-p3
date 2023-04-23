import { useEffect, useState } from "react";

// import icons
import xSmallWhite from "../../assets/icons/x-white-small.svg";

// import components
import AddImageRegion from "../AddImageRegion";

function PropertyImageSelector({ images, setImages }) {
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
            {images?.map((image, index) => (
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

export default PropertyImageSelector;
