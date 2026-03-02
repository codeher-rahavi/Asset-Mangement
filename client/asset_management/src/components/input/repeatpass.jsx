import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RepeatPassWord = ({ value, onChange, placeholder }) => {
    const [isShowPassWord, setIsShowPassword] = useState(false);

    const ToggleShowPassword = () => {
        setIsShowPassword(!isShowPassWord)
    }


    return (
        <div className="relative">
            {isShowPassWord ?
                <FontAwesomeIcon
                    icon={faEye}
                    className="absolute text-gray-300 text-xl left-2 top-3"
                    onClick = {() => ToggleShowPassword()}
                /> :
                <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="absolute text-gray-300 text-xl left-2 top-3"
                    onClick={() => ToggleShowPassword()}

                />
            }
            <input
                value={value}
                onChange={onChange}
                type={isShowPassWord ? "text" : "password"}
                placeholder={placeholder || "Repeat Password"}
                className="pl-10 input-box w-full" />
        </div>
    );
};

export default RepeatPassWord;