import React, { useState } from "react";
import DateInput from "../DateInput";
import GuestInput from "../GuestInput";
import Input from "../Input";
import LocationInput from "../LocationInput";
import "./sidebar.css";
import ActionBtn from "../ActionBtn";
import SortBtn from "../SortBtn";

const Sidebar = ({
    location,
    setAddress,
    from,
    setFrom,
    to,
    setTo,
    guestCapacity,
    setGuestCapacity,
    amenities,
    setAmenities,
    click,
    click1,
}) => {
    return (
        <aside className="sidebar">
            <h3>Filter Results</h3>
            <div className="sidebar-content">
                <div>
                    Location:
                    <Input inputBody={<LocationInput onChangeHandler={(e) => setAddress(e.target.value)} />} />
                </div>

                <div>
                    Number of Guests:
                    <Input inputBody={<GuestInput onChangeHandler={(e) => setGuestCapacity(e.target.value)} />} />
                </div>

                <div>
                    Dates available:
                    <Input
                        inputBody={
                            <DateInput dateLabel="FROM" value={from} onChangeHandler={(e) => setFrom(e.target.value)} />
                        }
                    />
                    <Input
                        inputBody={
                            <DateInput dateLabel="TO" value={to} onChangeHandler={(e) => setTo(e.target.value)} />
                        }
                    />
                </div>

                <div>
                    Amenities:
                    <Input
                        inputBody={
                            <input
                                type="text"
                                placeholder="e.g - A/C, Pool"
                                onChange={(e) => setAmenities(formatAmenities(e.target.value))}
                            />
                        }
                    />
                </div>

                <div className="filter-btns">
                    <ActionBtn className="purple-light" text="Search" onClick={click} />
                    <SortBtn handleSort={click1} />
                </div>
            </div>

            <div>
                Number of Guests:
                <Input inputBody={<GuestInput />} />
            </div>

            <div>
                Dates available:
                <Input inputBody={<DateInput dateLabel="FROM" />} />
                <Input inputBody={<DateInput dateLabel="TO" />} />
            </div>

            <div>Amenities:</div>
        </aside>
    );
};

const formatAmenities = (text_format) => {
    return text_format.replace(/ /g, "");
};

export default Sidebar;
