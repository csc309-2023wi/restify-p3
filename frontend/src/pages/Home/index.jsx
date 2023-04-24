import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import Navbar from "../../components/Navbar";
import PropertyListing from "../../components/PropertyListing";
import { ModalGuestUnbooked } from "../../components/ModalGuest";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeContext } from "../../context/HomeContext";
import Sidebar from "../../components/Sidebar";

const Home = () => {
    const [address, setAddress] = useState("");
    const [guestCapacity, setGuestCapacity] = useState(1);
    const [amenities, setAmenities] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [propNext, setPropNext] = useState(null);
    const [search, setSearch] = useState(null);

    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    const [page, setPage] = useState(1);
    // const [pageA, setPageA] = useState(1);
    const [count, setCount] = useState(0);

    const { propcards, setPropcards } = useContext(HomeContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchProperties();
    }, [sort, order]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const param = searchParams.get("search");
        setSearch(param);
    }, [location]);

    useEffect(() => {
        fetchProperties();
    }, [search]);

    const fetchProperties = async () => {
        try {
            // Construct the final URL with query parameters
            let finalUrl = `http://localhost:8000/api/property/?page=${page}&page_size=99`;
            const queryParams = [];

            if (address) {
                queryParams.push(`location=${address}`);
            }
            if (guestCapacity) {
                queryParams.push(`num_guests=${guestCapacity}`);
            }
            if (amenities) {
                queryParams.push(`amenities=${amenities}`);
            }
            if (from) {
                queryParams.push(`from=${from}`);
            }
            if (to) {
                queryParams.push(`to=${to}`);
            }
            if (sort && order) {
                if (sort === "earliest_availability" || sort === "rating") {
                    if (order === "asc") {
                        queryParams.push(`ordering=${sort}`);
                    } else {
                        queryParams.push(`ordering=-${sort}`);
                    }
                }
            }
            if (search) {
                // queryParams.length = 0;
                queryParams.push(`search=${search}`);
            }

            if (queryParams.length > 0) {
                finalUrl += `&${queryParams.join("&")}`;
            }

            const response = await fetch(finalUrl);
            const data = await response.json();
            setPropNext(data.next);
            setPropcards(data.results);
            // setPropcards([...propcards, ...data.results]);
            setCount(data.count);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const handleSearch = () => {
        setPage(1);
        fetchProperties();
        // handleScroll();
    };

    const handleSort = (sortType, sortOrder) => {
        setSort(sortType);
        setOrder(sortOrder);
        setPage(1);
    };

    const [guestUnbookedModalShow, setGuestUnbookedModalShow] = useState("none");
    const [guestModalPropId, setGuestModalPropId] = useState(null);

    return (
        <>
            <Navbar />
            <div className="container-home">
                <Sidebar
                    location={address}
                    setAddress={setAddress}
                    from={from}
                    setFrom={setFrom}
                    to={to}
                    setTo={setTo}
                    guestCapacity={guestCapacity}
                    setGuestCapacity={setGuestCapacity}
                    amenities={amenities}
                    setAmenities={setAmenities}
                    click={handleSearch}
                    click1={handleSort}
                />

                <div className="home-content home-cards">
                    {propcards.map((property, i) => (
                        <PropertyListing
                            key={i}
                            property={property}
                            handleCardClick={() => {
                                //Open Guest Unbooked Modal with property.id
                                setGuestModalPropId(property.id);
                                setGuestUnbookedModalShow("flex");
                            }}
                        />
                    ))}
                </div>
                <ModalGuestUnbooked
                    property_id={guestModalPropId}
                    display={guestUnbookedModalShow}
                    setDisplay={setGuestUnbookedModalShow}
                />
            </div>
        </>
    );
};

export default Home;
