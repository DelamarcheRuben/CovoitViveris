import React from "react";
import { useUser } from "../../context/UserContext";

export function ProfileBadges(){
    const { user } = useUser();

    return (
        <React.Fragment>
            <div className="small-screen">
                <div className="badge-view-small">
                    <p><strong className="center-div-picture" style={{ fontSize:"16px", paddingTop:"5px" }}>4 / 15</strong></p>
                    <div className="row badge-row-small">
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                    </div>
                    <div className="row badge-row-small">
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                    </div>
                    <div className="row badge-row-small">
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                        <div className="badge-cercle-small"></div>
                    </div>
                </div>
            </div>



            <div className="large-screen">
                <div className="badge-view">
                    <p><strong className="center-div-picture" style={{ fontSize:"25px", paddingTop:"10px" }}>4 / 15</strong></p>
                    <div className="row badge-row">
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                    </div>
                    <div className="row badge-row">
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                    </div>
                    <div className="row badge-row">
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                        <div className="badge-cercle"></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
