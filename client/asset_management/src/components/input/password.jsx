import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"


const PassWord = ({ value, onChange, placeholder }) => {

    const [isShowPassWord, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassWord);
    }

    return (
        <div className="relative">

            {isShowPassWord ?
                <FontAwesomeIcon
                    icon={faEye}
                    className="eye cursor-pointer absolute text-gray-300 text-xl left-2 top-3"
                    onClick={() => toggleShowPassword()}
                /> :
                <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="eye cursor-pointer absolute text-gray-300 text-xl left-2 top-3"
                    onClick={() => toggleShowPassword()}
                />}
            <input
                value={value}
                onChange={onChange}
                type={isShowPassWord ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="pl-10 input-box w-full" />
        </div>
    );
};
export default PassWord;