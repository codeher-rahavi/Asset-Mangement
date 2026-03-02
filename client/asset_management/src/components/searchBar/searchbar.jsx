import React from "react";

const SearchBar = () => {
    return (
        <div className="w-[400px]">
            <input
             type="text"
             placeholder="Search..."
             className="w-full bg-gray-200 rounded-md cursor-pointer p-2"
             />
        </div>
    )
}

export default SearchBar;