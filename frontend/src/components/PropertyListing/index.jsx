import React, { useState, useEffect } from "react";
import "../../styles/common.css";
import "./property.css";

const PropertyListing = ({ property, handleCardClick }) => {
    const { id, host_id, address, description, guest_capacity, availability, amenities, images, rating } = property;

    const renderPrice = () => {
        if (availability[0]) {
            return <h4 className="price">${availability[0].price} CAD/night</h4>;
        } else {
            return <h4 className="price"></h4>;
        }
    };
    const renderAvailability = () => {
        if (availability[0]) {
            return (
                <div>
                    <div>
                        <h4>FROM</h4>
                        <p className="Date"> {availability[0].from} </p>
                    </div>
                    <br></br>
                    <div>
                        <h4>TO</h4>
                        <p className="Date"> {availability[0].to} </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <h4>FROM</h4>
                        <p className="Date"> Unavailable </p>
                    </div>
                    <br></br>
                    <div>
                        <h4>TO</h4>
                        <p className="Date"> Unavailable </p>
                    </div>
                </div>
            );
        }
    };

    return (
      <div className="property-card" onClick={handleCardClick}>
        {/* {console.log(thumbnail)} */}
      {/* show the first image of the Property */}
      <div className="property-img">
        <img
          className="property-img-img"
          src = {images !== null ? `http://localhost:8000/api/image/${images[0]}?width=1920&ext=webp` : "none"}
          alt={`Image of ${address}`}
        ></img>
      </div>
  
        <div className="property-text">
          <div className="half_text">
            <p>{address}</p>
            <br></br>
            <p><b>Rating: </b>{rating}</p>
            <br></br>
            {renderPrice()}
          </div>

                {renderAvailability()}
            </div>
        </div>
    );
};

export default PropertyListing;
