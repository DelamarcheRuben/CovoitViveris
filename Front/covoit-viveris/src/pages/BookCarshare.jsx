import React from "react";
import { Navbar }           from "../components/header/Navbar";
import { BookCarshareView } from "../components/booking/BookCarshareView";

const BookCarshare = () => {

    return (
        <React.Fragment>
            <Navbar />
            <BookCarshareView />
        </React.Fragment>
    );
};

export default BookCarshare