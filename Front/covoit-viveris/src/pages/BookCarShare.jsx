import React from "react";
import { Navbar }           from "../components/header/Navbar";
import { BookCarShareView } from "../components/bookCarShare/BookCarShareView";

const BookCarShare = () => {

    return (
        <React.Fragment>
            <Navbar />
            <BookCarShareView />
        </React.Fragment>
    );
};

export default BookCarShare