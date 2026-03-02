import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const EmailInput = ({ value, onChange }) => {
    return (
        <div className="relative">
            <FontAwesomeIcon
                icon={faEnvelope}
                className="text-lg text-gray-200 absolute mt-3 ml-2"
            />

            <input 
            value={value}
            onChange={onChange}
            type="text" 
            placeholder="email" 
            className="pl-10 input-box w-full"/>
        </div>
    );
}

export default EmailInput;