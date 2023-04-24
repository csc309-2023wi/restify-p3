import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
import "./dashboard.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
// import { HomeContext } from "../../context/HomeContext";
import ReservationCard from "../../components/ReservationCard";
import PropertyListing from "../../components/PropertyListing";
import calendar_green from "../../assets/icons/calendar-green-dark.svg";
import home_green from "../../assets/icons/home-green-dark.svg";
import plus_white from "../../assets/icons/plus-circle-white.svg";
import {ModalGuestBooked} from "../../components/ModalGuest";

const Dashboard = () => {
    const [reservations, setReservation] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    const [filterState, setFilterState] = useState({
        role: "all",
        state: "all",
    });
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [properties, setProperties] = useState([]);
    const access_token = localStorage.getItem("accessToken");

    useEffect(() => {
        async function fetchReservation() {
            if (access_token) {
                try {
                    const headers = {
                        Authorization: `Bearer ${access_token}`,
                    };
                    const { role, state } = filterState;
                    let url = `http://localhost:8000/api/reservation/?page=${currentPage}&type=guest`;
                    if (state !== "all") {
                        url += `&status=${state.substring(0, 2).toUpperCase()}`;
                    }
                    const response = await fetch(url, { headers });
                    // const response = await axios.get(url, { headers });

                    const reservationPromises = (await response.json()).results.map(async (reservation) => {
                        const propertyResponse = await fetch(
                            `http://localhost:8000/api/property/${reservation.property_id}`
                        );
                        return {
                            ...reservation,
                            property: await propertyResponse.json(),
                        };
                    });
                    const resolvedReservations = await Promise.all(reservationPromises);
                    setReservation(resolvedReservations);
                } catch (error) {
                    console.error("Error fetching reservations:", error);
                }
            } else {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            }
        }
        fetchReservation();
    }, [currentPage, access_token, navigate]);

    useEffect(() => {
        async function fetchProperties() {
            if (access_token) {
                try {
                    const headers = {
                        Authorization: `Bearer ${access_token}`,
                    };
                    let url = `http://localhost:8000/api/user/profile/`;
                    const response = await fetch(url, { headers });

                    const propertyResponse = await fetch(
                        `http://localhost:8000/api/property/?host_id=${(await response.json()).id}`
                    );
                    const resolvedProperties = await Promise.all((await propertyResponse.json()).results);
                    setProperties(resolvedProperties);
                } catch (error) {
                    console.error("Error fetching reservations:", error);
                }
            } else {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            }
        }
        fetchProperties();
    }, [currentPage, access_token, navigate]);

    const handleFilterChange = (e) => { //This is still not implemented
        // const { name, value } = e.target;
        const { value } = e.target;

        setFilterState((prevState) => ({ ...prevState, state: value }));
        // setFilterState((prevState) => ({ ...prevState, [name]: value }));
        handleFilterSubmit(e);
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        const { role, state } = filterState;
        let url = "http://localhost:8000/api/reservation/?page=1&type=guest";
        setCurrentPage(1);
        if (state !== "all") {
            url += `&status=${state.substring(0, 2).toUpperCase()}`;
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const data = await response.json();
        setPageCount(Math.ceil(data.count / 5));
        setReservation(data);
    };

    return (
        <>
            <Navbar />
            <div className="container-dash">
                <section className="section-user">
                    <header className="section-header">
                        <span className="section-header-title">
                            <img className="icon" src={calendar_green} alt="Reservation" />
                            <h3 className="reservations_tag">Your reservations (User)</h3>
                        </span>

                        <label>
                            Status:
                            <select name="state" value={filterState.state} onChange={handleFilterChange}>
                                <option value="all" onClick={handleFilterChange}>
                                    All
                                </option>
                                <option value="Pending" onClick={handleFilterChange}>
                                    Pending
                                </option>
                                <option value="Denied" onClick={handleFilterChange}>
                                    Denied
                                </option>
                                <option value="Expired" onClick={handleFilterChange}>
                                    Expired
                                </option>
                                <option value="Approved" onClick={handleFilterChange}>
                                    Approved
                                </option>
                                <option value="Completed" onClick={handleFilterChange}>
                                    Completed
                                </option>
                                <option value="Canceled" onClick={handleFilterChange}>
                                    Canceled
                                </option>
                                <option value="Terminated" onClick={handleFilterChange}>
                                    Terminated
                                </option>
                            </select>
                        </label>
                    </header>

                    {loggedIn ? (
                        <div className="carousel">
                            <div className="carousel-cards">
                                {reservations.map((reservation) => (
                                    <ReservationCard reservation={reservation} 
                                    handleCardClick={() => {
                                        <ModalGuestBooked reservation={reservation}/>
                                        //Open User Bookeed Modal with reservation
                                    }}/>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <h3> Not logged in</h3>
                    )}
                </section>

                <section className="section-host">
                    <header className="section-header">
                        <span className="section-header-title">
                            <img className="icon" src={home_green} alt="House" />
                            <h3 className="listings_tag">Your listed properties (Host)</h3>
                        </span>
                        <button className="action-btn purple-dark">
                            <img src={plus_white} alt="+" />
                            Add rental property
                        </button>
                    </header>
                    <div className="carousel">
                        <div className="carousel-cards">
                            {properties.map((property) => (
                                <PropertyListing property={property} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
