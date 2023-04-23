import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/common.css"
import "./property.css";

var backendUrlBase = "http://localhost:8000"

const PropertyListing = ({ property, handleCardClick }) => {
  console.log("PropertyListing: property = ", property);
    const { id, host_id, address, description, guest_capacity, availability, amenities, images, rating } = property;
    const navigate = useNavigate();

    const renderPrice = () => {
      if (availability[0]) {
        return <h4 class="price">${availability[0].price} CAD/night</h4>;
      }
      else {
        return <h4 class="price"></h4>;
      }
    };

  
    const renderAvailability = () => {
      if (availability[0]) {
        return <div>
          {/* <h4 class="price">${availability[0].price} CAD/night</h4> */}
          <div>
              <h4>FROM</h4>
              <p className="Date"> {availability[0].from} </p>
          </div>
          <br></br>
          <div>
              <h4>TO</h4>
              <p className="Date"> {availability[0].to} </p>
          </div>
        </div>;

        // return availability.map(availability => (
        //   <div key={availability.id}>
        //     <h4 class="price">${availability.price} CAD/night</h4>
        //     <div>
        //       <h4>FROM</h4>
        //       <p className="Date"> {availability.from} </p>
        //     </div>
        //     <div>
        //       <h4>TO</h4>
        //       <p className="Date"> {availability.to} </p>
        //     </div>
        //   </div>
        // ));
      } else {
        return <div>
        {/* <h4 class="price">${availability[0].price} CAD/night</h4> */}
        <div>
            <h4>FROM</h4>
            <p className="Date"> Unavailable </p>
        </div>
        <br></br>
        <div>
            <h4>TO</h4>
            <p className="Date"> Unavailable </p>
        </div>
      </div>;
      }
    };
  
    // const handleCardClick = () => {
    //   navigate(`/property/${id}`);
    //   // Link to the property details page / Modal
    // };

    return (
      <div className="property-card" onClick={handleCardClick}>
      {/* show the first image of the Property */}
        <div
          className="property-img"
          style={{
            backgroundImage:
              images && images.length > 0
                ? `url(${images[0].image})`
                : "none",
          }}
          alt={`Image of ${address}`}
        ></div>
  
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

