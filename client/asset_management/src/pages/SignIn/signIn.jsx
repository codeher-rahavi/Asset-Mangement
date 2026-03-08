import React, { useState } from "react";
import signin from "../../images/signin.jpg";
import { useNavigate } from "react-router-dom";
import PassWord from "../../components/input/password";
import EmailInput from "../../components/input/email";


const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    passWord: passWord // Map React's 'passWord' to Backend's 'password'
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save user info to local storage if needed
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/Overview"); // Redirect to your overview page
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Server Error");
        }
    };

    const handleForgotPasswordClick = async () => {
        const email = prompt("Please enter your registered email:");
        if (!email) return;

        try {
            const response = await fetch("http://localhost:8000/api/forgotPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.toLowerCase() }) // Consistent with our Index
            });

            const data = await response.json();

            // THIS IS THE KEY: Log it to the console so you can see it AFTER the prompt closes
            console.log("SERVER RESPONSE DATA:", data);

            if (response.ok) {
                alert("Success! If that email exists, a reset link has been sent.");
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (err) {
            alert("Server connection failed.");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] min-h-screen">

            <div className="relative min-h-screen">
                <form onSubmit={(e) => { handleLogin(e) }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 w-[400px]">
                        <h3 className="text-3xl mb-6 font-semibold">Log In</h3>
                        <EmailInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PassWord
                            value={passWord}
                            onChange={(e) => setPassWord(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl text-center"
                        >
                            Log In
                        </button>
                        <p onClick={handleForgotPasswordClick} className="text-blue-700 flex justify-end cursor-pointer">Forget password?</p>
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-gray-400 flex-1"></div>
                            <span>or</span>
                            <div className="h-px  bg-gray-400 flex-1"></div>
                        </div>

                        <div className="flex  justify-between mt-4 gap-3">
                            <button type="submit" className="border h-[50px] w-[200px] font-medium  rounded-md border-gray-400 cursor-pointer text-[18px] hover:shadow-xl hover:scale-95 ml-[100px]">
                                <img src="/google.svg" alt="google-logo" className="w-7 inline mr-2" />
                                Google
                            </button>

                        </div>
                        <p className="mt-4">Don't have an account ? <span className="text-blue-700 cursor-pointer underline" onClick={() => navigate("/SignUp")}>Sign Up</span></p>
                    </div>
                </form>
            </div>
            <div className="relative min-h-screen">
                <div className="absolute  top-[100px]  lg:text-2xl lg:w-[610px] ml-24 z-10 text-sm w-[300px]">
                    <p className="text-3xl leading-12">The Future belongs to those who <span className="text-blue-600">believe</span> in the <span className="text-blue-600">beauty of theirs of Dreams..</span> </p>
                    <p className="text-xl ml-50 lg:ml-98 mt-2 font-semibold"> -Eleanor Roosevelt</p>
                </div>
                <img src={signin} alt="signin" className="z-10 w-full h-full z-10 object-cover" />
            </div>
        </div>
    )
}
export default SignIn;