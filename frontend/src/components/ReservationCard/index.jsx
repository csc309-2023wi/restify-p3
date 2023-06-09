import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/common.css"
import "./reservation.css"
import {ModalGuestBooked} from "../ModalGuest";;



const ReservationCard = ({ reservation}) => {
    const { id, guest_id, property_id, status, property, guest_count, from_date, to_date } = reservation;
    const [display, setDisplay] = useState('None');
    const navigate = useNavigate();
    var state;
    if (status === "PE" || status === "PC") {
      state = "Pending";
    }
    else if (status === "DE") {
      state = "Denied";
    }
    else if (status === "EX") {
      state = "Expired";
    }
    else if (status === "AP") {
      state = "Approved";
    }
    else if (status === "CO") {
      state = "Completed";
    } 
    else if (status === "CA") {
      state = "Cancelled";
    }
    else if (status === "TE") {
      state = "Terminated";
    }

    const handleCardClick = () => {
      console.log("clicked");
      setDisplay('flex');
    };

    return (
      <>      
        <ModalGuestBooked
      reservation={reservation}
      display={display}
      setDisplay={setDisplay}
       /> 
      <div className="property-card with-status" onClick={handleCardClick}>
      {/* show the first image of the Property */}
        <div className="property-img-home" >
          <img
          className="property-img-img"
          src = {property.images !== null  ? `http://localhost:8000/api/image/${property.images[0]}?width=1920&ext=webp` : "none"}
          alt={`Image of ${property.address}`}
        ></img>
        </div>

        <div className="status-row">
          <span className={`status ${state.toLowerCase()}`}>{state}</span>
        </div>
  
        <div className="property-text">
          <div className="half_text">
            <p>{property.address}</p>
            <br></br>
            <p><b>Rating: </b>{property.rating}</p>
            <br></br>
            <h4 class="price">${property.availability[0].price} CAD/night</h4>
          </div>

          <div>
          {/* <h4 class="price">${availability[0].price} CAD/night</h4> */}
          <div>
              <h4>FROM</h4>
              <p className="Date"> {from_date} </p>
          </div>
          <br></br>
          <div>
              <h4>TO</h4>
              <p className="Date"> {to_date} </p>
          </div>
        </div>
        </div>
      </div>
      </>
    );
  };

export default ReservationCard;

