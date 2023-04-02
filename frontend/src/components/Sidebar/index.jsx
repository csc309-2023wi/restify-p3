import React from "react";
import DateInput from "../DateInput";
import GuestInput from "../GuestInput";
import Input from "../Input";
import LocationInput from "../LocationInput";
import "./sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h3>Filter Results</h3>
                <div className="sidebar-content">
                    <div>
                        Location:
                        <Input inputBody={<LocationInput />} />
                    </div>

                    <div>
                        Number of Guests:
                        <Input inputBody={<GuestInput />} />
                    </div>

                    <div>
                        Dates available:
                        <Input inputBody={<DateInput dateLabel="FROM"/>} />
                        <Input inputBody={<DateInput dateLabel="TO" />} />
                    </div>

                    <div>
                        Amenities:
                        
                    </div>
                </div>
        </aside>
    );
}

export default Sidebar;
