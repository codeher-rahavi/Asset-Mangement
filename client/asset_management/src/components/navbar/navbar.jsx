import React, { Fragment } from "react";
import SearchBar from "../searchBar/searchbar";
import ProfileInfo from "../profileInfo/profileInfo";

const NavBar = () => {
    return (
        <Fragment>
            <div className="bg-white flex items-center justify-between px-6 py-5 drop-shadow">
                <h2 className="text-xl font-medium ">Application</h2>
                <SearchBar />
                <ProfileInfo/>
            </div>
        </Fragment>

    )
}
export default NavBar;