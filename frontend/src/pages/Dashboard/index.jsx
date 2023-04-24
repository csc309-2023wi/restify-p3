import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
import "./dashboard.css";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
// import { HomeContext } from "../../context/HomeContext";
import ReservationCard from "../../components/ReservationCard";
import PropertyListing from "../../components/PropertyListing";
import calendar_green from "../../assets/icons/calendar-green-dark.svg";
import home_green from "../../assets/icons/home-green-dark.svg";
import plus_white from "../../assets/icons/plus-circle-white.svg";
import { ModalGuestBooked } from "../../components/ModalGuest";
import { ModalHostCreate, ModalHostExisting } from "../../components/ModalHost";

const Dashboard = () => {
    const [reservations, setReservation] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    const [filterState, setFilterState] = useState({
        role: "all",
        state: "all",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [properties, setProperties] = useState([]);
    const access_token = localStorage.getItem("accessToken");

    const [propToDisplay, setPropToDisplay] = useState(null);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const param = searchParams.get("property_id");
        setPropToDisplay(param);
    }, [location]);

    const [hostExistingModalShow, setHostExistingModalShow] = useState(false);
    const [hostExistingPropId, setHostExistingPropId] = useState(null);
    useEffect(() => {
        if (propToDisplay) {
            console.warn(propToDisplay);
            setHostExistingModalShow(true);
            setHostExistingPropId(propToDisplay);
        } else {
            setHostExistingModalShow(false);
            setHostExistingPropId(null);
        }
    }, [propToDisplay]);

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
                    console.log("Look");
                    console.log(response);

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

    async function fetchProperties(currentPage, access_token, navigate) {
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

    useEffect(() => {
        fetchProperties(currentPage, access_token, navigate);
    }, [currentPage, access_token, navigate]);

    const handleFilterChange = (e) => {
        //This is still not implemented
        // const { name, value } = e.target;
        // const { value } = e.target;

        setFilterState({ role: "all", state: e.target.value });
        // // setFilterState((prevState) => ({ ...prevState, [name]: value }));
        handleFilterSubmit(e);
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        // const { role, state } = filterState;
        const st = e.target.value;
        let url = "http://localhost:8000/api/reservation/?page=1&type=guest";
        setCurrentPage(1);
        if (st !== "all") {
            url += `&status=${st.substring(0, 2).toUpperCase()}`;
        }
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const reservationPromises = (await response.json()).results.map(async (reservation) => {
            const propertyResponse = await fetch(`http://localhost:8000/api/property/${reservation.property_id}`);
            return {
                ...reservation,
                property: await propertyResponse.json(),
            };
        });
        const resolvedReservations = await Promise.all(reservationPromises);
        setReservation(resolvedReservations);
    };

    const [newHostCreateModalShow, setNewHostCreateModalShow] = useState(false);

    return (
        <>
            <Navbar />
            <div className="container-dash">
                <section className="section-user">
                    <header className="section-header">
                        <span className="section-header-title">
                            <img className="icon" src={calendar_green} alt="Reservation" />
                            <h3 className="reservations_tag">Your reservations (Guest)</h3>
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
                                {reservations.map((reservation, i) => (
                                    <ReservationCard
                                        key={i}
                                        reservation={reservation}
                                        handleCardClick={() => {
                                            <ModalGuestBooked reservation={reservation} />;
                                            //Open User Bookeed Modal with reservation
                                        }}
                                    />
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
                        <button className="action-btn purple-dark" onClick={() => setNewHostCreateModalShow(true)}>
                            <img src={plus_white} alt="+" />
                            Add rental property
                        </button>
                        <ModalHostCreate
                            displayState={newHostCreateModalShow}
                            displayStateSetter={setNewHostCreateModalShow}
                            afterCreateTrigger={() => fetchProperties(currentPage, access_token, navigate)}
                        />
                    </header>
                    <div className="carousel">
                        <div className="carousel-cards">
                            {properties.map((property, idx) => (
                                <PropertyListing
                                    property={property}
                                    key={idx}
                                    handleCardClick={() => setPropToDisplay(property.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <ModalHostExisting
                        property_id={hostExistingPropId}
                        displayState={hostExistingModalShow}
                        displayStateSetter={setHostExistingModalShow}
                        afterCloseTrigger={() => setPropToDisplay(null)}
                    />
                </section>
            </div>
        </>
    );
};

export default Dashboard;
