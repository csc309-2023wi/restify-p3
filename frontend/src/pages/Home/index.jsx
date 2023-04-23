import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import Navbar from "../../components/Navbar";
import PropertyListing from "../../components/PropertyListing";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../context/HomeContext";
import Sidebar from "../../components/Sidebar";

const Home = () => {
    const [address, setAddress] = useState("");
    const [guestCapacity, setGuestCapacity] = useState(1);
    const [amenities, setAmenities] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [propNext, setPropNext] = useState(null);

    const [sort, setSort] = useState("");
    const [order, setOrder] = useState("");

    const [page, setPage] = useState(1);
    // const [pageA, setPageA] = useState(1);
    const [count, setCount] = useState(0);

    const { propcards, setPropcards } = useContext(HomeContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, [sort, order]);

    useEffect(() => {
        fetchProperties1();
    }, [page]);

    const fetchProperties = async () => {
        try {
            // Construct the final URL with query parameters
            let finalUrl = `http://localhost:8000/api/property/?page=${page}`;
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

    const fetchProperties1 = async () => {
        try {
            // Construct the final URL with query parameters
            let finalUrl = `http://localhost:8000/api/property/?page=${page}`;
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

            if (queryParams.length > 0) {
                finalUrl += `&${queryParams.join("&")}`;
            }

            const response = await fetch(finalUrl);
            const data = await response.json();
            setPropNext(data.next);
            // setPropcards(data.results);
            setPropcards([...propcards, ...data.results]);
            setCount(data.count);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    // const handlePageClick = (e) => {
    //     const newPage = Number(e.target.textContent);
    //     setPage(newPage);
    // };

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

    // const handleScroll = () => {
    //     if (propNext) {
    //         setPageA(page + 1);
    //         fetchProperties1();
    //     }
    // };

    // const handleReset = () => {
    //     setAddress('');
    //     setGuestCapacity('');
    //     setAmenities('');
    //     setFrom('');
    //     setTo('');
    //     setSort('');
    //     setOrder('');
    //     setPage(1);
    //     fetchProperties();
    //   };

    return (
        <>
            <Navbar />
            <div className="container">
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
                            onClick={() => {
                                //Open Reservation Model
                                navigate(`/property/${property.id}`);
                            }}
                        />
                    ))}
                    {/* 
                    <InfiniteScroll
                        next={() => setPage(page + 1)}
                        hasMore={(propNext != null)}
                        dataLength={count}
                        scrollThreshold={0.9} 
                        scrollableTarget="window">



                    </InfiniteScroll> */}

                    {/* </Row>
              </Container> */}
                </div>
            </div>
            {/* <h1>Home</h1> */}
        </>
    );
};

export default Home;
